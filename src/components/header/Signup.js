import { useEffect, useState } from 'react'
import { ERROR_SERVER } from '../../constants';
import { useAuthorizedAxios } from '../../hooks/useAuthorizedAxios';

const Signup = ({ closeDialog }) => {
    const emptySignupForm = { name: '', email:'', password: '', confirmPassword:'' }
    const [signupForm, setSignupForm] = useState(emptySignupForm);
    const [signupErrorMessage, setSignupErrorMessage] = useState('')
    const { authorizedAxios } = useAuthorizedAxios()

    useEffect(()=>{
        const modalElement = document.getElementById('loginModal');
        const hiddenEvenHandler = ()=>{
            setSignupForm(emptySignupForm)
            setSignupErrorMessage('')
        }
        modalElement?.addEventListener('hidden.bs.modal', hiddenEvenHandler);
        return ()=>modalElement.removeEventListener('hidden.bs.modal', hiddenEvenHandler)
    })

    const handleChange = e => {
        setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    };

    const submitSignup = async e => {
        e.preventDefault();
        let errorStatus = 0
        const signupForm = document.getElementById('signupForm');
        if (!signupForm.checkValidity()) {
            signupForm.reportValidity();
            return;
        }
        try{
            const response = await doSignup()
            errorStatus = 0
            console.log(response)
        } catch(err){
            errorStatus=err.status;
            console.error(err)
        } finally{
            if(errorStatus===0){
                setSignupErrorMessage('')
                setSignupForm(emptySignupForm)
                closeDialog()
            }
            else if(errorStatus===409){
                setSignupErrorMessage("You are already signed up!");
            }
            else{
                setSignupErrorMessage(ERROR_SERVER);
            }
        }
    }

    const doSignup = () => {
        return authorizedAxios.post('/login',
            {
                name: signupForm.name,
                password: signupForm.password,
                email: signupForm.email,
                roles: [{id:2}]
            }
        )
    }

    return (
        <form onSubmit={submitSignup} id='signupForm'>
            <div className="input-group mb-3">
                <input required name='name' type="text" className="form-control" placeholder="Name" value={signupForm.name} onChange={handleChange}/>
            </div>
            <div className="input-group mb-3">
                <input required name='email' type="email" className="form-control" placeholder="Email" value={signupForm.email} onChange={handleChange}/>
            </div>
            <div className="input-group mb-3">
                <input required name='password' type="password" className="form-control" placeholder="Password" value={signupForm.password} onChange={handleChange}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                    title="Must contain at least 8 characters, including uppercase, lowercase, number, and special character"
                    autoComplete="new-password"
                />
            </div>
            <div className="input-group mb-3">
                <input required name='confirmPassword' type="password" className="form-control" placeholder="Confirm password" value={signupForm.confirmPassword} onChange={handleChange}
                    pattern={signupForm.password.toString()}
                    title='Not matching with above password!'
                    autoComplete="new-password"
                />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
            <span>{signupErrorMessage}</span>
        </form>
    )
}

export default Signup
