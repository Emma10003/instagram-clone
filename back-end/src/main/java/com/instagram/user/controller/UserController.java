package com.instagram.user.controller;

import com.instagram.user.model.dto.User;
import com.instagram.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    /**
     * 회원가입 메서드
     * @param user
     */
    @PostMapping("/signup")
    public void signUp(@RequestBody User user) {
        userService.signUp(user);
    }

    @PostMapping("/login")
    public void login(@RequestBody User user) {
        // 사용자 인증 - 이메일, 비밀번호
        if(user == null) {
            // 401을 전달

        }

        // 로그인 성공 시 JWT 토큰 생성

        // 토큰 발급에 대한 응답 데이터 생성

    }

}
