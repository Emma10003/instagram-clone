// ============================================
// src/pages/UploadPage.jsx
// TODO: 업로드 페이지 UI 및 기능 구현
// - selectedImage, imagePreview, caption, location, loading state 선언
// - handleImageChange: 파일 선택 시 미리보기 생성
// - handlePost: 게시물 업로드 (입력값 검증, API 호출, /feed 이동)
// ============================================

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import apiService from '../service/apiService';
import {ArrowLeft, Image} from 'lucide-react';

const UploadPage = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || {});

    const handleImageChange = (e) => {
        const f = e.target.files[0];

        if (f) {
            setSelectedImage(f);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(f);
        }

    };

    const handlePost = async () => {
        if (!selectedImage || !caption.trim()) {
            alert("이미지와 캡션을 입력해주세요.");
            return;
        }

        try {
            await apiService.createPost(selectedImage, caption, location);
            alert("게시물이 성공적으로 등록되었습니다.");
            navigate('/feed');
        } catch (err) {
            alert("게시물 등록에 실패했습니다.");
        } finally {
            setLoading(true);
        }
    };

    const handleLocationChange = () => {
        const loc = prompt("위치를 입력하세요.");
        if(loc) setLocation(loc);
    }

    // user.userAvatar 로 가져온 이미지가 엑스박스일 때
    const avatarImage = user.userAvatar && user.userAvatar.trim() !== ''
        ? user.userAvatar
        : '/static/img/default-avatar.jpg'

    const handleAvatarError = (e) => {
        e.target.src = '/static/img/default-avatar.jpg';
    }

    return (
        <div className="upload-container">
            <header className="upload-header">
                <div className="upload-header-content">
                    <button className="upload-back-btn"
                            onClick={() => navigate('/feed')}>
                        <ArrowLeft size={24}/>
                    </button>

                    <h2 className="upload-title">새 게시물</h2>

                    <button className="upload-submit-btn"
                            onClick={handlePost}
                            disabled={loading}>
                        {loading ? '등록 중...' : '공유'}
                    </button>
                </div>
            </header>

            <div className="upload-content">
                <div className="upload-card">
                    <div className="upload-image-area">
                        {imagePreview ? (
                            <>
                                <img src={imagePreview}
                                     className="upload-preview-image"/>
                                <label className="upload-change-btn">
                                    이미지 변경
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="upload-file-input"
                                    />
                                </label>
                            </>
                        ) : (
                            <label className="upload-label">
                                <Image className="upload-icon" />
                                <span className="upload-text">
                                    사진을 선택하세요.
                                </span>
                                <span className="upload-select-btn">
                                    컴퓨터에서 선택
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="upload-file-input"
                                />
                            </label>
                        )}
                    </div>

                    <div className="upload-caption-area">
                        <div className="upload-caption-content">
                            <img className="upload-user-avatar"
                                 src={avatarImage}
                                 onError={handleAvatarError}
                            />
                            <div className="upload-caption-right">
                                <div className="upload-username">
                                    {user.userName}
                                </div>

                                <textarea
                                    placeholder="문구를 입력하세요..."
                                    value={caption}
                                    onChange={e => setCaption(e.target.value)}
                                    rows={4}
                                    className="upload-caption-input"
                                />
                                <div className="upload-caption-content">
                                    {caption.length} / 2,200
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="upload-options">
                        <button className="upload-option-btn"
                                onClick={handleLocationChange}
                        >
                            <span className="upload-option-text">{location || '위치 추가'}</span>
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