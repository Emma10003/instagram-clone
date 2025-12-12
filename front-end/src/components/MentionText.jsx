import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';

const MentionText = ({ text, className = '' }) => {
    const navigate = useNavigate();

    // TODO 8: 멘션 파싱 함수 구현
    const parseMentions = (text) => {
        // 요구사항:
        // 1. text가 없으면 빈 배열 반환
        // 2. 정규표현식 /@(\w+)/g 를 사용하여 @유저네임 패턴 찾기
        // 3. parts 배열에 { type: 'text', content: '...' } 또는
        //    { type: 'mention', content: '@username', username: 'username' } 형태로 저장
        // 4. while 루프와 regex.exec() 사용
        // 5. 마지막 남은 텍스트도 parts에 추가

        if (!text) return [];

        const mentionRegex = /@(\w+)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        // 여기에 코드 작성
        // 힌트: while ((match = mentionRegex.exec(text)) !== null) { ... }

        return parts;
    };

    // TODO 9: 멘션 클릭 핸들러 구현
    const handleMentionClick = async (username, e) => {
        // 요구사항:
        // 1. e.preventDefault()와 e.stopPropagation() 호출
        // 2. apiService.getUserByUsername(username) 호출
        // 3. user가 존재하고 userId가 있으면 navigate로 이동
        //    `/myfeed?userId=${user.userId}` 또는 적절한 경로
        // 4. 에러 발생 시 콘솔에 로그 출력

        e.preventDefault();
        e.stopPropagation();

        // 여기에 코드 작성

    };

    const parts = parseMentions(text);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.type === 'mention') {
                    return (
                        <span
                            key={index}
                            className="mention-link"
                            onClick={(e) => handleMentionClick(part.username, e)}
                            style={{
                                color: '#0095f6',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            {part.content}
                        </span>
                    );
                }
                return <span key={index}>{part.content}</span>;
            })}
        </span>
    );
};

export default MentionText;