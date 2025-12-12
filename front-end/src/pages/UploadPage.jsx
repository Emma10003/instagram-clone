import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import apiService from '../service/apiService';
import {Image} from 'lucide-react';
import {getFilteredFile, FILTER_OPTIONS} from "../service/filterService";
import Header from "../components/Header";
import MentionInput from "../components/MentionInput";
// TODO 10: MentionInput 컴포넌트 import
// import MentionInput from "../components/MentionInput";


const UploadPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('none');

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleImageChange = (e) => {
        const f = e.target.files[0];
        if (f) {
            setSelectedImage(f);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setSelectedFilter('none');
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
            setLoading(true);
            const filteredImage = await getFilteredFile(selectedImage, selectedFilter);
            await apiService.createPost(filteredImage, caption, location);
            alert("게시물이 성공적으로 등록되었습니다.");
            navigate("/feed")
        } catch (err) {
            alert("게시물 등록에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handleLocationChange = () => {
        const loc = prompt('위치를 입력하세요.');
        if(loc) setLocation(loc);
    }

    const avatarImage = user.userAvatar && user.userAvatar.trim() !== ''?
        user.userAvatar : '/static/img/default-avatar.jpg';

    const handleAvatarError = (e) => {
        e.target.src ='/static/img/default-avatar.jpg';
    }

    return (
        <div className="upload-container">
            <Header
                type="upload"
                title="새 게시물"
                onSubmit={handlePost}
                submitDisabled={!selectedImage || !caption.trim()}
                loading={loading}
                submitText={"공유"} />

            <div className="upload-content">
                <div className="upload-card">
                    <div className="upload-image-area">
                        {imagePreview ? (
                            <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
                                <img
                                    src={imagePreview}
                                    className="upload-preview-image"
                                    style={{filter: selectedFilter}}
                                />
                                <div className="filter-scroll-container">
                                    {FILTER_OPTIONS.map((option) => (
                                        <div key={option.name}
                                             className={`filter-item
                                                ${selectedFilter === option.filter ?'active':''}  `}
                                             onClick={() => setSelectedFilter(option.filter)}
                                        >
                                            <span className="filter-name">{option.name}</span>
                                            <div className="filter-thumbnail"
                                                 style={{
                                                     backgroundImage:`url(${imagePreview})`,
                                                     filter: option.filter,
                                                 }}
                                            />
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
                                <input type="file"
                                       accept="image/*"
                                       onChange={handleImageChange}
                                       className="upload-file-input"
                                />
                            </label>)
                        }
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

                                {/* TODO 11: 기존 textarea를 MentionInput으로 교체 */}
                                <MentionInput value={caption}
                                              onChange={setCaption}
                                              placeholder="문구를 입력하세요... (@로 사용자 태그)"
                                              rows={4}
                                />
                                {/*
                                    요구사항:
                                    1. 기존 textarea 주석 처리
                                    2. <MentionInput /> 사용
                                    3. props 전달:
                                       - value={caption}
                                       - onChange={setCaption}
                                       - placeholder="문구를 입력하세요... (@로 사용자 태그)"
                                       - rows={4}
                                */}
                                {/*
                                <textarea
                                    placeholder="문구를 입력하세요..."
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    rows={4}
                                    className="upload-caption-input"
                                />
                                */}
                                <div className="upload-caption-count">
                                    {caption.length}/2,200
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="upload-options">
                        <button className="upload-option-btn"
                                onClick={handleLocationChange} >
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