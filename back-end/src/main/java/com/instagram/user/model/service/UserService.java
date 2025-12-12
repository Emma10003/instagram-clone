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

    // TODO 5: 유저 검색 메서드 선언
    // 메서드명: searchUsers
    // 파라미터: String query
    // 리턴타입: List<User>
    List<User> searchUsers(String query);


    // TODO 6: 유저네임으로 유저 조회 메서드 구현 확인
    // 기존에 getUserByUsername 메서드가 있는지 확인
    // 없다면 선언 필요
    User getUserByUsername(String userName);
}
