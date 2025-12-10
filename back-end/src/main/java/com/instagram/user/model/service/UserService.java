package com.instagram.user.model.service;

import com.instagram.user.model.dto.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    // 회원가입
    void signUp(User user);
    // 로그인
    User login(String userEmail, String userPassword);

    User getUserByEmail(String userEmail);

    User getUserByUsername(String userName);

    User getUserById(int userId);

    // 유저 정보 수정
    User updateUser(User user, MultipartFile file);
}
