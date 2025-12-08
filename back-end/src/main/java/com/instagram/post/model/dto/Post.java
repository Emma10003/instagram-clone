package com.instagram.post.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    private int postId;
    private int userId;
    private String postImage;
    private String postCaption;
    private String postLocation;
    private String createdAt;
    private String updatedAt;
    private String userName;
    private String userFullname;
    private String userAvatar;
    private int likeCount;
    private int commentCount;

}
