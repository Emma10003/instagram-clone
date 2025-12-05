// ============================================
// src/pages/FeedPage.jsx
// TODO: 피드 페이지 UI 및 기능 구현
// - posts, stories, loading state 선언
// - useEffect로 컴포넌트 마운트 시 데이터 로드
// - loadFeedData 함수: getPosts, getStories 호출
// - toggleLike 함수: addLike/removeLike 호출 후 목록 새로고침
// - handleLogout 함수: 확인 후 로그아웃
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, PlusSquare, Film, User } from 'lucide-react';

const FeedPage = () => {
    // TODO: posts state를 선언하세요 (초기값: [])

    // TODO: stories state를 선언하세요 (초기값: [])

    // TODO: loading state를 선언하세요 (초기값: true)

    // TODO: useNavigate를 사용하여 navigate 함수를 가져오세요

    // TODO: useEffect를 사용하여 컴포넌트 마운트 시 loadFeedData 호출

    // TODO: loadFeedData 함수를 작성하세요
    // 1. try-catch 사용
    // 2. apiService.getPosts()와 apiService.getStories()를 Promise.all로 동시 호출
    // 3. 받아온 데이터로 posts와 stories state 업데이트
    // 4. catch: 에러 처리 (console.error, alert)
    // 5. finally: loading을 false로 설정
    const loadFeedData = async () => {
        // TODO: 함수를 완성하세요
    };

    // TODO: toggleLike 함수를 작성하세요
    // 1. postId와 isLiked를 파라미터로 받음
    // 2. isLiked가 true면 removeLike, false면 addLike 호출
    // 3. 완료 후 getPosts()를 다시 호출하여 목록 새로고침
    // 4. catch: 에러 처리
    const toggleLike = async (postId, isLiked) => {
        // TODO: 함수를 완성하세요
    };

    // TODO: handleLogout 함수를 작성하세요
    // 1. window.confirm으로 로그아웃 확인
    // 2. 확인하면 apiService.logout() 호출
    const handleLogout = () => {
        // TODO: 함수를 완성하세요
    };

    // TODO: loading이 true면 "로딩 중..." 표시
    if (loading) {
        return (
            <div className="feed-container">
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    로딩 중...
                </div>
            </div>
        );
    }

    return (
        <div className="feed-container">
            {/* TODO: 헤더 작성 */}
            <header className="header">
                <div className="header-container">
                    <h1 className="header-title">Instagram</h1>
                    <div className="header-nav">
                        {/* TODO: 아이콘들을 작성하세요 */}
                        {/* Home, MessageCircle, PlusSquare(onClick: /upload 이동), Film, User(onClick: 로그아웃) */}
                    </div>
                </div>
            </header>

            <div className="feed-content">
                {/* TODO: 스토리 섹션 작성 */}
                {/* stories 배열이 있을 때만 표시 */}
                {/* stories.map으로 각 스토리를 렌더링 */}

                {/* TODO: 게시물 목록 작성 */}
                {/* posts.map으로 각 게시물을 렌더링 */}
                {/* 게시물 헤더: 프로필 이미지, 사용자명 */}
                {/* 게시물 이미지 */}
                {/* 게시물 액션: 좋아요, 댓글, 공유, 북마크 */}
                {/* 좋아요 수 */}
                {/* 캡션 */}
                {/* 댓글 수 */}
                {/* 작성 시간 */}
                {/* 댓글 입력창 */}

                {/* TODO: 게시물이 없을 때 메시지 표시 */}
            </div>
        </div>
    );
};

export default FeedPage;
