package com.instagram.comment.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponse {
    
    // 댓글 목록
    private List<Comment> comments;
    // 댓글 개수
    private int commentCount;
    
    // 댓글이 없을 경우를 대비하는 생성자
    public CommentResponse(List<Comment> comments) {
        this.comments = comments;
        // 댓글이 있는 게 참이라면 댓글개수, 없다면 0 표기
        this.commentCount = comments != null ? comments.size() : 0;
    }
}
