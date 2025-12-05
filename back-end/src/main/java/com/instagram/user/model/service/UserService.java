package com.instagram.user.model.service;

import com.instagram.user.model.dto.User;

public interface UserService {
    void signUp(User user);
    User login(String userEmail, String userPassword);
    User getUserByEmail(String userEmail);
    User getUserByUsername(String userName);
}
