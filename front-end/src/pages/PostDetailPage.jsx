
import React, {useEffect, useState} from 'react';
import {X, Heart, MessageCircle, Send, Bookmark, Book} from 'lucide-react';
import { getImageUrl } from '../service/commonService';


import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header";
import PostDetailModal from "../components/PostDetailModal";
import apiService from "../service/apiService";
import MentionText from "../components/MentionText";
import PostOptionMenu from "../components/PostOptionMenu";

const PostDetailPage = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user') || []);
    const {postId} = useParams();

    useEffect(() => {
        loadFeedData();
    }, []);

    if(!post) return null;

    const loadFeedData = async () => {
        setLoading(true);

        try {
            console.log("post.postId: ", post.postId);
            console.log("파라미터로 가져온 postId: ", postId);
            const postData = await apiService.getPost(postId);
            setPost(postData);
        } catch (err) {
            alert("포스트 피드를 불러오는데 실패했습니다.")
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/post/${post.postId}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${post.userName}의 게시물`,
                    text: post.postCaption,
                    url: shareUrl
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("링크가 클립보드에 복사되었습니다!");
        }).catch(() => {
            alert("링크 복사에 실패했습니다.");
        });
    };


    const toggleLike = async (postId, isLiked) => {
        const newPosts = [...post];
        const targetIndex = newPosts.findIndex(post => post.postId === postId);

        if (targetIndex !== -1) {
            newPosts[targetIndex].isLiked = !isLiked;
            if (isLiked) newPosts[targetIndex].likeCount -= 1;
            else newPosts[targetIndex].likeCount += 1;
            setPost(newPosts);
        }

        try {
            if (isLiked) await apiService.removeLike(postId);
            else await apiService.addLike(postId);
        } catch (err) {
            alert("좋아요 처리에 실패했습니다.");
            loadFeedData();
        }
    };

    const deletePost = async (postId) => {
        try{
            await apiService.deletePost(postId);
            setPost(post.filter(p => p.postId !== postId));
            setSelectedPost(null);
            alert("게시물이 삭제되었습니다.");
        } catch (err) {
            alert("게시물 삭제에 실패했습니다.");
            console.error(err);
        }
    }

    if (loading) {
        return (
            <div className="feed-container">
                <div style={{padding: '2rem', textAlign: 'center'}}>
                    로딩 중...
                </div>
            </div>
        );
    }

    return (
        <div className="feed-container">
            <Header/>

            <div className="feed-content">
                <article key={post.postId} className="post-card">
                    <div className="post-header">
                        <div className="post-user-info">
                            <img src={getImageUrl(post.userAvatar)}
                                 className="post-user-avatar"
                                 style={{cursor: 'pointer'}}
                                 onClick={() => navigate(`/myfeed?userId=${post.userId}`)}
                            />
                            <span className="post-username">{post.userName}</span>
                        </div>
                        <PostOptionMenu
                            post={post}
                            currentUserId={currentUser.userId}
                            onDelete={deletePost}/>
                    </div>

                    <img src={post.postImage} className="post-image"
                    />
                    <div className="post-content">
                        <div className="post-actions">
                            <div className="post-actions-left">
                                <Heart
                                    className={`action-icon like-icon ${post.isLiked ? 'liked' : ''}`}
                                    onClick={() => toggleLike(post.postId, post.isLiked)}
                                    fill={post.isLiked ? "#ed4956" : "none"}
                                />
                                <MessageCircle className="action-icon"/>
                                <Send className="action-icon"/>
                            </div>
                            <Bookmark className="action-icon"/>
                        </div>

                        <div className="post-likes">
                            좋아요 {post.likeCount}개
                        </div>

                        <div className="post-caption">
                            <span className="post-caption-username">{post.userName}</span>
                            <MentionText text={post.postCaption}/>
                        </div>

                        {post.commentCount > 0 && (
                            <button className="post-comments-btn">
                                댓글{post.commentCount}개 모두 보기
                            </button>
                        )}
                        <div className="post-time">
                            {post.createdAt || '방금 전'}
                        </div>
                    </div>
                </article>
            </div>

            {selectedPost && (
                <PostDetailModal
                    post={selectedPost}
                    currentUserId={currentUser.userId}
                    onClose={() => setSelectedPost(null)}
                    // onDelete={deletePost()}
                    onToggleLike={toggleLike}
                />
            )}
        </div>
    );
};

export default PostDetailPage;