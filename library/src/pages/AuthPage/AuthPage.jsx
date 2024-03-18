/** @jsxImportSource @emotion/react */
import * as s from "./style";
import SigninPage from "../SigninPage/SigninPage";
import SignupPage from "../SignupPage/SignupPage";
import { Route, Routes } from 'react-router-dom';

function AuthPage(props) {
    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={ <SigninPage />}/>
                <Route path='/signup' element={ <SignupPage />}/>
                <Route path='/signup/oauth'/>
            </Routes>
        </div>
    );
}

export default AuthPage;