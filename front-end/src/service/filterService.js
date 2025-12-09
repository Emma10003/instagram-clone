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
export const getFilteredFile = async (file, filter) => {
    // 필터가 없으면 원본 그대로 반환
    if(!filter || filter === 'none') return file;
    return new Promise(resolve => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = async () => {
        try {
            await img.decode();  // 이미지 로드 대기
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.filter = filter;
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);  // 메모리 해제

            // canvas -> file 변환

                canvas.toBlob(blob => {
                    resolve(
                        new File(
                            [blob], file.name, {
                                type: file.type, lastModified: new Date()
                            })
                    );
                }, file.type, 0.9);

                img.src = url;

        } catch (err) {
            console.log("filterService: 에러 발생: {}", err);
            return file;  // 에러 발생 시 원본 반환
        }
    }
    });
}