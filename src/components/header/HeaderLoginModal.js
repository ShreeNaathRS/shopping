import { useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/loggedInUserSlice";
import { productAxios } from '../../service';

export const HeaderLoginModal = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ name: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = e => {
        e.preventDefault();
        doLogin(form.name, form.password)
    }
    
    const doLogin = async (username, password) => {
        try{
            const response = await productAxios.get('/token',{
                params: {
                username,
                password
                }
            })
            const { name, roles, token } = response.data;
            dispatch(login({ name, roles, token }))
        }catch(err){
            console.error(err)
        }
    }
  return (
    <>
        <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#loginModal">
            Login
        </button>
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                </div>
            </div>
        </div>
    </>
  )
}

export default HeaderLoginModal
