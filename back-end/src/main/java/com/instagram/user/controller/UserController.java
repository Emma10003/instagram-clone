package com.instagram.user.controller;

import com.instagram.common.util.JwtUtil;
import com.instagram.user.model.dto.LoginRequest;
import com.instagram.user.model.dto.LoginResponse;
import com.instagram.user.model.dto.User;
import com.instagram.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    /**
     * 회원가입 메서드
     * @param user
     */
    @PostMapping("/signup")
    public void signUp(@RequestBody User user) {
        userService.signUp(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        // 사용자 인증 - 이메일, 비밀번호
        User user = userService.login(request.getUserEmail(), request.getUserPassword());
        if(user == null) {
            return ResponseEntity.status(401).body(null);
        }

        // 로그인 성공 시 JWT 토큰 생성
        String token= jwtUtil.generateToken(user.getUserId(), user.getUserEmail());

        // 토큰 발급에 대한 응답 데이터 생성
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setUser(user);
        log.info("✅ 로그인 성공 - 이메일: {]", user.getUserEmail());
        // ok == 200
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/profile/edit")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String authHeader){
        try {
            String token = authHeader.substring(7);
            int userId = jwtUtil.getUserIdFromToken(token);

            User u = userService.getUserById(userId);
            if (u != null) {
                u.setUserPassword(null);
            }
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            log.error("❌ 프로필 조회 실패: {}", e.getMessage());
            return ResponseEntity.status(401).body(null);
        }
    }

    @PutMapping("/profile/edit")
    public ResponseEntity<User> editUserProfile(@RequestHeader("Authorization") String authHeader,
                                                  @RequestPart("formData") User user,
                                                  @RequestPart(value = "profileImage", required = false) MultipartFile userAvatar) {
        try {
            String token = authHeader.substring(7);
            int userId = jwtUtil.getUserIdFromToken(token);
            user.setUserId(userId);
            User u = userService.updateUser(user, userAvatar);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

}
