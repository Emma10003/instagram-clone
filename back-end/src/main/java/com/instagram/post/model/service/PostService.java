package com.instagram.post.model.service;

import com.instagram.post.model.dto.Post;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {

    // 모든 게시물 조회 (= 로그인했을 때 내가 팔로우하는 지인 기준)
    // 새로운 게시물들, 팔로우하지 않은 유저 게시물 조회에 사용 가능
    List<Post> getAllPosts(int currentUserId);

    // 나의 피드나 특정 유저의 피드로 접속했을 때, 유저가 올린 게시물들 조회
    List<Post> getPostsByUserId(int userId, int currentUserId);

    // 나의 피드나 특정 유저의 피드로 접속했을 때,
    // 특정 피드를 선택하여 피드 세부사항을 조회
    Post getPostById(int postId, int currentUserId);

    boolean createPost(MultipartFile postImage,
                       String postCaption,
                       String postLocation,
                       int currentUserId);

    boolean deletePost(int postId);
    
    boolean addLike(int postId, int userId);

    boolean removeLike(int postId, int userId);
}
