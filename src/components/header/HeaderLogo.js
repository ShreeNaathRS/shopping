import { useEffect, useState } from 'react'
import './headerLogo.css'
import { useSelector } from 'react-redux'

import darkOnlineLogo from '../../assets/dark-online-logo.svg'
import onlineLogo from '../../assets/online-logo.svg'
import offlineLogo from '../../assets/offline-logo.svg'
import darkOfflineLogo from '../../assets/dark-offline-logo.svg'

const HeaderLogo = () => {
  const logoURL = 'logo.svg'
  const [online, setOnline] = useState(navigator.onLine)
  const appDarkTheme = useSelector(state=>state.appDarkTheme)
  useEffect(()=>{
    window.addEventListener('online', ()=>setOnline(true))
    window.addEventListener('offline', ()=>setOnline(false))
  }, [])
  return (
    <div className='header-logo'>
        <img alt='offline' src={online ? (appDarkTheme ? darkOnlineLogo : onlineLogo) : (appDarkTheme ? darkOfflineLogo : offlineLogo) } />
    </div>
  )
}

export default HeaderLogo
