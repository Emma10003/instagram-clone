package com.instagram.post.model.mapper;

import com.instagram.post.model.dto.Post;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {
    // 전체 게시물 조회
    List<Post> selectAllPosts(int currentUserId);

    // 특정 게시물 조회
    Post selectPostById(int postId, int currentUserId);

    // 특정 게시물 사용자 조회
    List<Post> selectPostsByUserId(int userId, int currentUserId);

    // 게시물 작성
    int insertPost(Post post);

    // 게시물 삭제
    int deletePost(int postId);

    // 좋아요 추가
    int insertLike(int postId, int userId);
    
    // 좋아요 취소
    int deleteLike(int postId, int userId);
}
