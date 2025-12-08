package com.instagram.post.controller;

import com.instagram.common.util.JwtUtil;
import com.instagram.post.model.dto.Post;
import com.instagram.post.model.service.PostService;
import jakarta.mail.Multipart;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<String> createPost(@RequestPart MultipartFile postImage,
                                             @RequestPart String postCaption,
                                             @RequestPart String postLocation,
                                             @RequestHeader("Authorization") String authHeader) {
        // 현재 로그인한 사용자 id 가져오기
        /*
        백엔드 인증 기반
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int currentUserId = Integer.parseInt(authentication.getName());
        */
        String token = authHeader.substring(7);  // 맨 앞 "Bearer " 만 제거하고 추출
        int currentUserId = jwtUtil.getUserIdFromToken(token);  // token에서 userId 추출
        boolean success = postService.createPost(postImage, postCaption, postLocation, currentUserId);

        // log 사용하여 token과 currentUserId, post 데이터 확인

        if(success) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<?>> getAllPosts(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        int currentUserId = jwtUtil.getUserIdFromToken(token);
        List<Post> result = postService.getAllPosts(currentUserId);

        if(result.size() > 0) {
            log.info("✅ PostController: 모든 게시물 불러오기 성공");
            return ResponseEntity.ok(result);
        } else {
            log.error("❌ PostController: 모든 게시물 불러오기 실패");
            return ResponseEntity.badRequest().build();
        }
    }
}
