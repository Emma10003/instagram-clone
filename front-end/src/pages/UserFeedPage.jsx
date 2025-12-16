import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Grid, Bookmark, Settings } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import apiService from "../service/apiService";
import {getImageUrl} from "../service/commonService";

const UserFeedPage = ({userId}) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadUserFeedData();
    }, []);

    const loadUserFeedData = async () => {
        setLoading(true);
        try {
            const u = await apiService.getUser(userId);
            setUser(u);
        } catch (err) {
            console.log("❌ 특정 유저 조회 실패");
            alert("유저 데이터를 불러올 수 없습니다.")
        } finally {
            setLoading(false);
        }

        try {
            const allPosts = await apiService.getMyPost(userId);
            setPosts(allPosts);
        } catch (err) {
            console.log("❌ 데이터 불러오기 실패");
            alert("데이터를 불러올 수 없습니다.");
        } finally  {
            setLoading(false);
        }
    }

    if(loading || !user) return <div>로딩 중...</div>

    return (
        <div className="feed-container">
            <Header type="feed" />

            <main className="profile-wrapper">
                <header className="profile-header">
                    <div className="profile-image-container">
                        <div className="profile-image-border">
                            <img
                                src={getImageUrl(user.userAvatar)}
                                alt="profile"
                                className="profile-image-large"
                            />
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <div className="profile-title-row">
                            <h2 className="profile-username">{user.userName}</h2>
                        </div>

                        <ul className="profile-stats">
                            <li>게시물 <strong>{posts.length}</strong></li>
                            <li>팔로워 <strong>0</strong></li>
                            <li>팔로잉 <strong>0</strong></li>
                        </ul>

                        <div className="profile-bio-container">
                            <div className="profile-fullname">{user.name}</div>
                            <div className="profile-bio">{user.userAvatar}</div>
                        </div>
                    </div>
                </header>

                <div className="profile-stats-mobile">
                    <div className="stat-item">
                        <span className="stat-value">{posts.length}</span>
                        <span className="stat-label">게시물</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">팔로워</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">팔로잉</span>
                    </div>
                </div>

                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        <Grid size={12} /> 게시물
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                        onClick={() => setActiveTab('saved')}
                    >
                        <Bookmark size={12} /> 저장됨
                    </button>
                </div>

                <div className="profile-posts-grid">
                    {posts.map((post) => (
                        <div key={post.postId} className="grid-item">
                            <img src={post.postImage} alt="post" />
                            <div className="grid-hover-overlay"></div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default UserFeedPage;