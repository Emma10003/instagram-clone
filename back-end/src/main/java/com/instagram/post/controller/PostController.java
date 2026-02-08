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

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        // 인증되지 않은 유저가 게시물을 보려고 하면 userId 에 null 추가.
        // 현재 flutter에서 로그인기능 배우지 않았기 때문에 임의로 조치함.
        Integer currentUserId = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            try {
                String token = authHeader.substring(7);
                currentUserId = jwtUtil.getUserIdFromToken(token);
            } catch (Exception e) {
                log.warn("유저 아이디가 없지만 무시하고 진행");
            }
        }

        // null 일 경우 0으로 반환 -> 추후 삭제하거나 코드 원상복구할 예정
        // List<Post> posts = postService.getAllPosts(currentUserId);
        int userId = (currentUserId != null) ? currentUserId : 0;
        List<Post> posts = postService.getAllPosts(userId);
        return ResponseEntity.ok(posts);

        /*
        if(posts.size() > 0) {
            log.info("✅ PostController: 모든 게시물 불러오기 성공");
            return ResponseEntity.ok(posts);
        } else {
            log.error("❌ PostController: 모든 게시물 불러오기 실패");
            return ResponseEntity.badRequest().build();
        }
        */
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getAllPostsByUserId(@PathVariable int userId,
                                                          @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            int currentUserId = jwtUtil.getUserIdFromToken(token);
            List<Post> posts = postService.getPostsByUserId(userId);

            log.info("✅ PostController: 사용자 게시물 가져오기 성공 - 사용자 ID: {}", userId);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            log.error("❌ PostController: 사용자 게시물 가져오기 실패 - 사용자 ID: {}", userId);
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    // 내가 추가
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable int postId,
                                            @RequestHeader("Authorization") String authHeader) {
        try {
            log.info("✅ Controller 도달 성공");
            String token = authHeader.substring(7);
            int currentUserId = jwtUtil.getUserIdFromToken(token);
            Post post = postService.getPostById(postId, currentUserId);

            log.info("✅ PostController: 특정 게시물 가져오기 성공 - 게시물 ID: {}", postId);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            log.error("❌ PostController: 특정 게시물 가져오기 실패 - 게시물 ID: {}", postId);
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

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

    @PostMapping("/{postId}/like")
    public ResponseEntity<Boolean> addLike(@PathVariable int postId,
                                     @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7);
            int currentUserId = jwtUtil.getUserIdFromToken(token);
            boolean result = postService.addLike(postId, currentUserId);
            log.info("✅ 좋아요 추가 성공");
            return ResponseEntity.ok(result);
        } catch(Exception e) {
            log.error("❌ 좋아요 추가 실패: {}", e.getMessage());;
            e.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<Boolean> removeLike(@PathVariable int postId,
                                        @RequestHeader("Authorization") String authHeader) {
        log.info("✅ removeLike: Controller 레이어 도달 성공");
        try {
            String token = authHeader.substring(7);
            int currentUserId = jwtUtil.getUserIdFromToken(token);
            boolean result = postService.removeLike(postId, currentUserId);
            log.info("✅ 좋아요 취소 성공");
            return ResponseEntity.ok(result);
        } catch(Exception e) {
            log.error("❌ 좋아요 취소 실패: {}", e.getMessage());;
            e.printStackTrace();
            return ResponseEntity.badRequest().body(false);
        }
    }
}
