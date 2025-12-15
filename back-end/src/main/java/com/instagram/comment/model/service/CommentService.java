package com.instagram.comment.model.service;

import com.instagram.comment.model.dto.Comment;
import com.instagram.comment.model.dto.CommentResponse;

import java.util.List;

public interface CommentService {

    /*
    댓글 개수를 고려하지 않고, 단순히 댓글들만 필요한 경우
    List<Comment> getCommentsByPostId(int postId);
    */

    CommentResponse getCommentsByPostId(int postId);
    boolean createComment(int postId, int userId, String commentContent);
    boolean deleteCommentById(int commentId);
    boolean updateComment(int commentId, String commentContent);;
}
