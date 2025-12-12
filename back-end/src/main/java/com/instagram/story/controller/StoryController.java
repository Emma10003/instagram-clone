package com.instagram.story.controller;

import com.instagram.common.util.FileUploadService;
import com.instagram.common.util.JwtUtil;
import com.instagram.story.model.dto.Story;
import com.instagram.story.model.service.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
@Slf4j
public class StoryController {

    private final StoryService storyService;
    private final JwtUtil jwtUtil;
    private final FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<?> createStory(@RequestHeader("Authorization") String token,
                                         @RequestPart("storyImage") MultipartFile storyImage) {
        try{
            log.info("✅ Controller 레이어 도달 완료");
            String jwtToken = token.substring(7);
            int userId = jwtUtil.getUserIdFromToken(jwtToken);

            Story story = storyService.createStory(userId, storyImage);

            Map<String, Object> map = new HashMap<>();
            map.put("story", story);
            map.put("msg", "스토리가 성공적으로 생성되었습니다.");
            return ResponseEntity.ok(map);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("파일 업로드 실패: " + e.getMessage());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("스토리 생성 실패: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllStories() {
        try{
            List<Story> stories = storyService.getAllStories();
            return ResponseEntity.ok(stories);
        } catch(Exception e){
            return ResponseEntity.badRequest().body("스토리 조회 실패: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getStoryById(@PathVariable("userId") int userId) {
        try {
            List<Story> a = storyService.getStoriesByUserId(userId);
            return ResponseEntity.ok(a);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("스토리 조회 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/{storyId}")
    public ResponseEntity<?> deleteStory(@PathVariable("storyId") int storyId) {
        try{
            log.info("💡 StoryController: deleteStory 메서드 시작");
            storyService.deleteStory(storyId);
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("스토리 삭제 실패: " + e.getMessage());
        }
    }
}
