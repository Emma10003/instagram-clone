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
import {FILTER_OPTIONS, getFilteredFile} from "../service/filterService";
import Header from "../components/Header";

// 필요에 따라 소비자가 업로드한 이미지를 리사이즈 처리해야 할 수 있다.
// ex) 10MB 이상의 이미지를 올리면 8MB 이하의 이미지로 사이즈/크기 축소
const UploadPage = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const [selectedFilter, setSelectedFilter] = useState('none');
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || {});

    const handleImageChange = (e) => {
        const f = e.target.files[0];
        if (f) {
            console.log("✅ 파일 불러오기 성공");
            setSelectedImage(f);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setSelectedFilter('none');  // 이미지 변경 시 필터 초기화
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
            // 1. 필터가 적용된 이미지 파일을 생성한 데이터 변수에 담기
            const filteredImage = await getFilteredFile(selectedImage, selectedFilter);
            console.log("✅ filter 성공");
            // 2. 필터가 적용된 이미지를 서버에 전송
            await apiService.createPost(filteredImage, caption, location);
            console.log("✅ 백엔드 fetch 성공");
            alert("게시물이 성공적으로 등록되었습니다.");
            navigate('/feed');
        } catch (err) {
            console.log("❌ fetch 실패");
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
            <Header
                type="upload"
                title="새 게시물"
                onSubmit={handlePost}
                submitDisabled={!selectedImage || !caption.trim()}
                loading={loading}
                submitText="공유"
            />

            <div className="upload-content">
                <div className="upload-card">
                    <div className="upload-image-area">
                        {imagePreview ? (
                            <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
                                <img src={imagePreview}
                                     className="upload-preview-image"
                                     style={{filter:selectedFilter}}
                                />
                                <div className="filter-scroll-container">
                                    {FILTER_OPTIONS.map((option) => (
                                        <div key={option.name}
                                             className={`filter-item ${selectedFilter === option.filter ? 'active' : ''}`}
                                             onClick={() => setSelectedFilter(option.filter)}
                                        >
                                            <span className="filter-name">{option.name}</span>
                                            <div className="filter-thumnail"
                                                 style={{
                                                     backgroundImage:`url(${imagePreview})`,
                                                     filter: option.filter,
                                                 }}
                                            >

                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <label className="upload-change-btn">
                                    이미지 변경
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="upload-file-input"
                                    />
                                </label>
                            </div>
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