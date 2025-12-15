package com.instagram.comment.model.service;

import com.instagram.comment.model.dto.Comment;
import com.instagram.comment.model.dto.CommentResponse;
import com.instagram.comment.model.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;

    /*
    댓글 개수를 고려하지 않고, 단순히 댓글들만 필요한 경우
    @Override
    public List<Comment> getCommentsByPostId(int postId) {
        // 댓글 개수 전달
        return commentMapper.selectCommentsByPostId(postId);
    }
     */

    @Override
    public CommentResponse getCommentsByPostId(int postId) {
        // 댓글 개수 전달
        List<Comment> c = commentMapper.selectCommentsByPostId(postId);
        CommentResponse cr = new CommentResponse();
        cr.setComments(c);
        cr.setCommentCount(c.size());
        return cr;
    }

    @Override
    public boolean createComment(int postId, int userId, String commentContent) {
        try {
            Comment comment = new Comment();
            comment.setPostId(postId);
            comment.setUserId(userId);
            comment.setCommentContent(commentContent);
            return commentMapper.insertComment(comment) > 0;
        } catch (Exception e) {
            log.error("❌ 댓글 작성 실패: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public boolean deleteCommentById(int commentId) {
        return commentMapper.deleteComment(commentId) > 0;
    }

    @Override
    public boolean updateComment(int commentId, String commentContent) {
        return commentMapper.updateComment(commentId, commentContent) > 0;
    }
}
