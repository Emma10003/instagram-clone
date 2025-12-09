// ============================================
// src/service/apiService.js
// TODO: Axios를 이용한 API 호출 함수 작성
// - axios import 하기
// - API_BASE_URL 설정 (http://localhost:8080/api)
// - axios 인스턴스 생성
// - 요청 인터셉터: 모든 요청에 Authorization 헤더 추가
// - 응답 인터셉터: 401 에러 시 로그인 페이지로 이동
// ============================================

import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type' : 'application/json',
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// TODO: 응답 인터셉터를 설정하세요
// 401 에러가 발생하면 localStorage를 비우고 /login으로 이동
/*
  401 : 인증 안됨 = 로그인을 안 했거나 토큰이 만료된 경우
        -> 로그인 페이지로 이동시킴(토큰 만료, 토큰이 임의로 삭제, 잘못된 토큰일 때 = 누군가가 토큰을 임의로 조작)

  403 : 권한 없음 = 로그인은 했지만, 접근할 권한 부족
        -> 권한 없습니다 알림 후 이전 페이지 or 메인페이지로 돌려보내기

  404 :     없음 = 게시물 / 사용자 / 페이지 없음
        -> 찾을 수 없습니다 알림 후 이전 페이지 or 메인페이지로 돌려보내기

  500 : 서버 에러 = 서버 문제
        -> 고객센터 연락 방법 띄우기
 */
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href='/login';
        }
        return Promise.reject(error);
    }
)


// 기능2번 과 같은 형태로 함수 활용
const apiService = {
    // ===== 인증 API =====

    // TODO: 회원가입 API
    // POST /auth/signup
    // body: { username, email, password, fullName }
    signup: async (username, email, password, fullName) => {
        const response = await api.post('/auth/signup', {
            userName: username,
            userEmail: email,
            userPassword: password,
            userFullname: fullName,
        });
        return response.data;
    },

    // TODO: 로그인 API
    // POST /auth/login
    // body: { username, password }
    login: async (userEmail, password) => {
        const res = await api.post('/auth/login', {
            userEmail: userEmail,
            userPassword: password,
        })

        // 토큰과 사용자 정보를 localStorage 저장
        if(res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        return res.data;
    },

    // TODO: 로그아웃 함수
    // localStorage에서 token과 user 제거하고 /login으로 이동
    logout: () => {
        // TODO: 로그아웃 로직을 완성하세요
    },

    // ===== 게시물 API =====

    // TODO: 모든 게시물 조회
    // GET /posts
    getPosts: async () => {
        // TODO: API 호출을 완성하세요
        const res = await api.get('/posts');
        console.log("✅ 프론트엔드에서 호출 성공: ", res.data);
        return res.data;
    },

    // TODO: 특정 게시물 조회
    // GET /posts/:postId
    getPost: async (postId) => {
        // TODO: API 호출을 완성하세요
    },

    // TODO: 게시물 작성
    // POST /posts
    // body: { postImage, postCaption, postLocation }
    createPost: async (postImage, postCaption, postLocation) => {
        const formData = new FormData();
        formData.append('postImage', postImage);
        console.log("💡 postImage: ", postImage);
        formData.append('postCaption', postCaption);
        formData.append('postLocation', postLocation);

        const res = await api.post('/posts', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
            }
        });
        return res.data;
    },

    // TODO: 게시물 삭제
    // DELETE /posts/:postId
    deletePost: async (postId) => {
        // TODO: API 호출을 완성하세요
    },

    // ===== 좋아요 API =====

    // TODO: 좋아요 추가
    // POST /posts/:postId/like
    addLike: async (postId) => {
        // TODO: API 호출을 완성하세요
    },

    // TODO: 좋아요 취소
    // DELETE /posts/:postId/like
    removeLike: async (postId) => {
        // TODO: API 호출을 완성하세요
    },

    // ===== 댓글 API =====

    // TODO: 댓글 목록 조회
    // GET /posts/:postId/comments
    getComments: async (postId) => {
        // TODO: API 호출을 완성하세요
    },

    // TODO: 댓글 작성
    // POST /posts/:postId/comments
    // body: { commentContent }
    createComment: async (postId, commentContent) => {
        // TODO: API 호출을 완성하세요
    },

    // TODO: 댓글 삭제
    // DELETE /comments/:commentId
    deleteComment: async (commentId) => {
        // TODO: API 호출을 완성하세요
    },

    // ===== 스토리 API =====

    // TODO: 스토리 목록 조회
    // GET /stories
    getStories: async () => {
        // TODO: API 호출을 완성하세요
    },

    // TODO: 스토리 작성
    // POST /stories
    // body: { storyImage }
    createStory: async (storyImage) => {
        // TODO: API 호출을 완성하세요
    },

    // ===== 사용자 API =====

    // TODO: 사용자 프로필 조회
    // GET /users/:userId
    getUser: async (userId) => {
        // TODO: API 호출을 완성하세요
    },

    // TODO: 사용자 게시물 조회
    // GET /users/:userId/posts
    getUserPosts: async (userId) => {
        // TODO: API 호출을 완성하세요
    }
};

export default apiService;





/*
// 기능 내보내기 방법 1
export const 기능1번 = () => {

}

// // 기능 내보내기 방법 2
const 기능2번 = {
    회원가입기능: () => {

    },
    로그인기능: () => {

    }
}

export default 기능2번;
*/