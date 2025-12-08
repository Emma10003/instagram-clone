package com.instagram.common.util;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;  // 스프링부트 properties 에서 사용한 데이터 가져오기
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/*
 폴더 구조화 방식
 /product_images/
    /1001/              # 상품 ID로 폴더 생성
        main.jpg        # 유저가 선택한 명칭 그대로 메인 이미지
        detail_1.jpg    # 상세이미지 1
        detail_2.jpg    # 상세이미지 2
    /1002/              # 상품 ID로 폴더 생성
        main.jpg        # 유저가 선택한 명칭 그대로 메인 이미지
        detail_1.jpg    # 상세이미지 1
        detail_2.jpg    # 상세이미지 2

 파일명 규칙 방식
  /product_images/
    P1001_main.jpg        # 유저가 선택한 명칭 그대로 메인 이미지
    P1001_detail_1.jpg    # 상세이미지 1
    P1001_detail_2.jpg    # 상세이미지 2

 UUID 사용 여부
     중소기업이나 내부 관리 시스템에서는 UUID를 안 쓰는 경우가 많다.
         상품ID + 순번
         상품코드 + 타입
         업로드타임스탬프
     대규모 서비스 (쿠팡, 11번가 등)
     보안 상 상품정보 노출 방지 등의 경우 활용
 */
@Service
@Slf4j
public class FileUploadService {

    @Value("${file.profile.upload.path}")
    private String profileUploadPath;

    @Value("${file.story.upload.path}")
    private String storyUploadPath;

    @Value("${file.post.upload.path}")
    private String postUploadPath;
    

    public String uploadProfileImage(MultipartFile file) throws IOException {
        if(file.isEmpty()){
            throw new IOException("업로드할 파일이 없습니다.");
        }

        File uploadDir = new File(profileUploadPath);
        if(!uploadDir.exists()){
            boolean created = uploadDir.mkdirs();
            if(!created){
                throw new IOException("업로드 디렉토리 생성에 실패했습니다." + profileUploadPath);
            }
            log.info("✅ 업로드 디렉토리 생성: {}", profileUploadPath);
        }

        String clientUploadToFileName = file.getOriginalFilename();
        if(clientUploadToFileName == null || clientUploadToFileName.isEmpty()){
            throw new IOException("파일 이름이 유효하지 않습니다.");
        }

        String extension = "";
        int lastDotIndex = clientUploadToFileName .lastIndexOf(".");
        if(lastDotIndex > 0){
            extension = clientUploadToFileName.substring(lastDotIndex);
        }

        String reFileName = UUID.randomUUID().toString() + extension;

        Path savePath = Paths.get(profileUploadPath, reFileName);

        try {
            Files.copy(file.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);
            log.info("프로필 이미지 업로드 성공: {} -> {}", clientUploadToFileName, reFileName);
        } catch (IOException e) {
            log.error("파일 저장 중 오류 발생: {}", e.getMessage());
            throw new IOException("파일 저장에 실패했습니다 : " + e.getMessage());
        }

        return "/profile_images/" + reFileName;
    }


    public String uploadStoryImage(MultipartFile file, int storyId, String imageType) throws IOException {
        if(file.isEmpty() || file == null){
            throw new IOException("업로드할 파일이 없습니다.");
        }

        String storyFolder = storyUploadPath + "/" + storyId;

        File uploadDir = new File(storyFolder);
        if(!uploadDir.exists()){
            boolean created = uploadDir.mkdirs();
            if(!created){
                throw new IOException("스토리 이미지 업로드 디렉토리 생성에 실패했습니다." + storyFolder);
            }
            log.info("✅ 스토리 이미지 업로드 디렉토리 생성: {}", storyFolder);
        }

        String clientUploadToFileName = file.getOriginalFilename();
        if(clientUploadToFileName == null || clientUploadToFileName.isEmpty()){
            throw new IOException("파일 이름이 유효하지 않습니다.");
        }

        String fileName = imageType + "-" + clientUploadToFileName;
        Path savePath = Paths.get(storyFolder, fileName);

        try {
            Files.copy(file.getInputStream(), savePath, StandardCopyOption.REPLACE_EXISTING);
            log.info("✅ 스토리 이미지 업로드 성공: {} -> {}", clientUploadToFileName, fileName);
        } catch (Exception e) {
            log.error("❌ 스토리 이미지 저장 중 오류 발생: {}", e.getMessage());
        }

        return "/story_images/" + storyId + "/" + fileName;
    }


    public String uploadPostImage(MultipartFile file) throws IOException {
        if(file == null || file.isEmpty()) throw new IOException("업로드할 파일이 없습니다.");


        // 위에서 만든 폴더 이름으로 File 객체 생성
        File uploadDir = new File(postUploadPath);
        if(!uploadDir.exists()){
            // 해당 폴더가 존재하지 않으면 새로 생성
            boolean created = uploadDir.mkdirs();
            if(!created){  // 생성 실패 시 예외 던지기
                throw new IOException("게시물 이미지 디렉토리 생성에 실패했습니다 : " + postUploadPath);
            }
            log.info("✅ 게시물 이미지 디렉토리 생성: {}", postUploadPath);
        }

        String clientUploadFileName = file.getOriginalFilename();  // 사용자가 선택한 이미지의 원본 파일명 (확장자 포함)
        if(clientUploadFileName == null || clientUploadFileName.isEmpty()){
            throw new IOException("파일 이름이 유효하지 않습니다.");
        }
        
        String extension = "";
        int lastDotIndex = clientUploadFileName.lastIndexOf(".");
        if(lastDotIndex > 0){
            extension = clientUploadFileName.substring(lastDotIndex);
        }

        String fileName = UUID.randomUUID().toString() + extension;
        Path saveToPath = Paths.get(postUploadPath, fileName);

        // 파일 실제로 저장
        try {
            Files.copy(file.getInputStream(), saveToPath, StandardCopyOption.REPLACE_EXISTING);
            log.info("✅ 게시물 이미지 업로드 성공: {} -> {}", clientUploadFileName, fileName);
        } catch(Exception e) {
            log.error("❌ 게시물 이미지 저장 중 오류 발생: {}", e.getMessage());
            throw new IOException("게시물 이미지 저장에 실패했습니다 : " + e.getMessage());
        }

        // DB에 저장할 이미지 경로 반환
        return "/post_images/" + fileName;
    }


    public boolean deleteFile(String dbPathImg) {  // dbPathImg = dbPathImg
        if(dbPathImg == null || dbPathImg.isEmpty()){
            log.warn("⚠️ 삭제할 파일 경로가 존재하지 않습니다.");
            return false;
        }

        try {
            String absolutePath;

            if(dbPathImg.startsWith("/profile_images/")){
                String profileImgPath = dbPathImg.replace("/profile_images/", "");
                absolutePath = profileUploadPath + "/" + profileImgPath;
            }
            else if (dbPathImg.startsWith("/story_images/")) {
                String storyImgPath = dbPathImg.replace("/story_images/", "");
                absolutePath = storyUploadPath + "/" + storyImgPath;
            }
            else if (dbPathImg.startsWith("/post_images/")) {
                String postImgPath = dbPathImg.replace("/post_images/", "");
                absolutePath = postUploadPath + "/" + postImgPath;
            }
            else {
                log.warn("⚠️ 지원하지 않는 파일 경로 형식입니다. {}", dbPathImg);
                return false;
            }

            File file = new File(absolutePath);

            if(!file.exists()){
                log.warn("⚠️ 삭제하려는 파일이 존재하지 않습니다.: {}", absolutePath);
                return false;
            }

            boolean fileRemove = file.delete();
            if(fileRemove) {
                log.info("✅ 파일 삭제 성공: {}", absolutePath);

            } else {
                log.error("❌ 파일 삭제 실패: {}", absolutePath);
            }
            return fileRemove;

        } catch (Exception e) {
            log.error("❌ 파일 삭제 중 오류 발생: {}", e.getMessage());
            return false;
        }
    }
}

