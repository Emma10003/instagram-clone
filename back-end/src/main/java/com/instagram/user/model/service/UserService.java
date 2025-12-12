package com.instagram.user.model.service;

import com.instagram.user.model.dto.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    // 회원가입
    void signUp(User user);
    // 로그인
    User login(String userEmail, String userPassword);

    User getUserByEmail(String userEmail);

    User getUserById(int userId);

    // 유저 정보 수정
    User updateUser(User user, MultipartFile file);

    // 유저 검색 메서드
    List<User> searchUsers(String query);
    // 유저네임으로 유저 조회 메서드
    User getUserByUsername(String userName);
}
