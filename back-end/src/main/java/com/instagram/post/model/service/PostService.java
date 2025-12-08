package com.instagram.post.model.service;

import com.instagram.post.model.dto.Post;

import java.util.List;

public interface PostService {

    List<Post> getAllPosts(int currentUserId);

    Post getPostById(int postId, int currentUserId);

    boolean createPost(Post post);

    boolean deletePost(int postId);

    List<Post> getPostsByUserId(int userId, int currentUserId);

    boolean addLike(int postId, int userId);

    boolean removeLike(int postId, int userId);
}
