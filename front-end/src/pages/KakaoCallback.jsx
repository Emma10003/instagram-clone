import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get("code");

        if (code) {
            kakoLoginProcess(code);
        } else {
            alert("잘못된 접근입니다.");
            navigate("/login");
        }
    }, []);

    const kakoLoginProcess = async (code) => {

        try {
            const res = await axios.post("/api/auth/kakao", {code});

            if (res.status === 200) {
                // 1.이미 가입된 회원 -> 로그인 성공처리
                const {token, user} = res.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                alert(`환영합니다. ${user.userName}님!`);
                navigate("/feed");
            } else if (res.status === 202) {
                // 2. 성공했으나 미가입 회원 -> 회원가입 페이지로 이동 (정보 전달)
                const kakaoUser = res.data.kakaoUser;
                alert("가입되지 않은 회원입니다. 회원가입을 진행해주세요.");
                navigate("/signup", {
                    state: {
                        email: kakaoUser.userEmail,
                        name: kakaoUser.userName,
                        //  a:kakaoUser.email,
                        // b:kakaoUser.email,
                    }
                });
            }
        } catch (err) {
            console.log(err);
            alert("카카오 로그인 중 오류가 발생했습니다.");
            navigate("/login");

        }
    };
    return(
        <div>
            <h2>카카오 로그인 처리중입니다.</h2>
            <p>잠시만 기다려주세요.</p>
        </div>
    )
}

export default KakaoCallback;