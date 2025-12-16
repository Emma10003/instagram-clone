package com.instagram.user.controller;

import com.instagram.user.model.dto.User;
import com.instagram.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class OtherUserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        try {
            User user = userService.getUserById(userId);
            log.info("✅ 특정 유저 조회 완료 - userId: {}", userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("❌ 특정 유저 조회 중 오류 발생 - userId: {}", userId);
            return ResponseEntity.badRequest().build();
        }
    }
}
