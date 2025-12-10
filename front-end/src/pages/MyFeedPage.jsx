import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Grid, Bookmark, Settings } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import apiService from "../service/apiService";

const MyFeedPage = () => {
    const [user, setUser] = useState({
        username: '',
        name: '',
        profileImage: '',
        postCount: '',
    });
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user') || {});


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
            const userId = currentUser.userId;
            if(!currentUser) navigate('/login');

            // 전체 게시물 가져오기
            const allPosts = await apiService.getUserPosts(userId);

            // 내 게시물만 필터링
            // const myPosts = allPosts.filter(post => post.userId !== userId);

            setPosts(allPosts);
            setUser(prev => ({
                ...prev,
                postCount: allPosts.length
            }))
            // console.log("✅ 데이터 불러오기 성공");
            // console.log("userPosts: ", userPosts);
        } catch (err) {
            console.log("❌ 데이터 불러오기 실패");
            alert("데이터를 불러올 수 없습니다.");
        } finally  {
            setLoading(false);
        }
    }

    const handleUserInfo = () => {
        if(currentUser) {
            // console.log("🎈 user: ", currentUser);
            setUser(prev => ({
                ...prev,
                username: currentUser.userName,
                name: currentUser.userFullName,
                profileImage: currentUser.userAvatar || '/static/img/default-avatar.jpg',
            }))

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
                                src={user.profileImage || '/static/img/default-avatar.jpg'}
                                alt="profile"
                                className="profile-image-large"
                            />
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <div className="profile-title-row">
                            <h2 className="profile-username">{user.username}</h2>
                            <div className="profile-actions">
                                <button className="profile-edit-btn">프로필 편집</button>
                                <button className="profile-archive-btn">보관함 보기</button>
                                <Settings size={20} className="profile-settings-icon" />
                            </div>
                        </div>

                        <ul className="profile-stats">
                            <li>게시물 <strong>{user.postCount}</strong></li>
                            <li>팔로워 <strong>{user.followerCount}</strong></li>
                            <li>팔로잉 <strong>{user.followingCount}</strong></li>
                        </ul>

                        <div className="profile-bio-container">
                            <div className="profile-fullname">{user.name}</div>
                            <div className="profile-bio">{user.bio}</div>
                        </div>
                    </div>
                </header>

                <div className="profile-stats-mobile">
                    <div className="stat-item">
                        <span className="stat-value">{user.postCount}</span>
                        <span className="stat-label">게시물</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{user.followerCount}</span>
                        <span className="stat-label">팔로워</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{user.followingCount}</span>
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