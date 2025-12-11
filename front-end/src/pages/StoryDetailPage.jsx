import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { X, MoreHorizontal, Heart, Send } from 'lucide-react';
import apiService, {API_BASE_URL} from "../service/apiService";
import {formatDate, getImageUrl} from "../service/commonService";

/**
 * commonService 에 현재 날짜를 몇 시간 전 업로드했는지 변환하는 기능 추가
 * {storyData.createdAt}
 *
 * -> formatDate 형태로 1시간 전, 1분 전 등등의 형태로 수정
 *    or yyyy-mm-dd 형태로 확인하도록 수정
 */

const StoryDetail = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const {userId} = useParams();
    // List -> {}
    const [storyData, setStoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // userId -> storyId 로 변경 예정
    useEffect(() => {
        loadStoryData();
    }, [userId]);


    const loadStoryData = async () => {
        setLoading(true);

        try{
            const data = await apiService.getStory(userId);
            // console.log("data: ", data);
            setStoryData(data);
        } catch(err) {
            alert("스토리를 불러오는 데 실패했습니다.");
            navigate('/feed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!storyData) return;

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

    if(loading) return <div>로딩 중...</div>


    return (
        <div className="story-viewer-container">
            <div
                className="story-bg-blur"
                style={{backgroundImage: `url(${getImageUrl(storyData.userAvatar)})`}}
            />

            <div className="story-content-box">
                <div className="story-progress-wrapper">
                    <div className="story-progress-bar">
                        <div className="story-progress-fill"
                             style={{width: `${progress}%`}}>

                        </div>
                    </div>
                </div>

                <div className="story-header-info">
                    <div className="story-user">
                        <img src={getImageUrl(storyData.userAvatar)}
                             alt="user"
                             className="story-user-avatar" />
                        <span className="story-username">{storyData.userName}</span>
                        {/*<span className="story-time">{storyData.createdAt}</span>*/}
                        <span className="story-time">{formatDate(storyData.createdAt, "relative")}</span>
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

                <img src={getImageUrl(storyData.storyImage)} alt="story" className="story-main-image" />

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