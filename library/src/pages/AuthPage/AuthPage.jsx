/** @jsxImportSource @emotion/react */
import * as s from "./style";
import SigninPage from "../SigninPage/SigninPage";
import SignupPage from "../SignupPage/SignupPage";
import { Route, Routes } from 'react-router-dom';
import OAuth2page from "../OAuth2Page/OAuth2page";
import OAuth2SignupPage from "../OAuth2SignupPage/OAuth2SignupPage";
import OAuth2SigninPage from "../OAuth2SigninPage/OAuth2SigninPage";
import { useEffect } from "react";
import { useQueries, useQueryClient } from "react-query";

function AuthPage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    useEffect(() => {
        if(!!principalData) {
            alert("잘못된 접근입니다.");
            window.location.replace("/");
        }
    },[])

    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={ <SigninPage />}/>
                <Route path='/signup' element={ <SignupPage />}/>
                <Route path='/oauth2/'element={ <OAuth2page />} />
                <Route path='/oauth2/signin'element={ <OAuth2SigninPage/>} />
                <Route path='/oauth2/merge' />
                <Route path='/oauth2/signup' element={ <OAuth2SignupPage/>}/>
            </Routes>
        </div>
    );
}

export default AuthPage;