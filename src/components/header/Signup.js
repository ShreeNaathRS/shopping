import { useEffect, useRef, useState } from 'react'
import { ERROR_SERVER } from '../../constants';
import { useAuthAxiosWithProps } from '../../hooks/useAuthAxiosWithProps';

const Signup = ({ closeDialog }) => {
    const signUpNameRef = useRef()
    const signUpEmailRef = useRef()
    const signUpPwdRef = useRef()
    const signUpConfirmPwdRef = useRef()
    const [signupErrorMessage, setSignupErrorMessage] = useState('')
    const onSignupError = err => {
        if(err.error.status===0){
            setSignupErrorMessage('')
            signUpNameRef.current.value = ''
            signUpEmailRef.current.value = ''
            signUpPwdRef.current.value = ''
            signUpConfirmPwdRef.current.value = ''
            closeDialog()
        }
        else if(err.error.status===409){
            setSignupErrorMessage("User already exists!");
        }
        else{
            setSignupErrorMessage(ERROR_SERVER);
        }
    }
    const { doAPICall: doSignupAPICall } = useAuthAxiosWithProps({ setErrorMessage: setSignupErrorMessage, onError: onSignupError })

    useEffect(()=>{
        const modalElement = document.getElementById('loginModal');
        const hiddenEvenHandler = ()=>{
            signUpNameRef.current.value = ''
            signUpEmailRef.current.value = ''
            signUpPwdRef.current.value = ''
            signUpConfirmPwdRef.current.value = ''
            setSignupErrorMessage('')
        }
        modalElement?.addEventListener('hidden.bs.modal', hiddenEvenHandler);
        return ()=>modalElement.removeEventListener('hidden.bs.modal', hiddenEvenHandler)
    })

    const submitSignup = async e => {
        e.preventDefault();
        if(signUpPwdRef.current.value !== signUpConfirmPwdRef.current.value){
            setSignupErrorMessage('Passwords not matching!')
            return;
        } else{
            setSignupErrorMessage(null)
        }
        const signupForm = document.getElementById('signupForm');
        if (!signupForm.checkValidity()) {
            signupForm.reportValidity();
            return;
        }
        await doSignupAPICall('POST','/login',
            {
                name: signUpNameRef.current.value,
                password: signUpPwdRef.current.value,
                email: signUpEmailRef.current.value,
                roles: [{id:2}]
            }
        )
    }

    return (
        <form onSubmit={submitSignup} id='signupForm'>
            <div className="input-group mb-3">
                <input ref={signUpNameRef} required name='name' type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="input-group mb-3">
                <input ref={signUpEmailRef} required name='email' type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="input-group mb-3">
                <input ref={signUpPwdRef} required name='password' type="password" className="form-control" placeholder="Password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                    title="Must contain at least 8 characters, including uppercase, lowercase, number, and special character"
                    autoComplete="new-password"
                />
            </div>
            <div className="input-group mb-3">
                <input ref={signUpConfirmPwdRef} required name='confirmPassword' type="password" className="form-control" placeholder="Confirm password"
                    autoComplete="new-password"
                />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
            <span>{signupErrorMessage}</span>
        </form>
    )
}

export default Signup
