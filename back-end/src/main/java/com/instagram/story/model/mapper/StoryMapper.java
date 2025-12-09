package com.instagram.story.model.mapper;

import com.instagram.story.model.dto.Story;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StoryMapper {
    void insertStory(Story story);

    List<Story> selectAllStories();

    Story selectStoriesByUserId(int id);

    // 만료된 스토리 void updateStory(Story story)
}
