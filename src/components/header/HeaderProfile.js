import './headerProfile.css'
import { useCallback, useEffect, useRef } from "react";
import { Popover } from 'bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/loggedInUserSlice";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthAxiosWithProps } from '../../hooks/useAuthAxiosWithProps';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import { sync } from '../../store/slices/productCartSlice';

const HeaderProfile = ({profileExpanded, setProfileExpanded}) => {
    const popoverRef = useRef(null);
    const {name, email, token } = useSelector(state=>state.loggedInUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onUserCartSuccess = useCallback(loginCartResponse => {
        if(loginCartResponse){
            dispatch(sync(loginCartResponse))
        }
    }, [dispatch])
    const { doAPICall: getUserCart } = useAuthAxiosWithProps({
            onSuccess: onUserCartSuccess 
    });

    useEffect(() => {
        if(token){
            const isTokenValid = moment(jwtDecode(token).exp * 1000).isAfter(moment());
            if (isTokenValid) {
                getUserCart('GET', '/cart');
            }
        }
    }, [token, getUserCart]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if ((event.target.id !== 'profileBtn' && event.target.id !== 'profileI') && popoverRef.current && !popoverRef.current.contains(event.target)) {
                setProfileExpanded(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    document.addEventListener("DOMContentLoaded",  () => {
        const profileBtn = document.getElementById("profileBtn");
        const popoverContent = document.getElementById("profilePopoverContent").innerHTML;

        Popover(profileBtn, {
            content: popoverContent,
            html: true,
            placement: "bottom",
            trigger: "click"
        });
    });
  return (
    <>
        <button id="profileBtn" type="button" className="btn btn-outline-secondary rounded-circle" onClick={()=>setProfileExpanded(!profileExpanded)}>
        <i id='profileI' className="bi bi-person-circle"></i>
        </button>
        <div ref={popoverRef} className="login-container" id="profilePopoverContent" style={{display: `${profileExpanded?'flex':'none'}`}}>
            <div className="text-center login" >
                <p style={{fontWeight: 'bold'}}>Welcome, {name}</p>
                <p style={{fontWeight: 'bold', overflowWrap: 'break-word'}}>{email}</p>
                <span><NavLink to='/orders' key={'Orders'}>Orders</NavLink></span>
                <button style={{width: '70px', alignSelf: 'center', height: '25px', marginBottom: '5px', padding: '0'}} className="btn btn-sm btn-danger mt-2" 
                    onClick={()=>{
                            localStorage.removeItem('loginInfo')
                            dispatch(logout())
                            navigate("/")
                        }}
                >
                        Logout
                </button>
            </div>
        </div>
    </>
  )
}

export default HeaderProfile
