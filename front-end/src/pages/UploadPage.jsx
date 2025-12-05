// ============================================
// src/pages/UploadPage.jsx
// TODO: 업로드 페이지 UI 및 기능 구현
// - selectedImage, imagePreview, caption, location, loading state 선언
// - handleImageChange: 파일 선택 시 미리보기 생성
// - handlePost: 게시물 업로드 (입력값 검증, API 호출, /feed 이동)
// ============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { ArrowLeft, Image } from 'lucide-react';

const UploadPage = () => {
    // TODO: selectedImage state를 선언하세요

    // TODO: imagePreview state를 선언하세요

    // TODO: caption state를 선언하세요

    // TODO: location state를 선언하세요

    // TODO: loading state를 선언하세요

    // TODO: useNavigate를 사용하여 navigate 함수를 가져오세요

    // TODO: localStorage에서 user 정보를 가져오세요

    // TODO: handleImageChange 함수를 작성하세요
    // 1. e.target.files[0]으로 파일 가져오기
    // 2. 파일이 있으면 selectedImage에 저장
    // 3. FileReader를 사용하여 base64로 변환
    // 4. imagePreview에 base64 데이터 저장
    const handleImageChange = (e) => {
        // TODO: 함수를 완성하세요
    };

    // TODO: handlePost 함수를 작성하세요
    // 1. 입력값 검증 (selectedImage와 caption이 있는지 확인)
    // 2. loading을 true로 설정
    // 3. apiService.createPost(imagePreview, caption, location) 호출
    // 4. 성공 시: alert로 성공 메시지, /feed로 이동
    // 5. 실패 시: alert로 에러 메시지
    // 6. finally: loading을 false로 설정
    const handlePost = async () => {
        // TODO: 함수를 완성하세요
    };

    return (
        <div className="upload-container">
            {/* TODO: 헤더 작성 */}
            <header className="upload-header">
                <div className="upload-header-content">
                    {/* TODO: 뒤로가기 버튼 (onClick: /feed로 이동) */}

                    <h2 className="upload-title">새 게시물</h2>

                    {/* TODO: 공유 버튼 (onClick: handlePost, disabled: loading) */}
                </div>
            </header>

            <div className="upload-content">
                <div className="upload-card">
                    {/* TODO: 이미지 업로드 영역 작성 */}
                    <div className="upload-image-area">
                        {/* TODO: imagePreview가 있으면 이미지 표시, 없으면 업로드 UI 표시 */}
                        {/* FileReader로 변환한 base64 이미지를 img src에 사용 */}
                        {/* input type="file" accept="image/*" onChange={handleImageChange} */}
                    </div>

                    {/* TODO: 캡션 입력 영역 작성 */}
                    <div className="upload-caption-area">
                        <div className="upload-caption-content">
                            {/* TODO: 프로필 이미지 표시 */}

                            <div className="upload-caption-right">
                                {/* TODO: 사용자명 표시 */}

                                {/* TODO: textarea로 캡션 입력 */}
                                {/* placeholder: "문구를 입력하세요..." */}
                                {/* value: caption */}
                                {/* onChange: setCaption */}

                                {/* TODO: 글자 수 표시 (예: 0/2,200) */}
                            </div>
                        </div>
                    </div>

                    {/* TODO: 추가 옵션 (위치 추가, 태그하기) */}
                    <div className="upload-options">
                        <button className="upload-option-btn">
                            <span className="upload-option-text">위치 추가</span>
                            <span className="upload-option-arrow">›</span>
                        </button>
                        <button className="upload-option-btn">
                            <span className="upload-option-text">태그하기</span>
                            <span className="upload-option-arrow">›</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;