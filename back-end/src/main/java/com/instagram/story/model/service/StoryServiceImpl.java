package com.instagram.story.model.service;

import com.instagram.story.model.dto.Story;
import com.instagram.story.model.mapper.StoryMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {
    private final StoryMapper storyMapper;

    @Override
    public Story createStory(int userId, MultipartFile storyImage) throws IOException {
        log.info("💡 스토리 생성 시작 - 사용자 ID: {}", userId);

        Story story = new Story();
        story.setUserId(userId);
        story.setStoryImage("storyImage - 서버 컴퓨터에 저장될 경로 스토리 파일");

        storyMapper.insertStory(story);
        return null;
    }

    @Override
    public List<Story> getAllStories() {
        log.info("💡 모든 활성 스토리 조회");
        List<Story> stories = storyMapper.selectAllStories();
        log.info("💡 조회된 스토리 개수: {}", stories.size());
        return stories;
    }

    @Override
    public Story getStoriesByUserId(int userId) {
        log.info("💡 특정 사용자 스토리 조회 - 사용자 ID: {}", userId);
        Story story = storyMapper.selectStoriesByUserId(userId);
        return story;
    }

    @Override
    public void deleteExpiredStories() {

    }
}
