import React, { useState, useRef, useEffect } from 'react';
import apiService from '../service/apiService';

const MentionInput = ({ value, onChange, placeholder, rows = 4 }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);
    const suggestionsRef = useRef(null);

    // TODO 3: 유저 검색 함수 구현
    const searchUsers = async (query) => {
        // 요구사항:
        // 1. query가 없거나 길이가 1 미만이면 suggestions를 빈 배열로 설정하고 종료
        // 2. apiService.searchUsers(query) 호출
        // 3. 결과를 suggestions state에 저장
        // 4. 에러 발생 시 콘솔에 로그 출력 후 suggestions를 빈 배열로 설정

        // 여기에 코드 작성

    };

    // TODO 4: 텍스트 변경 처리 함수 구현
    const handleTextChange = (e) => {
        const newValue = e.target.value;
        const newCursorPosition = e.target.selectionStart;

        // 부모 컴포넌트로 값 전달
        onChange(newValue);
        setCursorPosition(newCursorPosition);

        // TODO 4-1: @ 이후 텍스트 추출 로직 구현
        // 요구사항:
        // 1. 커서 이전의 텍스트 추출 (substring 사용)
        // 2. 마지막 '@' 위치 찾기 (lastIndexOf 사용)
        // 3. '@' 이후의 텍스트가 공백이나 줄바꿈을 포함하지 않으면:
        //    - setShowSuggestions(true)
        //    - searchUsers 호출
        //    - setSelectedIndex(0)
        // 4. 그렇지 않으면 setShowSuggestions(false)

        // 여기에 코드 작성

    };

    // TODO 5: 유저 선택 함수 구현
    const selectUser = (user) => {
        // 요구사항:
        // 1. 커서 이전/이후 텍스트 추출
        // 2. 마지막 '@' 위치 찾기
        // 3. '@' 이전 텍스트 + '@유저네임 ' + 커서 이후 텍스트 합치기
        // 4. onChange로 새로운 값 전달
        // 5. setShowSuggestions(false), setSuggestions([])
        // 6. setTimeout으로 textarea에 포커스하고 커서 위치 조정

        // 여기에 코드 작성

    };

    // TODO 6: 키보드 이벤트 처리 함수 구현
    const handleKeyDown = (e) => {
        // 요구사항:
        // 1. showSuggestions가 false이거나 suggestions가 비어있으면 종료
        // 2. ArrowDown: selectedIndex 증가 (마지막이면 0으로)
        // 3. ArrowUp: selectedIndex 감소 (0이면 마지막으로)
        // 4. Enter: 현재 선택된 유저로 selectUser 호출
        // 5. Escape: setShowSuggestions(false)
        // 6. 각 케이스에서 e.preventDefault() 호출

        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                // 여기에 코드 작성
                break;
            case 'ArrowUp':
                // 여기에 코드 작성
                break;
            case 'Enter':
                // 여기에 코드 작성
                break;
            case 'Escape':
                // 여기에 코드 작성
                break;
            default:
                break;
        }
    };

    // TODO 7: 외부 클릭 감지 useEffect 구현
    useEffect(() => {
        // 요구사항:
        // 1. handleClickOutside 함수 생성
        // 2. suggestionsRef.current 외부 클릭 시 setShowSuggestions(false)
        // 3. document에 mousedown 이벤트 리스너 등록
        // 4. cleanup 함수에서 이벤트 리스너 제거

        // 여기에 코드 작성

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