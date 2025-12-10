package com.instagram.post.model.service;

import com.instagram.common.util.FileUploadService;
import com.instagram.post.model.dto.Post;
import com.instagram.post.model.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostMapper postMapper;
    private final FileUploadService fileUploadService;

    @Override
    public List<Post> getAllPosts(int currentUserId) {
        log.info("✅ PostServiceImpl: 서비스 레이어 도달 성공");
        return postMapper.selectAllPosts(currentUserId);
    }

    @Override
    public Post getPostById(int postId, int currentUserId) {
        return postMapper.selectPostById(postId, currentUserId);
    }

    @Override
    public List<Post> getPostsByUserId(int userId, int currentUserId) {
        return postMapper.selectPostsByUserId(userId, currentUserId);
    }

    @Override
    public boolean createPost(MultipartFile postImage,
                              String postCaption,
                              String postLocation,
                              int currentUserId) {
        // 게시물이 1개라도 등록되면 true, 0 이하는 false
        // 파일 업로드 서비스 이용해서 게시물 이미지 데이터 저장
        try {
            String imageUrl = fileUploadService.uploadPostImage(postImage);

            Post post = new Post();
            post.setUserId(currentUserId);
            post.setPostCaption(postCaption);
            post.setPostLocation(postLocation);
            post.setPostImage(imageUrl);
            return postMapper.insertPost(post) > 0;
        } catch (Exception e) {
            log.error("❌ 게시물 작성 실패: ", e);
            return false;
        }
    }

    @Override
    public boolean deletePost(int postId) {
        return postMapper.deletePost(postId) > 0;
    }


    @Override
    public boolean addLike(int postId, int userId) {
        return postMapper.insertLike(postId, userId) > 0;
    }

    @Override
    public boolean removeLike(int postId, int userId) {
        return postMapper.deleteLike(postId, userId) > 0;
    }
}
