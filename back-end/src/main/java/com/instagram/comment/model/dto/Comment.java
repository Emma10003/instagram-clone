package com.instagram.comment.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private int commentId;
    private int postId;
    private int userId;
    private String commentContent;
    private String createdAt;
    private String updatedAt;

    // join을 활용한 사용자 정보
    private String userName;
    private String userFullname;
    private String userAvatar;
}
