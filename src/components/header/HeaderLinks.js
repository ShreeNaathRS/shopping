import './headerLinks.css'

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import HeaderProfile from './HeaderProfile';
import { HeaderLoginModal } from "./HeaderLoginModal";

const HeaderLinks = () => {
    const tabs = [
        { name: 'Home', route: '/home' },
        { name: 'Shop', route: '/shop' },
        { name: 'Cart', route: '/cart' }
    ];
    
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0)
    const productCartSlice = useSelector(state=>state.productCartCounter)
    const [profileExpanded, setProfileExpanded] = useState(false)
    const {name} = useSelector(state=>state.loggedInUser)

    useEffect(()=>{
        if(productCartSlice){
        let count = productCartSlice.reduce((acc,curr)=>acc+curr.qty, 0)
        setCartCount(count)
        }
    }, [productCartSlice])

    return (
        <div className='header-links-container'>
            <div className='header-links'>
                {
                    tabs.map(tab=>{
                        return (
                            <div className='link-badge'>
                                {tab.name !=='Cart'? 
                                    <span key={tab.name} onClick={()=>navigate(tab.route)}>{tab.name}</span>: 
                                    <span className='cartLink'>
                                        <span key={tab.name} onClick={()=>navigate(tab.route)}>{tab.name}</span>
                                        {cartCount>0 && (<span className="badge bg-danger rounded-pill">{cartCount}</span>)}
                                    </span>
                                }
                            </div>)
                        }
                    )
                }
            </div>
            <div className='header-links-button'>
                {name?<HeaderProfile profileExpanded={profileExpanded} setProfileExpanded={setProfileExpanded}/>:<HeaderLoginModal />}
            </div>
        </div>
    )
}

export default HeaderLinks
