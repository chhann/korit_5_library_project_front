import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { principalState } from '../atoms/principalAtom';
import AuthPage from '../pages/AuthPage/AuthPage';
import HomePage from '../pages/HomePage/HomePage';
import { useCallback, useEffect } from 'react';
import { getPrincipalRequest } from '../apis/api/principal';

function AuthRoute(props) {

    const [ principal, setPrincipal ] = useRecoilState(principalState);

    useEffect(() => {
        getPrincipal();
    } ,[])

    const getPrincipal = useCallback(() => {
        getPrincipalRequest()
        .then(response => {
            setPrincipal(() => response.data);
        }).catch(error => {
            console.log(error);
        });
    },[]);

    return (
        <Routes>
            <Route path="/auth/*" element={ <AuthPage /> } />
            <Route path="/" element={<HomePage/>}/>
        </Routes>
    );
}

export default AuthRoute;