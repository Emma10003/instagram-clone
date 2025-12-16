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
import header from "../components/Header";
import {API_BASE_URL} from "../config/api";  // vecel 배포 테스트 중 추가

// export const API_BASE_URL = 'http://localhost:9000/api';

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
    signup: async (username, email, password, fullName) => {
        const response = await api.post('/auth/signup', {
            userName: username,
            userEmail: email,
            userPassword: password,
            userFullname: fullName,
        });
        return response.data;
    },

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

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href='/login';
    },

    // ===== 게시물 API =====
    getPosts: async () => {
        const res = await api.get('/posts');
        return res.data;
    },

    // my 추가
    getMyPost: async (userId) => {
        console.log("apiService - userId 자료형: ", typeof(userId));  // number
        const res = await api.get(`/posts/user/${userId}`);
        return res.data;
    },

    // 단순 getPost 사용
    getPost: async (postId) => {
        try {
            const res = await api.get(`/posts/${postId}`);
            return res.data;
        } catch(err) {
            console.error(err);
        }
    },

    createPost: async (postImage, postCaption, postLocation) => {
        const formData = new FormData();
        formData.append('postImage', postImage);
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

    addLike: async (postId) => {
        const res = await api.post(`/posts/${postId}/like`);
        return res.data;
    },

    removeLike: async (postId) => {
        const res = await api.delete(`/posts/${postId}/like`);
        return res.data;
    },

    // ===== 댓글 API =====
    getComments: async (postId) => {
        const res = await api.get(`/posts/${postId}/comments`);
        return res.data;
    },

    createComment: async (postId, commentContent) => {
        const res = await api.post(`/posts/${postId}/comments`, {
            commentContent: commentContent
        });
        return res.data;
    },

    deleteComment: async (commentId) => {
        const res = await api.delete(`/comments/${commentId}`);
        return res.data;
    },

    // ===== 스토리 API =====
    getStories: async () => {
        const res = await api.get('/stories');
        return res.data;
    },

    getStory: async(userId) => {
        try {
            const res = await api.get(`/stories/user/${userId}`)
            return res.data;
        } catch(err) {
            console.error("스토리 조회 에러: ", err.response?.data || err.message());
        }
    },

    createStory: async (storyImage) => {
        const formData = new FormData();
        formData.append('storyImage', storyImage);

        const res = await api.post('/stories', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        return res.data;
    },

    deleteStory: async (storyId) => {
        console.log("🎈 apiService 도달");
        const res = await api.delete(`/stories/${storyId}`);
        console.log("🎈 백엔드 통신 완료 - res.data: ", res.data);
        return res.data;
    },

    // ===== 사용자 API =====

    // TODO: 사용자 프로필 조회
    // GET /users/:userId
    getUser: async (userId) => {
        // TODO: API 호출을 완성하세요
        try {
            const res = await api.get(`/users/${userId}`);
            console.log("res.data: ", res.data);
            return res.data;
        } catch (err) {
            console.error("❌ 사용자 프로필 조회 실패");
            return [];
        }
    },

    // TODO: 사용자 게시물 조회
    // GET /users/:userId/posts
    getUserPosts: async (userId) => {
        // TODO: API 호출을 완성하세요
    },

    updateProfile: async (userId, formData) => {
        try {
            const res = await api.put(`/auth/profile/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                const token = localStorage.getItem('token');
                if(token) {
                    localStorage.setItem('token', token);
                }
            }
            return res.data;
        } catch (err) {
            console.error("❌ 프로필 업데이트 실패");
            return Promise.reject(err);
        }
    },

    searchUsers: async (query) => {
        if(!query) {
            return [];
        }
        try {
            const res = await api.get(`/users/search?q=${encodeURIComponent(query)}`)
            return res.data;
        } catch (err) {
            console.error("❌ 유저 리스트 검색 실패: ", err.response?.data || err.message());
            return [];
        }

    },

    getUserByUsername: async (username) => {
        try {
            const res = await api.get(`/users/username/${username}`);
            return res.data;
        } catch(err) {
            console.error("❌ 사용자명으로 사용자 검색 실패: ", err.response?.data || err.message());
            return null;
        }
    },
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