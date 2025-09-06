import './headerProfile.css'
import { useEffect, useRef } from "react";
import { Popover } from 'bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/loggedInUserSlice";

const HeaderProfile = ({profileExpanded, setProfileExpanded}) => {
    const popoverRef = useRef(null);
    const {name} = useSelector(state=>state.loggedInUser)
    const dispatch = useDispatch()

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
                <button style={{width: '70px', alignSelf: 'center', height: '25px', marginBottom: '5px', padding: '0'}} className="btn btn-sm btn-danger mt-2" onClick={()=>dispatch(logout())}>Logout</button>
            </div>
        </div>
    </>
  )
}

export default HeaderProfile
