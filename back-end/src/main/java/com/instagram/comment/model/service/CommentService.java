package com.instagram.comment.model.service;

import com.instagram.comment.model.dto.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsByPostId(int postId);
    boolean createComment(int postId, int userId, String commentContent);
    boolean deleteCommentById(int commentId);
    boolean updateComment(int commentId, String commentContent);;
}
