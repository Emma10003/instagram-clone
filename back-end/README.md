## 프로젝트 구조 설명 ([README.md](http://readme.md/))

### 개요

본 문서는 `src/main/java/com/instagram/` 디렉토리와 `src/main/resources/mapper/` 디렉토리의 **Instagram 클론 프로젝트** 백엔드 주요 모듈 및 파일 구조에 대한 설명을 담고 있습니다. 프로젝트는 Java와 Spring Boot 기반으로 구성되었으며, 주요 기능별로 모듈화하여 관리하고 있습니다.

### 주요 디렉토리 구조

```
src/main/java/com/instagram/
├── user/          # 사용자 (회원가입, 로그인, 프로필)
├── post/          # 게시물
├── comment/       # 댓글
├── like/          # 좋아요
├── story/         # 스토리
├── follow/        # 팔로우
└── common/        # 공통 설정 및 유틸리티

src/main/resources/mappers/
├── UserMapper.xml
├── PostMapper.xml
├── CommentMapper.xml
├── LikeMapper.xml
├── StoryMapper.xml
└── FollowMapper.xml

```

---

### 모듈별 상세 설명

### 1. `user/` (사용자)

사용자(User)의 **회원가입, 로그인, 프로필 관리**와 관련된 로직을 담당합니다.

| 파일/디렉토리 | 역할 |
  | --- | --- |
| `User.java` | 사용자 **Entity/Domain** 클래스 |
| `UserMapper.java` | 사용자 관련 **MyBatis Mapper** 인터페이스 |
| `UserService.java` | 사용자 관련 **Service** 인터페이스 |
| `UserServiceImpl.java` | `UserService`의 **구현체** (비즈니스 로직) |
| `UserController.java` | 사용자 관련 **Controller** (API 엔드포인트) |

### 2. `post/` (게시물)

**게시물(Post) 생성, 조회, 수정, 삭제**와 관련된 로직을 담당합니다.

| 파일/디렉토리 | 역할 |
  | --- | --- |
| `Post.java` | 게시물 **Entity/Domain** 클래스 |
| `PostMapper.java` | 게시물 관련 **MyBatis Mapper** 인터페이스 |
| `PostService.java` | 게시물 관련 **Service** 인터페이스 |
| `PostServiceImpl.java` | `PostService`의 **구현체** (비즈니스 로직) |
| `PostController.java` | 게시물 관련 **Controller** (API 엔드포인트) |

### 3. `comment/` (댓글)

게시물에 대한 **댓글(Comment) 관련** 로직을 담당합니다.

| 파일/디렉토리 | 역할 |
  | --- | --- |
| `Comment.java` | 댓글 **Entity/Domain** 클래스 |
| `CommentMapper.java` | 댓글 관련 **MyBatis Mapper** 인터페이스 |
| `CommentService.java` | 댓글 관련 **Service** 인터페이스 |
| `CommentServiceImpl.java` | `CommentService`의 **구현체** (비즈니스 로직) |
| `CommentController.java` | 댓글 관련 **Controller** (API 엔드포인트) |

### 4. `like/` (좋아요)

게시물이나 댓글에 대한 **좋아요(Like)** 관련 로직을 담당합니다.

| 파일/디렉토리 | 역할 |
  | --- | --- |
| `Like.java` | 좋아요 **Entity/Domain** 클래스 |
| `LikeMapper.java` | 좋아요 관련 **MyBatis Mapper** 인터페이스 |
| `LikeService.java` | 좋아요 관련 **Service** 인터페이스 |
| `LikeServiceImpl.java` | `LikeService`의 **구현체** (비즈니스 로직) |
| `LikeController.java` | 좋아요 관련 **Controller** (API 엔드포인트) |

### 5. `story/` (스토리)

**스토리(Story)** 기능 관련 로직을 담당합니다.

| 파일/디렉토리 | 역할 |
  | --- | --- |
| `Story.java` | 스토리 **Entity/Domain** 클래스 |
| `StoryMapper.java` | 스토리 관련 **MyBatis Mapper** 인터페이스 |
| `StoryService.java` | 스토리 관련 **Service** 인터페이스 |
| `StoryServiceImpl.java` | `StoryService`의 **구현체** (비즈니스 로직) |
| `StoryController.java` | 스토리 관련 **Controller** (API 엔드포인트) |

### 6. `follow/` (팔로우)

**사용자 간의 팔로우(Follow)** 관계 관리 로직을 담당합니다.

| 파일/디렉토리 | 역할 |
  | --- | --- |
| `Follow.java` | 팔로우 **Entity/Domain** 클래스 |
| `FollowMapper.java` | 팔로우 관련 **MyBatis Mapper** 인터페이스 |
| `FollowService.java` | 팔로우 관련 **Service** 인터페이스 |
| `FollowServiceImpl.java` | `FollowService`의 **구현체** (비즈니스 로직) |
| `FollowController.java` | 팔로우 관련 **Controller** (API 엔드포인트) |

### 7. `common/` (공통)

**전역 설정, 공통 유틸리티, API 응답 형식** 등 공통 요소를 담당합니다.

| 파일/디렉토리 | 역할 |
  | --- | --- |
| `config/WebConfig.java` | Spring MVC **웹 설정** (CORS 등) |
| `config/SecurityConfig.java` | Spring Security **보안 설정** (인증, 권한) |
| `dto/ApiResponse.java` | 모든 API 응답의 **표준 형식** DTO |

---

### MyBatis 매퍼 파일

`src/main/resources/mappers/` 디렉토리에는 각 모듈별 **SQL 매핑 정보**를 담고 있는 XML 파일들이 위치합니다.

| 파일 | 역할 |
  | --- | --- |
| `UserMapper.xml` | 사용자(User) 관련 **SQL 정의** |
| `PostMapper.xml` | 게시물(Post) 관련 **SQL 정의** |
| `CommentMapper.xml` | 댓글(Comment) 관련 **SQL 정의** |
| `LikeMapper.xml` | 좋아요(Like) 관련 **SQL 정의** |
| `StoryMapper.xml` | 스토리(Story) 관련 **SQL 정의** |
| `FollowMapper.xml` | 팔로우(Follow) 관련 **SQL 정의** |
