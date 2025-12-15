package com.instagram.comment.controller;

import com.instagram.comment.model.dto.Comment;
import com.instagram.comment.model.dto.CommentResponse;
import com.instagram.comment.model.service.CommentService;
import com.instagram.common.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final JwtUtil jwtUtil;

    /**
     * 특정 게시물 조회 (댓글 목록 + 개수)
     * GET /api/posts/{postId}/comments
     * getComments
     */
    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<CommentResponse> getComments(@PathVariable int postId) {
        try {
            // 댓글들 배열과 댓글 개수가 들어있음.
            CommentResponse comments = commentService.getCommentsByPostId(postId);
            log.info("✅ 댓글 불러오기 성공 - postId: {}", postId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            log.error("❌ 댓글 불러오기 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    /**
    * 댓글 작성
    * Post /api/posts/{postId}/comments
     * createComment
    */
    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Boolean> createComment(@PathVariable int postId,
                                           @RequestHeader("Authorization") String authHeader,
                                           @RequestBody Comment comment) {
        try {
            String token = authHeader.substring(7);
            int currentUserId = jwtUtil.getUserIdFromToken(token);
            comment.setUserId(currentUserId);
            boolean r = commentService.createComment(postId, currentUserId, comment.getCommentContent());

            log.info("✅ 댓글 등록 성공 - postId: {} , userId: {}", postId, currentUserId);
            return ResponseEntity.ok(r);

        } catch (Exception e) {
            log.error("❌ 댓글 등록 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().body(false);
        }
    }

    /**
     * 댓글 삭제
     * DELETE /api/comments/{commentId}
     * deleteComment
     */
    @DeleteMapping("/comments/{commentId")
    public ResponseEntity<Boolean> deleteComment(@PathVariable int commentId) {
        try {
            boolean r = commentService.deleteCommentById(commentId);
            log.info("✅ 댓글 삭제 성공 - commentId: {}", commentId);
            return ResponseEntity.ok(r);
        } catch (Exception e) {
            log.error("❌ 댓글 삭제 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().body(false);
        }
    }

    /**
     * 댓글 수정
     * PUT /api/comments/{commentId}
     * updateComment
     */
    @PutMapping("/comments/{commentId")
    public ResponseEntity<Boolean> updateComment(@PathVariable int commentId,
                                                 @RequestBody String commentContent) {
        try {
            boolean r = commentService.updateComment(commentId, commentContent);
            log.info("✅ 댓글 삭제 성공 - commentId: {}", commentId);
            return ResponseEntity.ok(r);
        } catch (Exception e) {
            log.error("❌ 댓글 수정 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().body(false);
        }

    }
}
