import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import apiService from '../service/apiService';
import {Heart, MessageCircle, Send, Bookmark, MoreHorizontal} from 'lucide-react';
import Header from "../components/Header";
import {getImageUrl} from "../service/commonService";
import MentionText from "../components/MentionText";
// TODO 12: MentionText 컴포넌트 import
// import MentionText from "../components/MentionText";


const FeedPage = () => {
    const [posts, setPosts] = useState([]);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadFeedData();
    }, []);

    const loadFeedData = async () => {
        setLoading(true);

        try {
            const postsData = await apiService.getPosts();
            setPosts(postsData);
        } catch (err) {
            alert("포스트 피드를 불러오는데 실패했습니다.")
        } finally {
            setLoading(false);
        }

        try {
            const storiesData = await apiService.getStories();
            const gu = groupStoriesByUser(storiesData);
            setStories(gu);
        } catch (err) {
            alert("스토리 피드를 불러오는데 실패했습니다.")
        }
    };

    const groupStoriesByUser = (storiesData) => {
        const userStoriesMap = {};
        storiesData.forEach(story => {
            const userId = story.userId;
            if (!userStoriesMap[userId]
                ||
                new Date(story.createdAt) > new Date(userStoriesMap[userId].createdAt)
            ) {
                userStoriesMap[userId] = story;
            }
        });
        return Object.values(userStoriesMap).sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    const toggleLike = async (postId, isLiked) => {
        const newPosts = [...posts];
        const targetIndex = newPosts.findIndex(post => post.postId === postId);

        if (targetIndex !== -1) {
            newPosts[targetIndex].isLiked = !isLiked;
            if (isLiked) newPosts[targetIndex].likeCount -= 1;
            else newPosts[targetIndex].likeCount += 1;
            setPosts(newPosts);
        }

        try {
            if (isLiked) await apiService.removeLike(postId);
            else await apiService.addLike(postId);
        } catch (err) {
            alert("좋아요 처리에 실패했습니다.");
            loadFeedData();
        }
    };

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
                {stories.length > 0 && (
                    <div className="stories-container">
                        <div className="stories-wrapper">
                            {stories.map((story) => (
                                <div key={story.userId}
                                     className="story-item"
                                     onClick={() => navigate(`/story/detail/${story.userId}`)}
                                >
                                    <div className="story-avatar-wrapper"
                                         key={story.id}>
                                        <img src={getImageUrl(story.userAvatar)}
                                             className="story-avatar"/>
                                    </div>
                                    <span className="story-username">
                                        {story.userName}
                                    </span>
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
                                    <img src={getImageUrl(post.userAvatar)} className="post-user-avatar"/>
                                    <span className="post-username">{post.userName}</span>
                                </div>
                                <MoreHorizontal className="post-more-icon"/>
                            </div>

                            <img src={post.postImage} className="post-image"/>
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
                    ))
                )}
            </div>
        </div>
    );
};

export default FeedPage;