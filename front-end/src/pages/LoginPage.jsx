// ============================================
// src/pages/LoginPage.jsx
// TODO: 로그인 페이지 UI 및 기능 구현
// - username, password state 선언
// - loading state 선언
// - handleLogin 함수: apiService.login 호출
// - 로그인 성공 시 token과 user를 localStorage에 저장
// - 로그인 성공 시 /feed로 이동
// - Enter 키 입력 시 로그인 처리
// ============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // TODO: handleLogin 함수를 작성하세요
    // 1. 입력값 검증 (username과 password가 비어있는지 확인)
    // 2. loading을 true로 설정
    // 3. apiService.login(username, password) 호출
    // 4. 성공 시: localStorage에 token과 user 저장, /feed로 이동
    // 5. 실패 시: alert로 에러 메시지 표시
    // 6. finally: loading을 false로 설정
    const handleLogin = async () => {
        try {
            const res = await apiService.login(userEmail, password);
            alert('로그인이 완료되었습니다.');
            navigate("/feed");
        } catch(error) {
            if(error.response?.status === 401) {
                alert("이메일 또는 비밀번호가 올바르지 않습니다.");
            } else {
                alert("로그인에 실패했습니다. 다시 로그인해주세요.");
            }

        } finally {
            setLoading(false);
        }
    };

    const handleKakaoLogin = () => {
        const API_KEY = process.env.REACT_APP_KAKAO_CLIENT_ID;
        const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URL;
        console.log("API_KEY: ", API_KEY);
        console.log("REDIRECT_URI: ", REDIRECT_URI);


        if(!API_KEY || !REDIRECT_URI) {
            alert("카카오 설정 오류: 환경변수를 확인해주세요.");
            return;
        }

        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = kakaoAuthUrl;
    }

    // TODO: Enter 키 입력 시 handleLogin 호출하는 함수 작성
    const handleKeyPress = (e) => {
        // TODO: 함수를 완성하세요
        if(e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-card">
                    <h1 className="login-title">Instagram</h1>

                    <div>
                        <input
                            className="login-input"
                            type="text"
                            value={userEmail}
                            placeholder="전화번호, 사용자 이름 또는 이메일"
                            onChange={(e) => setUserEmail(e.target.value)}
                        />

                        <input
                            className="login-input"
                            type="password"
                            value={password}
                            placeholder="비밀번호"
                            onChange={e => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />

                        <button
                            className="login-button"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </div>

                    <div className="divider">
                        <div className="divider-line"></div>
                        <span className="divider-text">또는</span>
                        <div className="divider-line"></div>
                    </div>

                    <button className="facebook-login">
                        SNS로 로그인
                    </button>
                    <img onClick={handleKakaoLogin}
                         src='/static/img/kakao_login_medium_wide.png'
                    />

                    <button className="forgot-password">
                        비밀번호를 잊으셨나요?
                    </button>
                </div>

                {
                    // 익명함수란 = 명칭을 작성하지 않고 1회성으로 사용하는 기능
                    // 이름이 존재하는 함수란 = 기능의 명칭을 부여하여 다양한 태그에서 함수를 재사용하는 함수
                    // onClick={} : 클릭했을 때 특정 기능을 동작해라.
                    // onClick={동작할 기능명칭}
                }
                <div className="signup-box">
                    <p>
                        계정이 없으신가요?
                        <button className="signup-link"
                                           onClick={() => navigate("/signup")}
                        >
                        가입하기
                    </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;