import {Film, Home, MessageCircle, PlusSquare, User, ArrowLeft} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";
import apiService from "../service/apiService";

/**
 * TODO: MyFeedPage 와 StoryDetail 임의 데이터를 controller에서 가져온 데이터로 변경해보기
 * GET : [백엔드]
 *          mapper.xml -> Mapper.java -> Service.java -> ServiceImpl.java -> (Rest)Controller.java 순서로 작업 후
 *          postman 이나 백엔드 api/endpoint 주소에서 데이터를 가져오는지 확인!
 *       [프론트엔드]
 *          apiService.js 에서 백엔드 데이터 전달받는 작업
 *          -> 각 jsx에서 api로 가져온 데이터를 화면에 보여주는 작업
 *       이후에 세부 js 작업 진행
 *
 * POST : 백엔드에서 확인하는 방법이 익숙치 않은 경우 프론트 -> 백엔드 순서로 작업
 *
 */
const Header = ({
    type="feed",
    title='',
    onSubmit=null,
    submitDisabled=false,
    submitText='공유',
    loading=false
                }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        if(window.confirm('로그아웃 하시겠습니까?')) apiService.logout();
    };

    if(type === 'feed') {
        return (
            <header className="header">
                <div className="header-container">
                    <h1 className="header-title">Instagram</h1>
                    <div className="header-nav">
                        <Home className="header-icon"
                              onClick={() => navigate('/feed')} />
                        <MessageCircle className="header-icon" />
                        <PlusSquare className="header-icon"
                                    onClick={() => navigate('/upload')} />
                        <Film className="header-icon"
                              onClick={() => navigate('/story/upload')}
                        />
                        <User className="header-icon"
                              onClick={() => navigate('/myfeed')} />

                    </div>
                </div>
            </header>
        )
    }

    if(type === 'upload') {
        return (
            <header className="upload-header">
                <div className="upload-header-content">
                    <button className="upload-back-btn"
                            onClick={() => navigate('/feed')}>
                        <ArrowLeft size={24}/>
                    </button>

                    <h2 className="upload-title">{title}</h2>

                    <button className="upload-submit-btn"
                            onClick={onSubmit}
                            disabled={submitDisabled || loading}
                            style={{opacity:(submitDisabled || loading) ? 0.5 : 1}}
                    >
                        {loading ? '업로드 중...' : submitText}
                    </button>
                </div>
            </header>
        )
    }




}

export default Header;