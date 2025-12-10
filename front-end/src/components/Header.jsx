import React, { useState } from "react";
import { ArrowLeft, Film, Home, MessageCircle, PlusSquare, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = ({
                    type="feed",
                    title='',
                    onSubmit = null,
                    submitDisabled = false,
                    submitText = '공유',
                    loading = false
                }) => {
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => setIsSidebarOpen(true);

    const closeSidebar = () => setIsSidebarOpen(false);

    if(type === 'feed') {
        return (
            <>
                <header className="header">
                    <div className="header-container">
                        <h1 className="header-title"
                            onClick={()=> navigate('/feed')}
                        >Instagram</h1>
                        <div className="header-nav">
                            <Home className="header-icon" onClick={() => navigate('/')}/>
                            <MessageCircle className="header-icon"/>
                            <PlusSquare className="header-icon" onClick={() => navigate('/upload')}/>
                            <Film className="header-icon" onClick={() => navigate("/story/upload")}/>
                            <User className="header-icon" onClick={() => navigate("/myfeed")}/>

                            <Settings
                                size={20}
                                className="profile-settings-icon"
                                onClick={openSidebar}
                            />
                        </div>
                    </div>
                </header>

                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            </>
        )
    }
    if(type ==='upload') {
        return (
            <header className="upload-header">
                <div className="upload-header-content">
                    <button className="upload-back-btn" onClick={() => navigate("/feed")}>
                        <ArrowLeft size={24}/>
                    </button>
                    <h2 className="upload-title">{title}</h2>
                    <button className="upload-submit-btn"
                            onClick={onSubmit}
                            disabled={submitDisabled || loading}
                            style={{opacity: (submitDisabled || loading) ? 0.5 : 1}}
                    >
                        {loading ? '업로드 중' : submitText}
                    </button>
                </div>
            </header>
        )
    }
}
export default Header;