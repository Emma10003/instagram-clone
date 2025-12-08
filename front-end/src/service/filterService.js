export const FILTER_OPTIONS = [
    { name: 'Original', filter: 'none' },
    { name: 'Grayscale', filter: 'grayscale(100%)' },
    { name: 'Sepia', filter: 'sepia(60%)' },
    { name: 'Warm', filter: 'sepia(30%) saturate(140%)' },
    { name: 'Cool', filter: 'hue-rotate(180deg) saturate(80%)' },
    { name: 'Brightness', filter: 'brightness(120%) contrast(110%)' },
    { name: 'Vintage', filter: 'sepia(40%) contrast(120%) saturate(80%)' },
];

/**
 * 원본 이미지 파일에 CSS 필터를 적용하여 새로운 파일로 변환
 * @param sourceImageFile   원본 이미지 파일
 * @param filter            적용할 CSS 필터 문자열
 * @returns {Promise<File>} 필터가 적용된 새로운 File 객체
 */
export const getFilteredFile = (sourceImageFile, filter) => {
    // 필터가 없으면 원본 그대로 반환
    if(!filter || filter === 'none') {
        return Promise.resolve(sourceImageFile);
    }
}