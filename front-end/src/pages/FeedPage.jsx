// ============================================
// src/pages/FeedPage.jsx
// TODO: 피드 페이지 UI 및 기능 구현
// - posts, stories, loading state 선언
// - useEffect로 컴포넌트 마운트 시 데이터 로드
// - loadFeedData 함수: getPosts, getStories 호출
// - toggleLike 함수: addLike/removeLike 호출 후 목록 새로고침
// - handleLogout 함수: 확인 후 로그아웃
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, PlusSquare, Film, User } from 'lucide-react';
import Header from "../components/Header";

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
            setStories(storiesData);
        } catch(err) {
            alert("스토리를 불러올 수 없습니다.");
            console.error("❌ 스토리 불러오기 실패");
        } finally {
            setLoading(false);
        }
    };

    const user = JSON.parse(localStorage.getItem('user') || {});

    const toggleLike = async (postId, isLiked) => {
        try {
            if (isLiked) await apiService.removeLike(postId);
            else await apiService.addLike(postId);

            const postsData = await apiService.getPosts();
        } catch(err) {
            console.error("❌ 좋아요 처리 실패: ", err);
            alert("좋아요 처리에 실패했습니다.");
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

    // user.userAvatar 로 가져온 이미지가 엑스박스일 때
    const avatarImage = user.userAvatar && user.userAvatar.trim() !== ''
        ? user.userAvatar
        : '/static/img/default-avatar.jpg'


    return (
        <div className="feed-container">
            <Header />
            <div className="feed-content">
                {stories.length > 0 && (
                    <div className="stories-container">
                        <div className="stories-wrapper">
                            {stories.map((story) => (
                                <div key={story.storyId}
                                     className="story-item"
                                     onClick={() => navigate(`/story/detail/${story.storyId}`)}>
                                    {/* onClick 링크에 ${user.userId} 추가, /${story.storyId} 삭제 */}
                                    <div className="story-avatar-wrapper"
                                         key={story.id}>
                                        <img src={avatarImage}
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
                                    <img src={avatarImage}
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
