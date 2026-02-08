# Instagram Clone (React + Spring Boot)

인스타그램의 핵심 기능(회원가입/로그인, 피드, 게시물 업로드, 좋아요, 댓글, 스토리, 유저 검색, 프로필 수정 등)을 구현한 클론 프로젝트입니다.  
프론트엔드는 **React(CRA)**, 백엔드는 **Spring Boot + MyBatis + PostgreSQL** 기반의 REST API로 구성되어 있습니다.

---

## ✨ 주요 기능

- **인증(Auth)**
  - 회원가입 / 로그인(JWT 발급)
  - 카카오 로그인(OAuth 콜백 페이지 포함)
- **피드/게시물(Posts)**
  - 피드 목록 조회, 게시물 상세 조회
  - 게시물 업로드(이미지 포함)
  - 좋아요/좋아요 취소
- **댓글(Comments)**
  - 게시물별 댓글 조회/작성
  - 댓글 수정/삭제
- **스토리(Stories)**
  - 스토리 목록 조회, 유저별 스토리 조회
  - 스토리 업로드/삭제
- **유저(Users)**
  - 특정 유저 조회 / 유저네임 기반 조회
  - 유저 검색(키워드)
  - 내 프로필 조회/수정(프로필 이미지 업로드 포함)

---

## 🧱 기술 스택

### Front-end
- React 18 (Create React App)
- React Router DOM
- Axios
- Tailwind CSS

### Back-end
- Java 21
- Spring Boot 3.4.x
- Spring Web / Validation
- Spring Security + JWT (jjwt)
- MyBatis
- PostgreSQL (JDBC)

---

## 📁 프로젝트 구조

instagram-clone-master/
├─ front-end/ # React 클라이언트
└─ back-end/ # Spring Boot API 서버


---

## 🚀 실행 방법

### 1) Back-end 실행 (Spring Boot)

#### Requirements
- Java 21
- PostgreSQL

#### 설정 파일
백엔드는 아래 파일을 통해 DB/JWT/메일/업로드 경로 등을 읽습니다.

- `back-end/src/main/resources/config.properties`

> ⚠️ 주의: DB 비밀번호/메일 비밀번호 등 민감정보는 공개 저장소에 커밋하지 않는 것을 권장합니다.  
> `.gitignore` 처리 또는 환경변수 방식으로 분리해서 관리하세요.

**`config.properties` 예시(템플릿)**
```properties
# DB
spring.datasource.url=jdbc:postgresql://<HOST>:5432/<DB_NAME>
spring.datasource.username=<DB_USER>
spring.datasource.password=<DB_PASSWORD>
spring.datasource.driver-class-name=org.postgresql.Driver

# JWT
jwt.secret=<32자_이상_시크릿>
jwt.expiration=86400000

# Mail (선택)
spring.mail.username=<MAIL_USERNAME>
spring.mail.password=<MAIL_APP_PASSWORD>

# File Upload (로컬 저장 경로)
file.profile.upload.path=${user.home}/Desktop/instagram/profile_images
file.story.upload.path=${user.home}/Desktop/instagram/story_images
file.post.upload.path=${user.home}/Desktop/instagram/post_images

# Kakao (선택)
kakao_client_id=<KAKAO_CLIENT_ID>
kakao_redirect_uri=http://localhost:3000/auth/kakao/callback
서버 포트
back-end/src/main/resources/application.properties에 아래 설정이 포함되어 있습니다.

server.port=9000

실행
cd back-end
./gradlew bootRun
2) Front-end 실행 (React)
Requirements
Node.js (LTS 권장)

환경변수(.env)
React는 환경변수 키에 반드시 REACT_APP_ prefix가 필요합니다.

front-end/.env

예시:

REACT_APP_KAKAO_CLIENT_ID=<KAKAO_CLIENT_ID>
REACT_APP_KAKAO_REDIRECT_URL=http://localhost:3000/auth/kakao/callback
Proxy
로컬 개발 시 /api 요청이 백엔드로 전달되도록 front-end/package.json에 프록시 설정이 포함되어 있습니다.

proxy: "http://localhost:9000"

실행
cd front-end
npm install
npm start
Front: http://localhost:3000

Back: http://localhost:9000

🔐 JWT 인증 흐름(요약)
로그인 성공 시 /api/auth/login 응답으로 JWT(Access Token) 이 발급됩니다.

보호 API 호출 시 헤더에 아래 형식으로 토큰을 포함합니다.

Authorization: Bearer <JWT>
🧩 API 개요 (대표 엔드포인트)
컨트롤러 구성에 따라 일부 경로는 다를 수 있습니다. 레포 내 Controller 기준으로 주요 엔드포인트를 요약했습니다.

Auth (/api/auth)
POST /api/auth/signup 회원가입

POST /api/auth/login 로그인(JWT 발급)

POST /api/auth/kakao 카카오 로그인 처리(구현 방식에 따라 사용)

GET /api/auth/profile/edit 내 프로필 조회(Authorization 필요)

PUT /api/auth/profile/edit 내 프로필 수정(Authorization 필요)

Posts (/api/posts)
GET /api/posts 피드 조회

GET /api/posts/user/{userId} 유저별 게시물

GET /api/posts/{postId} 게시물 상세

POST /api/posts 게시물 업로드

POST /api/posts/{postId}/like 좋아요

DELETE /api/posts/{postId}/like 좋아요 취소

Comments
GET /api/posts/{postId}/comments 댓글 조회

POST /api/posts/{postId}/comments 댓글 작성

PUT /api/comments/{commentId} 댓글 수정

DELETE /api/comments/{commentId} 댓글 삭제

Stories (/api/stories)
GET /api/stories 스토리 목록

GET /api/stories/user/{userId} 유저별 스토리

POST /api/stories 스토리 업로드

DELETE /api/stories/{storyId} 스토리 삭제

Users (/api/users)
GET /api/users/{userId} 특정 유저 조회

GET /api/users/search 유저 검색

GET /api/users/username/{userName} 유저네임으로 조회

📌 참고
백엔드 상세 설명: back-end/README.md

📝 Note
본 프로젝트는 학습 및 포트폴리오 목적의 클론 프로젝트입니다.
