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
        loadMyFeedData();
    }, []);

    const loadMyFeedData = async () => {
        setLoading(true);

        try {
            if(!currentUser) navigate('/login');
            setUser(currentUser);

            const allPosts = await apiService.getMyPost(userId);
            setPosts(allPosts);
        } catch (err) {
            console.log("❌ 데이터 불러오기 실패");
            alert("데이터를 불러올 수 없습니다.");
        } finally  {
            setLoading(false);
        }
    }

    if(loading) return <div>로딩 중...</div>

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
                        <div key={post.postId} className="grid-item"
                             onClick={() => navigate(`/post/${post.postId}`)}>
                            {/*
                                이미지 위에 overlay 와 같은 효과가 덮어씌어진 상태로
                                <div key={post.postId} className="grid-item"
                                 onClick={() => navigate(`/post/${post.postId}`)}>
                                 에 클릭 기능을 넣거나
                                 <div className="grid-hover-overlay"></div>
                                 여기에 클릭 기능을 넣어주는 것이 좋다.
                            */}
                            <img src={post.postImage} alt="post"/>
                            <div className="grid-hover-overlay"></div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MyFeedPage;