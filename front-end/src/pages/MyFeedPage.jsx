import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Grid, Bookmark, Settings } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import apiService from "../service/apiService";
import {getImageUrl} from "../service/commonService";

const MyFeedPage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user') || {});
    const userId = currentUser.userId;


    useEffect(() => {
        // 1. apiService -> 데이터 가져오기, 가져온 데이터 List 형태로 출력
        loadMyFeedData();
        // handleUserInfo();
        const dummyPosts = Array.from({ length: 9 }).map((_, i) => ({
            id: i,
            image: `https://picsum.photos/300/300?random=${i}`
        }));
        setPosts(dummyPosts);
    }, []);

    const loadMyFeedData = async () => {
        setLoading(true);

        try {
            if(!currentUser) navigate('/login');

            const allPosts = await apiService.getPost(userId);
            setPosts(allPosts);
        } catch (err) {
            console.log("❌ 데이터 불러오기 실패");
            alert("데이터를 불러올 수 없습니다.");
        } finally  {
            setLoading(false);
        }
    }

    return (
        <div className="feed-container">
            <Header type="feed" />

            <main className="profile-wrapper">
                <header className="profile-header">
                    <div className="profile-image-container">
                        <div className="profile-image-border">
                            <img
                                src={getImageUrl(currentUser.userAvatar)}
                                alt="profile"
                                className="profile-image-large"
                            />
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <div className="profile-title-row">
                            <h2 className="profile-username">{currentUser.userName}</h2>
                            <div className="profile-actions">
                                <button className="profile-edit-btn"
                                        onClick={() => navigate('/profile/edit')}
                                >프로필 편집</button>
                                <button className="profile-archive-btn">보관함 보기</button>
                            </div>
                        </div>

                        <ul className="profile-stats">
                            <li>게시물 <strong>{posts.length}</strong></li>
                            <li>팔로워 <strong>0</strong></li>
                            <li>팔로잉 <strong>0</strong></li>
                        </ul>

                        <div className="profile-bio-container">
                            <div className="profile-fullname">{currentUser.name}</div>
                            <div className="profile-bio">{currentUser.userAvatar}</div>
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

export default MyFeedPage;