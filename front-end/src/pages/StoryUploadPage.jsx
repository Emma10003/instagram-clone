import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { ArrowLeft, Image, X } from 'lucide-react';
import { getFilteredFile, FILTER_OPTIONS } from '../service/filterService';
import Header from "../components/Header";

const StoryUploadPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('none');

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setSelectedFilter('none');
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = async () => {
        if(!selectedImage) {
            alert("이미지를 선택해주세요.");
            return;
        }

        try {
            const filteredImage = await getFilteredFile(selectedImage, selectedFilter);
            await apiService.createStory(filteredImage);
            console.log("✅ 스토리 fetch 성공");
            alert("스토리가 성공적으로 업로드되었습니다.");
            navigate('/feed');
        } catch(err) {
            console.error("❌ 스토리 fetch 실패: ", err);
            alert("스토리 업로드에 실패했습니다.");
        } finally {
            setLoading(true);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setSelectedFilter('none');
    };

    return (
        <div className="upload-container">
            <Header
                type="upload"
                title="새 스토리"
                onSubmit={handlePost}
                submitDisabled={!selectedImage}
                loading={loading}
                submitText="공유"
            />

            <div className="upload-content">
                <div className="upload-card">
                    <div className="upload-image-area">
                        {imagePreview ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={imagePreview}
                                         alt={imagePreview}
                                         className="upload-preview-image"
                                         style={{filter:selectedFilter}}
                                    />
                                    <button onClick={handleRemoveImage}
                                            style={{
                                                position:'absolute', top:'1rem', right:'1rem',
                                                backgroundColor:'rgba(0,0,0,0.6)', color:'white',
                                                borderRadius:'50%', width:'2rem', height:'2rem'}}
                                    />
                                    <X size={20} />
                                </div>

                                <div className="filter-scroll-container">
                                    {FILTER_OPTIONS.map((option) => (
                                        <div
                                            key={option.name}
                                            className={`filter-item ${selectedFilter === option.filter ? 'active' : ''}`}
                                            onClick={() => setSelectedFilter(option.filter)}
                                        >
                                            <span className="filter-name">{option.name}</span>

                                            <div
                                                className="filter-thumbnail"
                                                style={{
                                                    backgroundImage: `url(${imagePreview})`,
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
                                    스토리에 공유할 사진을 선택하세요
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

                    {imagePreview && (
                        <div style={{
                            padding: '1rem',
                            borderTop: '1px solid #dbdbdb',
                            backgroundColor: '#fafafa'
                        }}>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#8e8e8e',
                                textAlign: 'center'
                            }}>
                                스토리는 24시간 후 자동으로 삭제됩니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryUploadPage;