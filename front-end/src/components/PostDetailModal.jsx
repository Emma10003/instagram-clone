
import React from 'react';
import {X, Heart, MessageCircle, Send, Bookmark, Book} from 'lucide-react';
import { getImageUrl } from '../service/commonService';
import MentionText from './MentionText';
import PostOptionMenu from "./PostOptionMenu";
import {useNavigate} from "react-router-dom";

const PostDetailModal = ({ post, currentUserId, onClose, onDelete, onToggleLike }) => {

    // 내가 추가함
    const navigate = useNavigate();

    if(!post) return null;

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

    return (
        <div className="post-detail-overlay" onClick={onClose}>
            <div className="post-detail-container" onClick={e => e.stopPropagation()}>
                <button className="post-detail-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="post-detail-content">
                    <div className="post-detail-image-section">
                        {/* 게시물 이미지 표시 */}
                        {/* className: post-detail-image */}
                        {/* src: post.postImage */}
                        <img src={post.postImage}
                             className="post-detail-image"
                             onClick={() => navigate(`/post/${post.postId}`)}
                        />
                    </div>

                    <div className="post-detail-info-section">

                        <div className="post-detail-header">
                            <div className="post-user-info">
                                <img src={getImageUrl(post.userAvatar)}
                                     className="post-user-avatar"
                                />
                                <span className="post-username">
                                    {post.userName}
                                </span>

                            </div>

                            <PostOptionMenu
                                post={post}
                                currentUserId={currentUserId}
                                onDelete={onDelete}
                            />
                        </div>

                        <div className="post-detail-caption-section">
                            <div className="post-caption">
                                <span className="post-caption-username">
                                    {post.userName}
                                </span>
                                <MentionText text={post.postCaption} />

                            </div>
                        </div>

                        <div className="post-detail-actions">
                            <div className="post-actions">
                                <div className="post-actions-left">
                                    <Heart
                                        className={`action-icon like-icon ${post.isLiked ? 'liked' : ''}`}
                                        onClick={() => onToggleLike(post.postId, post.isLiked)}
                                        fill={post.isLiked ? "#ed4956" : "none"}
                                    />
                                    <MessageCircle className="action-icon"
                                                   onClick={handleShare} />
                                    <Send className="action-icon" />
                                </div>
                                <Bookmark className="action-icon" />
                            </div>

                            <div className="post-likes">
                                {post.likeCount}개
                            </div>

                            <div className="post-time">
                                {post.createdAt || "방금 전"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;