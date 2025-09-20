import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { login } from '../../store/slices/loggedInUserSlice';
import { useDispatch } from 'react-redux';
import { useAuthAxiosWithProps } from '../../hooks/useAuthAxiosWithProps';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

const Login = ({ closeDialog }) => {
    const dispatch = useDispatch();
    const emptyLoginForm = useMemo(()=>{
        return { name: '', password: ''}
    },[])
    const [ loginForm, setLoginForm ] = useState(emptyLoginForm);
    const [ loginResponse, setLoginResponse] = useState(null)
    const [ loginErrorMessage, setLoginErrorMessage ] = useState('')
    const { doAPICall: doLoginAPICall } = useAuthAxiosWithProps( { setResponse: setLoginResponse, setErrorMessage: setLoginErrorMessage } );
    const [ loginInfo ] = useState(()=>{
        const localStorageLoginInfo = localStorage.getItem('loginInfo')
        return localStorageLoginInfo ? JSON.parse(localStorageLoginInfo): null
    })

    useEffect(()=>{
        if(loginResponse){
            const { token, ...otherLoginInfo } = loginResponse;
            const exp = jwtDecode(token).exp * 1000
            dispatch(login({ token, exp, ...otherLoginInfo }))
            setLoginErrorMessage('')
            setLoginForm(emptyLoginForm)
            closeDialog(loginResponse)
        }
    }, [loginResponse, dispatch, closeDialog, emptyLoginForm])


    useLayoutEffect(()=>{
        if(loginInfo?.exp && moment(loginInfo.exp).isAfter(moment())){
            dispatch(login(loginInfo))
        } else{
            localStorage.removeItem('loginInfo')
        }
    }, [loginInfo, dispatch])

    const handleChange = e => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const submitLogin = async e => {
        e.preventDefault();
        const loginFormElement = document.getElementById('loginForm');
        if (!loginFormElement.checkValidity()) {
            loginFormElement.reportValidity();
            return;
        }
        await doLoginAPICall('GET', '/token', {
            username: loginForm.name,
            password: loginForm.password
        })
    }

    return (
        <form onSubmit={submitLogin} id='loginForm'>
            <div className="input-group mb-3">
                <input required name='name' type="text" className="form-control" placeholder="Name" value={loginForm.name} onChange={handleChange}/>
            </div>
            <div className="input-group mb-3">
                <input required name='password' type="password" className="form-control" placeholder="Password" value={loginForm.password} onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <span>{loginErrorMessage}</span>
        </form>
    )
}

export default Login
