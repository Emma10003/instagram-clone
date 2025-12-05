package com.instagram.user.model.service;

import com.instagram.user.model.dto.User;
import com.instagram.user.model.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(User user) {
        // 이미 존재하는 이메일인지 확인하기
        // 이미 존재하는 이메일이라면 throw new RuntimeException("이미 존재하는 이메일입니다.") 처리

        // 비밀번호 암호화하여 저장
        // DB에 저장할 유저의 비밀번호를 encode 처리하여 저장
        userMapper.insertUser(user);
    }

    @Override
    public User login(String userEmail, String userPassword) {
        return null;
    }

    @Override
    public User getUserByEmail(String userEmail) {
        return null;
    }

    @Override
    public User getUserByUsername(String userName) {
        return null;
    }
}
