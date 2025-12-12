import React, { useState, useRef, useEffect } from 'react';
import apiService from '../service/apiService';

const MentionInput = ({ value, onChange, placeholder, rows = 4 }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);
    const suggestionsRef = useRef(null);

    // 유저 검색 함수
    const searchUsers = async (query) => {
        // 요구사항:
        // 1. query가 없거나 길이가 1 미만이면 suggestions를 빈 배열로 설정하고 종료
        if(!query || query.length < 1) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await apiService.searchUsers(query);
            setSuggestions(res || []);  // 검색 시 유저가 없다면 빈 배열 -> 빈 배열 처리 없을 시 Exception 뜸
        } catch (err){
            console.error("❌ 사용자 검색 실패: ", err);
            setSuggestions([]);
        }
    };

    // 텍스트 변경 처리 함수
    const handleTextChange = (e) => {
        const newValue = e.target.value;
        const newCursorPosition = e.target.selectionStart;

        // 부모 컴포넌트로 값 전달
        onChange(newValue);
        setCursorPosition(newCursorPosition);

        const textBeforeCursor = newValue.substring(0, newCursorPosition);
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');  // @으로 시작하는 인덱스 반환

        if(lastAtIndex !== -1) {
            const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
            if(!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
                setShowSuggestions(true);
                searchUsers(textAfterAt);
                setSelectedIndex(0);
            } else setShowSuggestions(false);

        } else setShowSuggestions(false);
    };

    // 유저 선택 함수
    const selectUser = (user) => {
        // 1. 커서 이전/이후 텍스트 추출
        const textBeforeCursor = value.substring(0, cursorPosition);
        const textAfterCursor = value.substring(cursorPosition);
        // 2. 마지막 '@' 위치 찾기
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');

        // 3. '@' 이전 텍스트 + '@유저네임 ' + 커서 이후 텍스트 합치기
        if(lastAtIndex !== -1) {
            const beforeAt = textBeforeCursor.substring(0, lastAtIndex);
            const newValue = `${beforeAt}@${user.userName} ${textAfterCursor}`;
            const newCursorPos = beforeAt.length + user.userName.length + 2;

            // 4. onChange로 새로운 값 전달
            onChange(newValue);
            setShowSuggestions(false);
            setSuggestions([]);
            // 6. setTimeout으로 textarea에 포커스하고 커서 위치 조정
            setTimeout(() => {
                if(textareaRef.current) {
                    textareaRef.current.focus();
                    textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
                }
            })
        }
    };

    // 키보드 이벤트 처리 함수
    const handleKeyDown = (e) => {
        // 요구사항:


        // 1. showSuggestions가 false이거나 suggestions가 비어있으면 종료
        if (!showSuggestions || suggestions.length === 0) return;

        // 2. ArrowDown: selectedIndex 증가 (마지막이면 0으로)
        // 3. ArrowUp: selectedIndex 감소 (0이면 마지막으로)
        // 4. Enter: 현재 선택된 유저로 selectUser 호출
        // 5. Escape: setShowSuggestions(false)
        // 6. 각 케이스에서 e.preventDefault() 호출

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                // setSuggestions((prev) => prev < suggestions.length - 1 ? prev + 1 : 0);
                setSelectedIndex((prev) => prev < suggestions.length - 1 ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => prev > 0 ? prev - 1 : suggestions.length -1);
                break;
            case 'Enter':
                if(showSuggestions && suggestions[selectedIndex]) {  // 해당 유저가 있는지 확인하는 조건 추가!
                    e.preventDefault();
                    selectUser(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                break;
            default:
                break;
        }
    };

    // TODO 7: 외부 클릭 감지 useEffect 구현
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return () => {document.removeEventListener('mousedown', handleClickOutside)};
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={rows}
                className="upload-caption-input"
            />

            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="mention-suggestions"
                >
                    {suggestions.map((user, index) => (
                        <div
                            key={user.userId}
                            className={`mention-item ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => selectUser(user)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <img
                                src={user.userAvatar || '/static/img/default-avatar.jpg'}
                                alt={user.userName}
                                className="mention-avatar"
                            />
                            <div className="mention-info">
                                <div className="mention-username">{user.userName}</div>
                                {user.userFullname && (
                                    <div className="mention-fullname">{user.userFullname}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MentionInput;