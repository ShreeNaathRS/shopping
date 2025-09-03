import './headerTheme.css'
import { useDispatch, useSelector } from "react-redux"
import { switchTheme } from "../../store/slices/appThemeSlice"
import { useState } from 'react'

const HeaderTheme = () => {
    const appDarkTheme = useSelector(state=>state.appDarkTheme)
    const dispatch = useDispatch()
    const [showSun, setShowSun] = useState(true)
    return (
        <div className="theme-toggle" onClick={()=>{
            setShowSun(!showSun)
            dispatch(switchTheme())
        }}>
            {
                !showSun &&
                <>
                    {!appDarkTheme && <i className="bi bi-moon"></i>}
                    {appDarkTheme && <i className="bi bi-moon-fill"></i>}
                </>
            }
            {
                showSun &&
                <>
                    {appDarkTheme && <i className="bi bi-sun"></i>}
                    {!appDarkTheme && <i className="bi bi-sun-fill"></i>}
                </>
            }
        </div>
    )
}

export default HeaderTheme
