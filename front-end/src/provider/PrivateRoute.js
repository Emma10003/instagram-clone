// ============================================
// src/provider/PrivateRoute.js
// TODO: 로그인 확인 후 페이지 접근 제어
// - localStorage에서 'token' 가져오기
// - token이 없으면 /login으로 리다이렉트
// - token이 있으면 children(자식 컴포넌트) 렌더링
// ============================================

import React from 'react';
import {Navigate} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if(!token) return <Navigate to="/login" replace />

    return children;
};

export default PrivateRoute;