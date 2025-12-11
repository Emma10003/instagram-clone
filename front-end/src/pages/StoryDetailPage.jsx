import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { X, MoreHorizontal, Heart, Send } from 'lucide-react';
import apiService, {API_BASE_URL} from "../service/apiService";
import {formatDate, getImageUrl} from "../service/commonService";

/**
 * commonService 에 현재 날짜를 몇 시간 전 업로드했는지 변환하는 기능 추가
 * {stories.createdAt}
 *
 * -> formatDate 형태로 1시간 전, 1분 전 등등의 형태로 수정
 *    or yyyy-mm-dd 형태로 확인하도록 수정
 */

const StoryDetail = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const {userId} = useParams();

    // storyData -> stories
    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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

            // 데이터가 배열이고 1개 이상일 때
            if(Array.isArray(data) && data.length > 0) {
                setStories(data);
            } else {
                navigate('/feed');
            }
        } catch(err) {
            alert("스토리를 불러오는 데 실패했습니다.");
            navigate('/feed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // 다음 스토리로 이동
    const goToNextStory = () => {
        if(currentIndex< stories.length-1) {  // 인덱스 숫자와 length 숫자 시작점이 다르므로 맞춰줌
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {  // 마지막 스토리면 창 닫고 피드로 이동 -> 다음 유저 스토리 보기
            navigate('/feed');
        }
    }

    // 이전 스토리로 이동 (현재 번호에서 -1씩 감소)
    const goToPrevStory = () => {
        if(currentIndex > 0) {
            setCurrentIndex((prev => prev - 1));
            setProgress(0);  //다음 게시물이나 이전 게시물로 넘어가면 프로그래스바 처음부터 시작!
        } else {
            navigate('/feed');
        }
    }

    useEffect(() => {
        if(!stories.length) return;

        const duration = 5000;
        const intervalTime = 50;

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    goToNextStory();  // 다음 스토리로 넘어가기
                    return 0;  // 다음 스토리로 넘어갈 때 프로그래스바를 처음부터 다시 시작
                }
                return prev + (100 / (duration / intervalTime));
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [currentIndex, stories]);  // 현재 바라보고 있는 페이지 인덱스가 변경되거나, 배열이 추가될 때 감지
    
    // 화면 클릭으로 이전 / 다음 이동
    /*
    화면 전체 너비 = screenWidth (예: 300)
    왼쪽 1/3 구간   : 0 ~ screenWidth/3                 (예: 0   ~ 100)
    가운데   구간   : screenWidth/3 ~ (screenWidth*2)/3 (예: 100 ~ 200)
    오른쪽 1/3 구간 : (screenWidth*2)/3 ~ screenWidth   (예: 200 ~ 300)
     */
    const handleScreenClick = (e) => {
        // 왼쪽이나 오른쪽 클릭의 경우 좌/우 -> X좌표 기준으로 클릭한다(clientX). (위쪽/아래쪽 클릭의 경우 Y좌표 기준)
        const clickX = e.clientX;
        const screenWidth = window.innerWidth;  // 내부에서 가로 측정
        
        if(clickX < screenWidth / 3) {
            // X좌표 기준 왼쪽 1/3 정도의 위치를 클릭하면 이전페이지로 이동
            goToPrevStory();
        } else if(clickX > (screenWidth * 2) / 3) {
            // X좌표 기준 오른쪽 1/3 정도의 위치를 클릭하면 다음페이지로 이동
            // 사용자가 전체 가로너비 300 기준 200 이상인 위치를 클릭했을 때
            goToNextStory();
        }
    }

    if(loading) return <div>로딩 중...</div>


    return (
        /* 스토리 전체 화면에서 클릭이 일어날 수 있다. -> handleScreenClick */
        <div className="story-viewer-container"
             onClick={handleScreenClick}
        >
            <div
                className="story-bg-blur"
                style={{backgroundImage: `url(${getImageUrl(stories.userAvatar)})`}}
            />

            <div className="story-content-box">
                <div className="story-progress-wrapper">
                    {stories.map((_, index) => (
                        <div key={index}
                             className="story-progress-bar">
                        <div className="story-progress-fill"
                             style={{width: index < currentIndex
                                     ? '100%'
                                     : index === currentIndex
                                         ? `${progress}%`
                                         : '0%'
                        }}>

                        </div>
                    </div>
                    ))}
                </div>

                <div className="story-header-info">
                    <div className="story-user">
                        <img src={getImageUrl(stories.userAvatar)}
                             alt="user"
                             className="story-user-avatar" />
                        <span className="story-username">{stories.userName}</span>
                        {/*<span className="story-time">{stories.createdAt}</span>*/}
                        <span className="story-time">{formatDate(stories.createdAt, "relative")}</span>
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

                <img src={getImageUrl(stories.storyImage)} alt="story" className="story-main-image" />

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