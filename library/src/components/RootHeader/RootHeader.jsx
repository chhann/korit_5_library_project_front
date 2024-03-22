/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from "recoil";
import { FiUser, FiLogOut } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { menuState } from "../../atoms/menuAtom";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import instance from "../../apis/utils/instance";

function RootHeader(props) {
    const [ show, setShow ] = useRecoilState(menuState);
    const [ isLogin, setIsLogin ] = useState(false);
    const queryClient = useQueryClient();
    const principalQueryState = queryClient.getQueryState("principalQuery")
    

    useEffect(() => {
        setIsLogin(() => principalQueryState.status === "success")
    }, [principalQueryState.status])

    const handleOpenClick = (e) => {
        e.stopPropagation();
        setShow(() => true)
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("AccessToken");
        // config 옵션
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("principalQuery");
        window.location.replace("/auth/signin");
    }


    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={handleOpenClick}>
                {<HiMenu/>}
            </button>
            {
                !isLogin
                ? <Link css={s.acount} to={"/auth/signin"}>
                    <FiUser/>
                </Link>
                : 
                <div css={s.acountItems}>
                    <button css={s.logout} onClick={handleLogoutClick}>
                        <FiLogOut/>
                    </button>
                    <Link css={s.acount} to={"/account/mypage"}>
                        <FiUser/>
                    </Link>
                </div>
                
            }
            
        </div>
    );
}

export default RootHeader;