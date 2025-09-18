import { useEffect, useLayoutEffect, useState } from 'react'
import { login } from '../../store/slices/loggedInUserSlice';
import { useDispatch } from 'react-redux';
import { ERROR_SERVER } from '../../constants';
import { useAuthorizedAxios } from '../../hooks/useAuthorizedAxios';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

const Login = ({ closeDialog }) => {
    const dispatch = useDispatch();
    const emptyLoginForm = { name: '', password: ''}
    const [ loginForm, setLoginForm ] = useState(emptyLoginForm);
    const [ loginErrorMessage, setLoginErrorMessage ] = useState('')
    const { authorizedAxios } = useAuthorizedAxios()
    const [ loginInfo ] = useState(()=>{
        const localStorageLoginInfo = localStorage.getItem('loginInfo')
        return localStorageLoginInfo ? JSON.parse(localStorageLoginInfo): null
    })

    useEffect(()=>{
        const modalElement = document.getElementById('loginModal');
        const hiddenEventHandler = ()=>{
            setLoginForm(emptyLoginForm)
            setLoginErrorMessage('')
        }
        modalElement?.addEventListener('hidden.bs.modal', hiddenEventHandler);
        return ()=>modalElement.removeEventListener('hidden.bs.modal',hiddenEventHandler)
    })

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
        let errorStatus = 0
        const loginForm = document.getElementById('loginForm');
        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }
        try{
            const response = await doLogin()
            errorStatus = 0
            const { token, ...otherLoginInfo } = response.data;
            const exp = jwtDecode(token).exp * 1000
            dispatch(login({ token, exp, ...otherLoginInfo }))
        } catch(err){
            errorStatus = err.status;
            console.error(err)
        } finally{
            if(errorStatus===0){
                setLoginErrorMessage('')
                setLoginForm(emptyLoginForm)
                closeDialog()
            }
            else if(errorStatus===403){
                setLoginErrorMessage("Unsuccessful Authentication")
            } 
            else{
                setLoginErrorMessage(ERROR_SERVER);
            }
        }
    }

    const doLogin = () => {
        return authorizedAxios.get('/token',{
            params: {
                username: loginForm.name,
                password: loginForm.password
            }
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
