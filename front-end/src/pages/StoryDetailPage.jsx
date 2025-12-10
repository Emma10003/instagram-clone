import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { X, MoreHorizontal, Heart, Send } from 'lucide-react';
import apiService from "../service/apiService";
// story의 경우, 상대방의 스토리를 다른 유저가 선택해서 보는 것이 아니라
// 유저가 올린 스토리를 오래된 순서부터 하나씩 보는 것. 어떤 스토리와 스토리가 얼만큼 있는지
// 유저 프로필을 클릭하지 않으면 알 수 없다.
const StoryDetail = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const {userId} = useParams();
    // List -> {}
    const [storyData, setStoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // userId -> storyId 로 변경 예정
    useEffect(() => {
        loadStoryData();
    }, [userId])

    const loadStoryData = async () => {
        setLoading(true);

        try{
            const data = await apiService.getStory(userId);

            setStoryData(data);
            // storyData.uploadedAt = Date.now() - storyDetail.created_at;

            console.log("storyData: ", storyData);
        } catch(err) {
            alert("스토리를 불러오는 데 실패했습니다.");
            navigate('/feed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const duration = 5000;
        const intervalTime = 50;

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    navigate(-1);
                    return 100;
                }
                return prev + (100 / (duration / intervalTime));
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [navigate]);


    return (
        <div className="story-viewer-container">
            <div
                className="story-bg-blur"
                style={{backgroundImage: `url(${storyData.storyImage})`}}
            />

            <div className="story-content-box">
                <div className="story-progress-wrapper">
                    <div className="story-progress-bar">
                        <div className="story-progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                </div>

                <div className="story-header-info">
                    <div className="story-user">
                        <img src={storyData.userImage} alt="user" className="story-user-avatar" />
                        <span className="story-username">{storyData.username}</span>
                        <span className="story-time">{storyData.uploadedAt}</span>
                    </div>
                    <div className="story-header-actions">
                        <MoreHorizontal color="white" className="story-icon"/>
                        <X
                            color="white"
                            className="story-icon"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                </div>

                <img src={storyData.storyImage} alt="story" className="story-main-image" />

                <div className="story-footer">
                    <div className="story-input-container">
                        <input
                            type="text"
                            placeholder="메시지 보내기..."
                            className="story-message-input"
                        />
                    </div>
                    <Heart color="white" className="story-icon" />
                    <Send color="white" className="story-icon" />
                </div>
            </div>
        </div>
    );
};

export default StoryDetail;