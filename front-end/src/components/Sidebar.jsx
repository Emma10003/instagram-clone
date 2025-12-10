
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, LogOut, UserCog } from 'lucide-react';
import apiService from '../service/apiService';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();


    const handleLogout = () => {
        if(window.confirm('로그아웃 하시겠습니까?')) {
            apiService.logout();
            onClose()
        }
    };

    const handleEditProfile = () => {
        navigate('/profile/edit');
        onClose();
    };

    return (
        <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className={`sidebar-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>

                <div className="sidebar-header">
                    <span className="sidebar-title">설정</span>
                    <X className="sidebar-close-icon" onClick={onClose} />
                </div>

                <ul className="sidebar-menu">
                    <li className="sidebar-item" onClick={handleEditProfile}>
                        <UserCog size={20} />
                        <span>프로필 편집</span>
                    </li>
                    <li className="sidebar-item logout" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>로그아웃</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;