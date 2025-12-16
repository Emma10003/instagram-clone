import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';

const MentionText = ({ text, className = '' }) => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // 멘션 파싱 함수
    const parseMentions = (text) => {
        if (!text) return [];

        const mentionRegex = /@(\w+)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while((match = mentionRegex.exec(text)) !== null) {
            // @ 이전 일반 텍스트
            if(match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: text.substring(lastIndex, match.index),
                });
            }

            // 멘션 부분
            parts.push({
                type: 'mention',
                content: match[0],  // @username
                username: match[1],  // username
            });
            lastIndex = match.index + match[0].length;
        }
        // 멘션 이후 남은 텍스트들은 기본 텍스트 형태 유지
        if(lastIndex < text.length) {
            parts.push({
                type:'text',
                content: text.substring(lastIndex),
            });
        }

        return parts;
    };

    // 멘션 클릭 핸들러
    const handleMentionClick = async (username, e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const u = await apiService.getUserByUsername(username);
            if(u && u.userId) {
                if(u.userId === currentUser.userId) navigate('/myfeed');
                else navigate(`/myfeed?userId=${u.userId}`);
            }
        } catch (err) {
            console.error("❌ 유저 찾기 실패:", err);
        }
    };

    const parts = parseMentions(text);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.type === 'mention') {
                    return (
                        <>
                            <span
                                key={index}
                                className="mention-link"
                                onClick={
                                    (e) => handleMentionClick(part.username, e)
                                }
                                style={{
                                    color: '#0095f6',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                {part.content}
                            </span>
                        </>
                    );
                }
                return <span key={index}>{part.content}</span>;
            })}
        </span>
    );
};

export default MentionText;