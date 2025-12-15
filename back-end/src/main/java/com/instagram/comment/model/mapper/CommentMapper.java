package com.instagram.comment.model.mapper;

import com.instagram.comment.model.dto.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    // 특정 게시물 댓글 목록 조회
    List<Comment> selectCommentsByPostId(int postId);

    // 댓글 작성
    int insertComment(Comment comment);

    // 댓글 삭제
    int deleteComment(int commentId);

    // 댓글 수정
    int updateComment(int commentId, String commentContent);
}
