// ============================================
// src/pages/FeedPage.jsx
// TODO: 피드 페이지 UI 및 기능 구현
// - posts, stories, loading state 선언
// - useEffect로 컴포넌트 마운트 시 데이터 로드
// - loadFeedData 함수: getPosts, getStories 호출
// - toggleLike 함수: addLike/removeLike 호출 후 목록 새로고침
// - handleLogout 함수: 확인 후 로그아웃
// ============================================

import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, PlusSquare, Film, User } from 'lucide-react';
import Header from "../components/Header";
import {getImageUrl} from "../service/commonService";

/* heart 를 클릭하면 좋아요 수 증가 */
const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadFeedData();
    }, []);

    const loadFeedData = async () => {
        setLoading(true);  // 백엔드에서 데이터 연동하는 동안 로딩 처리
        try {
            const postsData = await apiService.getPosts();
            setPosts(postsData);
        } catch(err) {
            alert("피드를 불러올 수 없습니다.");
        } finally {
            setLoading(false);
        }

        try {
            const storiesData = await apiService.getStories();

            // 사용자별로 스토리 그룹화
            setStories(groupStoriesByUser(storiesData));
        } catch(err) {
            alert("스토리를 불러올 수 없습니다.");
            console.error("❌ 스토리 불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    // 사용자별로 스토리를 그룹화하고 가장 최근 스토리만 반환
    // select * from stories 에서 가져온 모든 데이터를 storiesData 변수에 전달
    const groupStoriesByUser = (storiesData) => {
        const userStoriesMap = {};  // 추후 유저들을 그룹화해서 담을 변수
        // DB에서 가져온 모든 스토리를 for문으로 순회
        storiesData.forEach(story => {
            const userId = story.userId;  // 각 스토리에 해당하는 유저 아읻디를 변수에 담아
            // 해당 사용자의 첫 스토리이거나, 더 최근 스토리인 경우 스토리 유저 나열 순서를 맨 앞으로 이동
            // 정렬 알고리즘!
            if(!userStoriesMap[userId]
                || new Date(story.createdAt) > new Date(userStoriesMap[userId].createdAt)) {
                userStoriesMap[userId] = story;
            }
        });
        // 위에서 그룹화한 userStoriesMap 유저들을 배열로 변환하고 최신순으로 정렬
        // 정렬 알고리즘!
        return Object.values(userStoriesMap).sort((a,b) =>
            new Date(b.createdAt) - new Date(a.createdAt));
    }

    const user = JSON.parse(localStorage.getItem('user') || {});

    const toggleLike = async (postId, isLiked) => {
        // 1. 현재 게시물 목록 복사 (원본을 바로 건드리면 안됨)
        const newPosts = [...posts];
        // 2. 내가 클릭한 게시물이 몇 번째에 있는지 찾음
        const targetIndex = newPosts.findIndex(post => post.postId === postId);
        // 3. 게시물을 찾았다면
        if(targetIndex !== -1) {
            // 좋아요 상태를 반대로 뒤집기 (true -> false)
            newPosts[targetIndex].isLiked = !isLiked;
            // 숫자 취소/추가
            if(isLiked) newPosts[targetIndex].likeCount -= 1;
            else newPosts[targetIndex].likeCount += 1;
            // 변경된 상태로 화면 업데이트
            setPosts(newPosts);
        }

        // 소비자에게 백엔드 속도는 중요하지 않고, 눈 앞에 보여지는 화면의 속도가 우선이므로
        // 프론트엔드에서 바뀌는 작업을 보인 후, 백엔드 로직을 진행함.
        // 실패할 경우 likeCount 원상복구 후 소비자에게 전달.
        try {
            // 좋아요 누르고 취소가 된다. 하지만 백그라운드에서 작업한 게 바로 보이지 않는 상황.
            if (isLiked) {
                await apiService.removeLike(postId);
            } else {
                await apiService.addLike(postId);
            }
            /*
            기존에는 백엔드 -> 프론트엔드를 변경했다면
            수정내용은 프론트엔드 -> 백엔드로 로직 변경
            const postsData = await apiService.getPosts();
            setPosts(postsData);
            */
        } catch(err) {
            console.error("❌ 좋아요 처리 실패: ", err);
            alert("좋아요 처리에 실패했습니다.");
            loadFeedData();  // 다시 원래대로 돌려놓기
        }

    };

    if (loading) {
        return (
            <div className="feed-container">
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    로딩 중...
                </div>
            </div>
        );
    }

    return (
        <div className="feed-container">
            <Header />
            <div className="feed-content">
                {stories.length > 0 && (
                    <div className="stories-container">
                        <div className="stories-wrapper">
                            {stories.map((story) => (
                                <div key={story.userId}
                                     className="story-item"
                                     onClick={() => navigate(`/story/detail/${story.userId}`)}>
                                    <div className="story-avatar-wrapper"
                                         key={story.id}>
                                        <img src={getImageUrl(story.userAvatar)}
                                             className="story-avatar" />
                                    </div>

                                    <span className="story-username">{story.userName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {posts.length > 0 && (
                    posts.map((post) => (
                        <article key={post.postId} className="post-card">
                            <div className="post-header">
                                <div className="post-user-info">
                                    <img src={getImageUrl(post.userAvatar)}
                                         className="post-user-avatar" />
                                    <span className="post-username">{post.userName}</span>
                                </div>
                                <MoreHorizontal className="post-more-icon" />
                            </div>

                            <img src={post.postImage} className="post-image" />
                            <div className="post-content">
                                <div className="post-actions">
                                    <div className="post-actions-left">
                                        <Heart className={`action-icon like-icon ${post.isLiked ? 'liked' : ''}`}
                                               onClick={() => toggleLike(post.postId, post.isLiked)}
                                               fill={post.isLiked ? "#ed4956" : "none"}
                                       />
                                        <MessageCircle className="action-icon" />
                                        <Send className="action-icon" />
                                    </div>
                                    <Bookmark className="action-icon" />
                                </div>

                                <div className="post-likes">
                                    좋아요 {post.likeCount}개
                                </div>

                                <div className="post-caption">
                                    <span className="post-caption-username">{post.userName}</span>
                                    {post.postCaption}
                                </div>
                                {post.commentCount > 0 && (
                                    <button className="post-comments-btn">
                                        댓글 {post.commentCount}개 모두 보기
                                    </button>
                                )}
                                <div className="post-time">
                                    {post.createdAt || '방금 전'}
                                </div>
                            </div>
                        </article>
                    ))
                )}

                {/* TODO: 게시물이 없을 때 메시지 표시 */}
            </div>
        </div>
    );
};

export default FeedPage;
