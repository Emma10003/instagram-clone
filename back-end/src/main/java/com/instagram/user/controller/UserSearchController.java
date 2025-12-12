package com.instagram.user.controller;

import com.instagram.user.model.dto.User;
import com.instagram.user.model.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserSearchController {

    private final UserService userService;

    // TODO 9: 유저 검색 API
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("q") String query) {
        // 여기에 코드 작성
        try {
            List<User> u = userService.searchUsers(query);
            return ResponseEntity.ok(u); // 200 + header + body
        } catch (Exception e) {
            log.error("❌ UserSearchController: 사용자 리스트 검색 실패: {}", e.getMessage());
            return ResponseEntity.status(500).body(new ArrayList<>());
        }
    }

    // TODO 10: 유저네임으로 조회 API
    @GetMapping("/username/{userName}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String userName) {
        // 여기에 코드 작성
        try {
            User u = userService.getUserByUsername(userName);
            if(u == null) {
                return ResponseEntity.notFound().build();  // status 404
            }
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            log.error("❌ UserSearchController: 사용자명으로 사용자 검색 실패: {}", e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
}