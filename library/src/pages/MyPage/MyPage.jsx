/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useQueryClient } from "react-query";


function MyPage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    console.log(principalData);
    return (
        <div css={s.layout}>
            <div css={s.header}>
                <div css={s.imgBox}>
                    <div css={s.profileImg}>
                        <img src="https://image.kmib.co.kr/online_image/2024/0216/2024021520210743026_1707996067_0924344272.jpg" alt="" />
                    </div>

                </div>
                <div css={s.infoBox}>
                    <div css={s.infoText}>
                        사용자이름: {principalData.data.username}
                    </div>
                    <div css={s.infoText}>
                        이름: {principalData.data.name}
                    </div>
                    <div css={s.emailBox}>
                        <div css={s.infoText}>이메일 : {principalData.data.email}</div>
                        {
                            principalData.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0 
                            ?
                            <button css={s.infoButton}>인증하기</button>
                            :
                            <>체크</>
                        }
                    </div>
                    <div>
                        <button>정보 수정</button>
                        <button>비밀번호</button>
                    </div>
                </div>
            </div>
            <div css={s.bottom}>

            </div>
            

        </div>
    );
}

export default MyPage;