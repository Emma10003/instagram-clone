import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { getImageUrl } from '../service/commonService';
import Header from '../components/Header';
import '../App.css';

const EditProfilePage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        userName: '',
        userFullname: '',
        userEmail: ''
    });

    const [previewImage, setPreviewImage] = useState('');
    const [file, setFile] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        loadUserData();
    }, []);

    // TODO 3-6: loadUserData 함수 작성
    const loadUserData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if(!user) navigate('/login');
            // const userData = await apiService.getUser(user.userId); -> localStorage 존재하기 때문에 필요 X
            setUser(user);
            setFormData({
                userName: user.userName,
                userFullname: user.userFullname,
                userEmail: user.userEmail,
            })
            setPreviewImage(getImageUrl(user.userAvatar));
            
        } catch (err) {
            console.error('사용자 정보 로드 실패', err);
        }
    };

    // TODO 3-7: handleImageChange 함수 작성
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile) {
            setFile(selectedFile);
            const imgUrl = URL.createObjectURL(selectedFile);
            setPreviewImage(imgUrl);
        }
    };

    // TODO 3-8: handleChange 함수 작성
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    // TODO 3-9: handleSubmit 함수 작성
    const handleSubmit = async () => {
        if (!user) return;
        setLoading(true);

        try {
            // 1. new FormData() 생성
            const submitData = new FormData();
            // 2. formData의 각 필드를 submitData.append()로 추가
            const {imgUrl, ...changeData} = formData;
            const updateBlob = new Blob([JSON.stringify(changeData)],
                {type: 'application/json'});

            submitData.append('formData', updateBlob);

            if(file)
                submitData.append('profileImage', file);

            await apiService.updateProfile(user.userId, submitData);
            // SQL 에 저장된 user 정보로 다시 가져오기
            localStorage.getItem('user');
            alert('프로필이 저장되었습니다.');
            navigate('/myfeed');
        } catch (err) {
            console.error(err);
            alert('프로필 저장 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if(!user) return <div>Loading...</div>;

    return (
        <div className="feed-container">
            <Header/>

            <div className="edit-profile-wrapper">
                <div className="edit-profile-card">
                    <div className="edit-profile-sidebar">
                        {/* '프로필 편집', '비밀번호 변경', '앱 및 웹사이트' div 3개 */}
                        <div className="sidebar-item active">프로필 편집</div>
                        <div className="sidebar-item">비밀번호 변경</div>
                        <div className="sidebar-item">앱 및 웹사이트</div>
                    </div>

                    <div className="edit-profile-form">
                        <div className="form-group photo-section">
                            <div className="photo-label-area">
                                <img src={previewImage}
                                     alt="프로필 미리보기"
                                     className="edit-profile-avatar"
                                />
                            </div>
                            <div className="photo-input-area">
                                <label htmlFor="profile-upload" className="photo-change-btn">
                                    프로필 사진 바꾸기
                                </label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{display: 'none'}}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">이름</label>
                            <div className="form-input-wrapper">
                                <input className="edit-input"
                                       type="text"
                                       name="userFullname"
                                       value={formData.userFullname}
                                       onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">사용자 이름</label>
                            <div className="form-input-wrapper">
                                <input className="edit-input"
                                       type="text"
                                       name="userName"
                                       value={formData.userName}
                                       onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">이메일</label>
                            <div className="form-input-wrapper">
                                <input className="edit-input"
                                       type="text"
                                       name="userEmail"
                                       value={formData.userEmail}
                                       onChange={handleChange}
                                       disabled={true}
                                       readOnly
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label"></label>
                            <div className="form-input-wrapper">
                                <button className="edit-submit-btn" onClick={handleSubmit} disabled={loading}>
                                    {loading ? '저장 중' : '수정'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
