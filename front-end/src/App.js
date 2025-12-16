// ============================================
// src/App.js
// TODO: React Router 설정하기
// - BrowserRouter, Routes, Route import 하기
// - LoginPage, FeedPage, UploadPage import 하기
// - PrivateRoute import 하기
// - /login 경로에 LoginPage 연결
// - /feed 경로에 FeedPage 연결 (PrivateRoute로 보호)
// - /upload 경로에 UploadPage 연결 (PrivateRoute로 보호)
// - 기본 경로(/)는 /login으로 리다이렉트
// ============================================

import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import PrivateRoute from "./provider/PrivateRoute";
import {Edit, Upload} from "lucide-react";
import SignupPage from "./pages/SignupPage";
import UploadPage from "./pages/UploadPage";
import StoryUploadPage from "./pages/StoryUploadPage";
import MyFeedPage from "./pages/MyFeedPage";
import StoryDetailPage from "./pages/StoryDetailPage";
import EditProfilePage from "./pages/EditProfilePage";
import KakaoCallback from "./pages/KakaoCallback";
import PostDetailPage from "./pages/PostDetailPage";
import FeedRouter from "./components/FeedRouter";

function App() {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            if (savedUser && token) {
                return JSON.parse(savedUser);
            }
            return null;
        } catch(err) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return null;
        }
    })

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/auth/kakao/callback" element={<KakaoCallback />} />

                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/feed"
                           element={
                               <PrivateRoute>
                                   <FeedPage />
                               </PrivateRoute>}
                    />
                    <Route path="/post/:postId"
                           element={<PostDetailPage />}
                    />
                    <Route path="/story/detail/:userId"
                           element={
                               <PrivateRoute>
                                   <StoryDetailPage />
                               </PrivateRoute>
                           }
                    />
                    <Route path="/upload"
                           element={
                               <PrivateRoute>
                                   <UploadPage />
                               </PrivateRoute>
                           }

                    />
                    <Route path="/story/upload"
                           element={
                                <PrivateRoute>
                                    <StoryUploadPage />
                                </PrivateRoute>
                           }
                    />
                    <Route path="/myfeed"
                           element={<FeedRouter />} />
                           {/*
                           element={
                                <PrivateRoute>
                                   <MyFeedPage />
                                </PrivateRoute>
                           }*/}
                    <Route path="/profile/edit"
                           element={
                                <PrivateRoute>
                                    <EditProfilePage />
                                </PrivateRoute>
                           }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;