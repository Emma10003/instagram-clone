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
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void signUp(User user) {
        // 이미 존재하는 이메일인지 확인
        String existingEmail = userMapper.selectUserByUserEmail(user.getUserEmail());
        if(existingEmail != null) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
        
        // 이미 존재하는 사용자명(=닉네임)인지 확인
        String existingName = userMapper.selectUserByUserName(user.getUserName());
        if(existingName != null) {
            throw new RuntimeException("이미 존재하는 사용자 이름입니다.");
        }

        // 비밀번호 암호화하여 저장
        // DB에 저장할 유저의 비밀번호를 encode 처리하여 저장
        // user 에서 비밀번호 자리에 저장하기 (암호화 처리한 프론트엔드에서 클라이언트가 작성한 기존 비밀번호를!)
        user.setUserPassword(bCryptPasswordEncoder.encode(user.getUserPassword()));

        // 기본 아바타 설정 - 유저가 아바타 설정을 안 했을 때 기본 아바타 이미지로 설정
        if(user.getUserAvatar() == null || user.getUserAvatar().isEmpty()) {
            user.setUserAvatar("default-avatar.png");
        }

        userMapper.insertUser(user);
        log.info("✅ 회원가입 완료 - 이메일: {}, 사용자명: {}", user.getUserEmail(), user.getUserName());
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
