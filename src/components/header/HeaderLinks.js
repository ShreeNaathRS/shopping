import './headerLinks.css'

import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import HeaderProfile from './HeaderProfile';
import HeaderLoginSignupModal from './HeaderLoginSignupModal';

const HeaderLinks = () => {
    const tabs = useMemo(() => [
        { name: 'Home', route: '/home', isActive: false },
        { name: 'Shop', route: '/shop', isActive: false },
        { name: 'Cart', route: '/cart', isActive: false }
    ], []);
    const location = useLocation()
    
    const [cartCount, setCartCount] = useState(0)
    const productCartSlice = useSelector(state=>state.productCartCounter)
    const [profileExpanded, setProfileExpanded] = useState(false)
    const {name} = useSelector(state=>state.loggedInUser)
    
    useEffect(()=>{
        if(location){
            tabs.forEach(tab=>{
                if(tab.route===location.pathname){
                    tab.isActive = true
                } else{
                    tab.isActive = false
                }
            })
        }
    }, [location, tabs])

    useEffect(()=>{
        if(productCartSlice.products){
            let count = productCartSlice.products.reduce((acc,curr)=>acc+curr.qty, 0)
            setCartCount(count)
        }
    }, [productCartSlice.products])

    return (
        <div className='header-links-container'>
            <div className='header-links'>
                {
                    tabs.map(tab=>{
                        return (
                            <div className='link-badge'>
                                {tab.name !=='Cart'? 
                                    <NavLink to={tab.route} key={tab.name}>{tab.name}</NavLink>: 
                                    <NavLink className="cartLink" to={tab.route} >
                                        <span key={tab.name}>{tab.name}</span>
                                        {cartCount>0 && (<span className="badge bg-danger rounded-pill">{cartCount}</span>)}
                                    </NavLink>
                                }
                            </div>)
                        }
                    )
                }
            </div>
            <div className='header-links-button'>
                {name?<HeaderProfile profileExpanded={profileExpanded} setProfileExpanded={setProfileExpanded}/>:<HeaderLoginSignupModal />}
            </div>
        </div>
    )
}

export default HeaderLinks
