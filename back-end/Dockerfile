# ---- build stage ----
FROM gradle:8.8-jdk21 AS build
WORKDIR /app

# 캐시 최적화: 의존성 먼저
COPY build.gradle settings.gradle gradlew /app/
COPY gradle /app/gradle
RUN ./gradlew --no-daemon dependencies || true

# 소스 복사 후 빌드
COPY . /app
RUN ./gradlew --no-daemon clean bootJar

# ---- run stage ----
FROM eclipse-temurin:21-jre
WORKDIR /app

# Render는 PORT 환경변수를 제공합니다.
ENV PORT=9000

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 9000
CMD ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
