package com.instagram.story.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Story {

    private int storyId;
    private int userId;
    private String storyImage;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    
    // 조회 시 추가 정보
    private String userName;
    private String userAvatar;
}
