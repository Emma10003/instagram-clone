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
    // TODO: username state를 선언하세요

    // TODO: password state를 선언하세요

    // TODO: loading state를 선언하세요

    // TODO: useNavigate를 사용하여 navigate 함수를 가져오세요

    // TODO: handleLogin 함수를 작성하세요
    // 1. 입력값 검증 (username과 password가 비어있는지 확인)
    // 2. loading을 true로 설정
    // 3. apiService.login(username, password) 호출
    // 4. 성공 시: localStorage에 token과 user 저장, /feed로 이동
    // 5. 실패 시: alert로 에러 메시지 표시
    // 6. finally: loading을 false로 설정
    const handleLogin = async () => {
        // TODO: 함수를 완성하세요
    };

    // TODO: Enter 키 입력 시 handleLogin 호출하는 함수 작성
    const handleKeyPress = (e) => {
        // TODO: 함수를 완성하세요
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-card">
                    <h1 className="login-title">Instagram</h1>

                    <div>
                        {/* TODO: 아이디 입력 input 작성 */}
                        {/* placeholder: "전화번호, 사용자 이름 또는 이메일" */}
                        {/* value: username */}
                        {/* onChange: setUsername */}
                        {/* onKeyPress: handleKeyPress */}

                        {/* TODO: 비밀번호 입력 input 작성 */}
                        {/* type: "password" */}
                        {/* placeholder: "비밀번호" */}
                        {/* value: password */}
                        {/* onChange: setPassword */}
                        {/* onKeyPress: handleKeyPress */}

                        {/* TODO: 로그인 버튼 작성 */}
                        {/* onClick: handleLogin */}
                        {/* disabled: loading */}
                        {/* 버튼 텍스트: loading이면 "로그인 중...", 아니면 "로그인" */}
                    </div>

                    <div className="divider">
                        <div className="divider-line"></div>
                        <span className="divider-text">또는</span>
                        <div className="divider-line"></div>
                    </div>

                    <button className="facebook-login">
                        Facebook으로 로그인
                    </button>

                    <button className="forgot-password">
                        비밀번호를 잊으셨나요?
                    </button>
                </div>

                <div className="signup-box">
                    <p>
                        계정이 없으신가요? <button className="signup-link">가입하기</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;