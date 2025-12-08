package com.instagram.post.controller;

import com.instagram.post.model.dto.Post;
import com.instagram.post.model.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<String> createPost(@RequestBody Post post) {
        // 현재 로그인한 사용자 id 가져오기

        boolean success = postService.createPost(post);

        if(success) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
