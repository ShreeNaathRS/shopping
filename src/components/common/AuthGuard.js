import { Navigate } from 'react-router-dom'
import moment from 'moment'
import { useState } from 'react'

const AuthGuard = ({ children }) => {
    const [ loginInfo ] = useState(()=>{
        const localStorageLoginInfo = localStorage.getItem('loginInfo')
        return localStorageLoginInfo? JSON.parse(localStorageLoginInfo): null
    })

    return !loginInfo || moment(loginInfo.exp).isBefore(moment())? <Navigate to={'/home'} />: children
    
}

export default AuthGuard
