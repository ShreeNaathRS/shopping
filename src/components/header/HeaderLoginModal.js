import './headerLoginModal.css'

import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/loggedInUserSlice";
import { productAxios } from '../../service';

export const HeaderLoginModal = () => {
    const dispatch = useDispatch();
    const emptyForm = { name: '', email:'', password: '', confirmPassword:'' }
    const [form, setForm] = useState(emptyForm);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = e => {
        e.preventDefault();
        if(form.email){
            doSignup()
        } else {
            doLogin()
        }
        setForm(emptyForm)
    }
    
    const doLogin = async () => {
        try{
            const response = await productAxios.get('/token',{
                params: {
                    username: form.name,
                    password: form.password
                }
            })
            const { userId, name, email, roles, token } = response.data;
            dispatch(login({ userId, name, email, roles, token }))
        }catch(err){
            console.error(err)
        }
    }

    const doSignup = async () => {
        try{
            const response = await productAxios.post('/login',
                {
                    name: form.name,
                    password: form.password,
                    email: form.email,
                    roles: [{id:2}]
                }
            )
            console.log(response)
        }catch(err){
            console.error(err)
        }
    }
  return (
    <>
        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#loginModal">
            Signup/Login
        </button>
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="loginModalLabel">SwiftKart</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs" id="loginSignupTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Login</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Signup</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="loginSignupContent">
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <form onSubmit={submit}>
                                    <div className="input-group mb-3">
                                        <input name='name' type="text" className="form-control" placeholder="Name" value={form.name} onChange={handleChange}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input name='password' type="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Login</button>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                <form onSubmit={submit}>
                                    <div className="input-group mb-3">
                                        <input name='name' type="text" className="form-control" placeholder="Name" value={form.name} onChange={handleChange}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input name='email' type="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input name='password' type="password" className="form-control" placeholder="Password" value={form.password} onChange={handleChange}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input name='confirmPassword' type="password" className="form-control" placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Signup</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HeaderLoginModal
