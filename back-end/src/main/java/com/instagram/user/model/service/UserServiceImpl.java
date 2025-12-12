package com.instagram.user.model.service;

import com.instagram.common.util.FileUploadService;
import com.instagram.user.model.dto.User;
import com.instagram.user.model.mapper.UserMapper;
import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final FileUploadService fileUploadService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void signUp(User user) {
        // 이미 존재하는 이메일인지 확인
        User existingEmail = userMapper.selectUserByUserEmail(user.getUserEmail());
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
        User user = userMapper.selectUserByUserEmail(userEmail);

        if(user == null) {
            log.warn("⚠️ 로그인 실패 - 존재하지 않는 이메일: {}", userEmail);
            return null;
        }

        if(bCryptPasswordEncoder.matches(userPassword, user.getUserPassword())) {
            log.warn("⚠️ 로그인 실패 - 잘못된 비밀번호: {}", userEmail);
        }

        user.setUserPassword(null);

        log.info("✅ 로그인 성공 - 이메일: {}", userEmail);

        return user;
    }

    @Override
    public User getUserByEmail(String userEmail) {
        return null;
    }
/*
    @Override
    public User getUserByUsername(String userName) {
        return null;
    }*/

    @Override
    public User getUserById(int userId) {
        return userMapper.selectUserById(userId);
    }

    @Override
    @Transactional
    public User updateUser(User user, MultipartFile file) {
        User existingUser = userMapper.selectUserById(user.getUserId());
        if(existingUser == null) {
            throw new RuntimeException("사용자 정보를 찾을 수 없습니다.");
        }

        if(file != null || !file.isEmpty()) {
            try {
                String newAvatarPath = fileUploadService.uploadProfileImage(file);
                existingUser.setUserAvatar(newAvatarPath);
                log.info("✅ 프로필 사진 저장 성공");
            } catch(Exception e) {
                log.error("❌ 프로필 사진 저장 중 오류 발생: {}", e.getMessage());
                throw new RuntimeException("이미지 업로드 실패");
            }
        }
        if(user.getUserName() != null)
            existingUser.setUserName(user.getUserName());
        if(user.getUserEmail() != null)
            existingUser.setUserEmail(user.getUserEmail());
        if(user.getUserPassword() != null)
            existingUser.setUserPassword(bCryptPasswordEncoder.encode(user.getUserPassword()));
        if(user.getUserFullname() != null)
            existingUser.setUserFullname(user.getUserFullname());

        userMapper.updateUser(existingUser);

        existingUser.setUserPassword(null);
        return existingUser;
    }

    @Override
    public List<User> searchUsers(String query) {
        if(query == null || query.isEmpty()) {
            return new ArrayList<>();  // 빈 배열 전달
        }
        try {
            return userMapper.searchUsersByUserName(query);
        } catch (Exception e) {
            log.error("❌ 사용자 리스트 검색 중 오류 발생: {}", e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public User getUserByUsername(String userName) {
        if(userName == null || userName.isEmpty()) {
            return null;
        }

        try {
            return userMapper.selectUserByUserNameExact(userName);
        } catch (Exception e) {
            log.error("❌ 사용자명으로 사용자 검색 중 오류 발생: {}", e.getMessage());
            return null;
        }
    }
}
