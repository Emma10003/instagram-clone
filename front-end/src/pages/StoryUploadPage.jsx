import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { ArrowLeft, Image, X } from 'lucide-react';
import { getFilteredFile, FILTER_OPTIONS } from '../service/filterService';

const StoryUploadPage = () => {
    // TODO: selectedImage state를 선언하세요 (초기값: null)

    // TODO: imagePreview state를 선언하세요 (초기값: null)

    // TODO: loading state를 선언하세요 (초기값: false)

    // TODO: selectedFilter state를 선언하세요 (초기값: 'none')

    // TODO: useNavigate를 사용하여 navigate 함수를 가져오세요

    // TODO: localStorage에서 user 정보를 가져오세요 (JSON.parse 사용)

    // TODO: handleImageChange 함수를 작성하세요
    // 1. e.target.files[0]으로 파일 가져오기
    // 2. 파일이 있으면:
    //    - selectedImage에 파일 저장
    //    - FileReader를 생성하고 onloadend 이벤트 설정
    //    - reader.result를 imagePreview에 저장
    //    - selectedFilter를 'none'으로 초기화
    //    - reader.readAsDataURL(file) 호출
    const handleImageChange = (e) => {
        // TODO: 함수를 완성하세요
    };

    // TODO: handlePost 함수를 작성하세요
    // 1. 입력값 검증: selectedImage가 없으면 alert('이미지를 선택해주세요.') 후 return
    // 2. try-catch-finally 블록 사용
    // 3. loading을 true로 설정
    // 4. getFilteredFile(selectedImage, selectedFilter)로 필터 적용된 이미지 생성
    // 5. apiService.createStory(filteredImage) 호출
    // 6. 성공 시: alert('스토리가 성공적으로 업로드되었습니다.'), navigate('/feed')
    // 7. 실패 시: console.error, alert('스토리 업로드에 실패했습니다.')
    // 8. finally: loading을 false로 설정
    const handlePost = async () => {
        // TODO: 함수를 완성하세요
    };

    // TODO: handleRemoveImage 함수를 작성하세요
    // 1. selectedImage를 null로 설정
    // 2. imagePreview를 null로 설정
    // 3. selectedFilter를 'none'으로 설정
    const handleRemoveImage = () => {
        // TODO: 함수를 완성하세요
    };

    return (
        <div className="upload-container">
            {/* TODO: 헤더 작성 */}
            <header className="upload-header">
                <div className="upload-header-content">
                    {/* TODO: 뒤로가기 버튼 작성 */}
                    {/* ArrowLeft 아이콘 사용, onClick: navigate('/feed') */}
                    <button
                        className="upload-back-btn"
                        onClick={() => {/* TODO: /feed로 이동 */}}
                    >
                        {/* TODO: ArrowLeft 아이콘 추가 (size={24}) */}
                    </button>

                    {/* TODO: 제목 작성 */}
                    <h2 className="upload-title">새 스토리</h2>

                    {/* TODO: 공유 버튼 작성 */}
                    {/* onClick: handlePost */}
                    {/* disabled: loading || !selectedImage */}
                    {/* style: opacity를 조건부로 설정 (이미지 없거나 로딩중이면 0.5, 아니면 1) */}
                    {/* 버튼 텍스트: loading이면 "업로드 중...", 아니면 "공유" */}
                    <button
                        className="upload-submit-btn"
                        onClick={/* TODO: handlePost 연결 */}
                        disabled={/* TODO: loading || !selectedImage */}
                        style={{ opacity: /* TODO: 조건부 opacity */ }}
                    >
                        {/* TODO: 조건부 텍스트 렌더링 */}
                    </button>
                </div>
            </header>

            <div className="upload-content">
                <div className="upload-card">
                    {/* TODO: 이미지 업로드 영역 작성 */}
                    <div className="upload-image-area">
                        {/* TODO: imagePreview가 있으면 이미지와 필터 표시, 없으면 업로드 UI 표시 */}
                        {/* 조건: imagePreview ? (...) : (...) */}

                        {/* imagePreview가 있을 때 */}
                        {imagePreview ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'relative' }}>
                                    {/* TODO: 이미지 미리보기 작성 */}
                                    {/* src: imagePreview */}
                                    {/* style: { filter: selectedFilter } */}
                                    {/* className: "upload-preview-image" */}

                                    {/* TODO: 이미지 삭제 버튼 작성 */}
                                    {/* X 아이콘 사용, onClick: handleRemoveImage */}
                                    {/* position: absolute, top: 1rem, right: 1rem */}
                                    {/* backgroundColor: rgba(0, 0, 0, 0.6), color: white */}
                                    {/* borderRadius: 50%, width: 2rem, height: 2rem */}
                                </div>

                                {/* TODO: 필터 스크롤 컨테이너 작성 */}
                                <div className="filter-scroll-container">
                                    {/* TODO: FILTER_OPTIONS.map으로 필터 목록 렌더링 */}
                                    {/* key: option.name */}
                                    {/* className: filter-item + (선택된 필터면 active 추가) */}
                                    {/* onClick: setSelectedFilter(option.filter) */}
                                    {FILTER_OPTIONS.map((option) => (
                                        <div
                                            key={/* TODO: option.name */}
                                            className={`filter-item ${/* TODO: 선택된 필터면 'active' 추가 */}`}
                                            onClick={() => {/* TODO: setSelectedFilter */}}
                                        >
                                            {/* TODO: 필터 이름 표시 */}
                                            <span className="filter-name">{/* TODO: option.name */}</span>

                                            {/* TODO: 필터 썸네일 작성 */}
                                            {/* backgroundImage: url(imagePreview) */}
                                            {/* filter: option.filter */}
                                            <div
                                                className="filter-thumbnail"
                                                style={{
                                                    backgroundImage: /* TODO: imagePreview 설정 */,
                                                    filter: /* TODO: option.filter */,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* TODO: 이미지 변경 버튼 작성 */}
                                {/* label 태그 사용, className: "upload-change-btn" */}
                                {/* input type="file", accept="image/*", onChange: handleImageChange */}
                                <label className="upload-change-btn">
                                    이미지 변경
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={/* TODO: handleImageChange 연결 */}
                                        className="upload-file-input"
                                    />
                                </label>
                            </div>
                        ) : (
                            /* imagePreview가 없을 때 - 업로드 UI */
                            <label className="upload-label">
                                {/* TODO: Image 아이콘 추가 (className: "upload-icon") */}

                                {/* TODO: 안내 텍스트 작성 */}
                                <span className="upload-text">
                                    스토리에 공유할 사진을 선택하세요
                                </span>

                                {/* TODO: 선택 버튼 텍스트 */}
                                <span className="upload-select-btn">
                                    컴퓨터에서 선택
                                </span>

                                {/* TODO: 파일 input 작성 */}
                                {/* type: "file", accept: "image/*" */}
                                {/* onChange: handleImageChange */}
                                {/* className: "upload-file-input" */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={/* TODO: handleImageChange 연결 */}
                                    className="upload-file-input"
                                />
                            </label>
                        )}
                    </div>

                    {/* TODO: 안내 메시지 (imagePreview가 있을 때만 표시) */}
                    {/* 조건: imagePreview && (...) */}
                    {imagePreview && (
                        <div style={{
                            padding: '1rem',
                            borderTop: '1px solid #dbdbdb',
                            backgroundColor: '#fafafa'
                        }}>
                            {/* TODO: 안내 문구 작성 */}
                            {/* "스토리는 24시간 후 자동으로 삭제됩니다" */}
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#8e8e8e',
                                textAlign: 'center'
                            }}>
                                {/* TODO: 안내 텍스트 */}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryUploadPage;