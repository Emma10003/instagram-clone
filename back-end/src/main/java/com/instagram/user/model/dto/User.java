package com.instagram.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    /*
    userId 의 경우 SQL -> null, 호출하여 사용할 때는 형변환 처리하여 많이 사용함.
    추후 String userId 변경해서 활용해보기.
     */
    private String userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userFullname;
    private String userAvatar;
    private String createdAt;
    private String updatedAt;
}
