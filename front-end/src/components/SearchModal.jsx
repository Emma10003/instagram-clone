import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../service/apiService';
import { getImageUrl } from '../service/commonService';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef(null);

    // TODO 2: 최근 검색 기록 불러오기 구현
    // 요구사항:
    // 1. isOpen이 true일 때만 실행
    // 2. localStorage에서 'recentSearches' 키로 저장된 데이터 불러오기
    // 3. JSON.parse()를 사용하여 파싱 후 recentSearches 상태에 저장
    // 4. setTimeout으로 100ms 후 inputRef.current에 포커스
    useEffect(() => {
        // 여기에 코드 작성
        if (isOpen) {
            const saved = localStorage.getItem('recentSearches');
            if (saved) {
                setRecentSearches(JSON.parse(saved));
            }
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }

    }, [isOpen]);

    // TODO 3: 검색 실행 로직 구현
    // 요구사항:
    // 1. searchQuery가 비어있으면 searchResults를 빈 배열로 설정
    // 2. apiService.searchUsers(searchQuery) 호출
    // 3. isLoading 상태 관리 (시작: true, 종료: false)
    // 4. try-catch로 에러 처리
    // 5. 디바운스 적용 (300ms)
    useEffect(() => {
        const searchUsers = async () => {
            // 여기에 코드 작성
            if(searchQuery == null || searchQuery.isEmpty()) {
                setSearchQuery([]);
            }
            try {
                setIsLoading(true);
                const users = apiService.searchQuery();
            } catch (err) {

            } finally {
                setIsLoading(false);
            }
        };

        // 디바운스 타이머 설정
        const debounceTimer = setTimeout(searchUsers, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    // TODO 4: 유저 클릭 핸들러 구현
    // 요구사항:
    // 1. 클릭한 user를 recentSearches 배열 맨 앞에 추가
    // 2. 중복 제거 (같은 userId가 이미 있으면 제거)
    // 3. 최대 10개까지만 유지 (slice(0, 10))
    // 4. localStorage에 'recentSearches' 키로 저장
    // 5. navigate로 `/myfeed?userId=${user.userId}` 이동
    // 6. onClose() 호출하여 모달 닫기
    const handleUserClick = (user) => {
        // 여기에 코드 작성

    };

    // TODO 5: 최근 검색 삭제 핸들러 구현
    // 요구사항:
    // 1. e.stopPropagation() 호출 (부모 클릭 이벤트 방지)
    // 2. recentSearches에서 해당 userId를 가진 항목 제거
    // 3. 업데이트된 배열을 localStorage에 저장
    // 4. recentSearches 상태 업데이트
    const removeRecentSearch = (userId, e) => {
        // 여기에 코드 작성

    };

    // 모달 외부 클릭 시 닫기
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay" onClick={handleOverlayClick}>
            <div className="search-modal-content">
                <div className="search-modal-header">
                    <h2 className="search-modal-title">검색</h2>
                    <X
                        size={24}
                        className="search-modal-close"
                        onClick={onClose}
                    />
                </div>

                <div className="search-input-wrapper">
                    <Search size={20} className="search-input-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="검색"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-modal-input"
                    />
                    {searchQuery && (
                        <X
                            size={16}
                            className="search-clear-icon"
                            onClick={() => setSearchQuery('')}
                        />
                    )}
                </div>

                <div className="search-results-container">
                    {/* TODO 6: 조건부 렌더링 구현 */}
                    {/*
                    요구사항:
                    1. searchQuery가 비어있으면:
                       - recentSearches가 있으면 "최근 검색 항목" 헤더와 목록 표시
                       - 없으면 "최근 검색 내역이 없습니다." 메시지 표시
                    2. searchQuery가 있으면:
                       - isLoading이 true면 "검색 중..." 표시
                       - searchResults가 있으면 검색 결과 목록 표시
                       - 없으면 "검색 결과가 없습니다." 메시지 표시
                    */}

                    {searchQuery.trim() === '' ? (
                        // 최근 검색 표시
                        <>
                            {recentSearches.length > 0 && (
                                <>
                                    <div className="search-section-header">
                                        <span className="search-section-title">최근 검색 항목</span>
                                    </div>
                                    {/* TODO 7: recentSearches 배열을 map으로 순회하여 각 유저 표시 */}
                                    {/* 힌트: search-result-item 클래스 사용, onClick에 handleUserClick 연결 */}

                                </>
                            )}
                            {recentSearches.length === 0 && (
                                <div className="search-empty">
                                    <p>최근 검색 내역이 없습니다.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        // 검색 결과 표시
                        <>
                            {isLoading ? (
                                <div className="search-loading">검색 중...</div>
                            ) : searchResults.length > 0 ? (
                                /* TODO 8: searchResults 배열을 map으로 순회하여 검색 결과 표시 */
                                /* 힌트: 위의 최근 검색과 동일한 구조이지만 X 버튼은 필요 없음 */
                                null
                            ) : (
                                <div className="search-empty">
                                    <p>검색 결과가 없습니다.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;


/*
=================================================================
TODO 체크리스트 및 힌트
=================================================================

TODO 1: 상태 변수 선언
- useState로 4개의 상태 변수 선언

TODO 2: 최근 검색 기록 불러오기
힌트 코드:
if (isOpen) {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
        setRecentSearches(JSON.parse(saved));
    }
    setTimeout(() => {
        inputRef.current?.focus();
    }, 100);
}

TODO 3: 검색 실행 로직
힌트 코드:
if (searchQuery.trim().length === 0) {
    setSearchResults([]);
    return;
}
setIsLoading(true);
try {
    const results = await apiService.searchUsers(searchQuery);
    setSearchResults(results || []);
} catch (err) {
    console.error('검색 실패:', err);
    setSearchResults([]);
} finally {
    setIsLoading(false);
}

TODO 4: 유저 클릭 핸들러
힌트 코드:
const newRecent = [
    user,
    ...recentSearches.filter(u => u.userId !== user.userId)
].slice(0, 10);
setRecentSearches(newRecent);
localStorage.setItem('recentSearches', JSON.stringify(newRecent));
navigate(`/myfeed?userId=${user.userId}`);
onClose();

TODO 5: 최근 검색 삭제 핸들러
힌트 코드:
e.stopPropagation();
const filtered = recentSearches.filter(u => u.userId !== userId);
setRecentSearches(filtered);
localStorage.setItem('recentSearches', JSON.stringify(filtered));

TODO 6: 조건부 렌더링 ( 완료)
- 삼항 연산자로 분기 처리

TODO 7: 최근 검색 목록 렌더링
힌트 코드:
{recentSearches.map((user) => (
    <div
        key={user.userId}
        className="search-result-item"
        onClick={() => handleUserClick(user)}
    >
        <img
            src={getImageUrl(user.userAvatar)}
            alt={user.userName}
            className="search-result-avatar"
        />
        <div className="search-result-info">
            <div className="search-result-username">{user.userName}</div>
            <div className="search-result-fullname">{user.userFullname}</div>
        </div>
        <X
            size={16}
            className="search-remove-icon"
            onClick={(e) => removeRecentSearch(user.userId, e)}
        />
    </div>
))}

TODO 8: 검색 결과 렌더링
힌트: TODO 7과 거의 동일하지만 X 버튼만 제거

=================================================================
*/