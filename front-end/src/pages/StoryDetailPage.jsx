import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { X, MoreHorizontal, Heart, Send } from 'lucide-react';
import apiService from "../service/apiService";

const StoryDetail = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    const {storyId} = useParams();

    const [storyData, setStoryData] = useState({
        username: '',
        userImage: '',
        storyImage: '',
        uploadedAt: "12시간"
    });

    useEffect(() => {
        loadStoryDetail();
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

    const loadStoryDetail = async () => {
        try{
            const storyDetail = await apiService.getStory(storyId);

            setStoryData(prev => ({
                ...prev,
                username: storyDetail.userName,
                userImage: storyDetail.userAvatar || '/static/img/default-avatar.jpg',
                storyImage: storyDetail.storyImage
            }))
            // storyData.uploadedAt = Date.now() - storyDetail.created_at;

            console.log("storyData: ", storyData);
        } catch(err) {
            alert("스토리를 불러올 수 없습니다.");
            console.error(err);
        }
    }

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