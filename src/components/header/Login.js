import { useLayoutEffect, useRef, useState } from 'react'
import { login } from '../../store/slices/loggedInUserSlice';
import { useDispatch } from 'react-redux';
import { useAuthAxiosWithProps } from '../../hooks/useAuthAxiosWithProps';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

const Login = ({ closeDialog }) => {
    const dispatch = useDispatch();
    const loginNameRef = useRef()
    const loginPwdRef = useRef()
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    
    const onLoginSuccess = loginResponse =>{
        if(loginResponse){
            const { token, ...otherLoginInfo } = loginResponse;
            const exp = jwtDecode(token).exp * 1000
            dispatch(login({ token, exp, ...otherLoginInfo }))
            setLoginErrorMessage('')
            loginNameRef.current.value = ''
            loginPwdRef.current.value = ''
            closeDialog(loginResponse)
        }
    }
    const { doAPICall: doLoginAPICall } = useAuthAxiosWithProps( { onSuccess: onLoginSuccess, setErrorMessage: setLoginErrorMessage } );
    const [ loginInfo ] = useState(()=>{
        const localStorageLoginInfo = localStorage.getItem('loginInfo')
        return localStorageLoginInfo ? JSON.parse(localStorageLoginInfo): null
    })

    useLayoutEffect(()=>{
        if(loginInfo?.exp && moment(loginInfo.exp).isAfter(moment())){
            dispatch(login(loginInfo))
        } else{
            localStorage.removeItem('loginInfo')
        }
    }, [loginInfo, dispatch])

    const submitLogin = async e => {
        e.preventDefault();
        const loginFormElement = document.getElementById('loginForm');
        if (!loginFormElement.checkValidity()) {
            loginFormElement.reportValidity();
            return;
        }
        await doLoginAPICall('GET', '/token', {
            username: loginNameRef.current.value,
            password: loginPwdRef.current.value
        })
    }

    return (
        <form onSubmit={submitLogin} id='loginForm'>
            <div className="input-group mb-3">
                <input ref={loginNameRef} required name='name' type="text" className="form-control" placeholder="Name"/>
            </div>
            <div className="input-group mb-3">
                <input ref={loginPwdRef} required name='password' type="password" className="form-control" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <span>{loginErrorMessage}</span>
        </form>
    )
}

export default Login
