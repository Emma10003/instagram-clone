// src/service/commonService.js

export const API_BASE_URL = 'http://localhost:9000';

/**
 * 이미지 경로를 받아서 완전한 URL을 반환하는 함수
 * @param {string} path - DB에 저장된 이미지 경로
 * @returns {string} - 보여줄 수 있는 전체 이미지 URL
 */

export const getImageUrl = (path) => {
    if(!path) return '/static/img/default-avatar.jpg';
    if(path.startsWith('http')) return path;
    if(path === 'default-avatar.jpg') return '/static/img/default-avatar.jpg';
    if(path === 'default-avatar.png') return '/static/img/default-avatar.jpg';

    return `${API_BASE_URL}${path}`;
}

// 날짜 포맷팅 ->