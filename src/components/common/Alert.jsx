import "./alert.css";
import { useSelector } from "react-redux"

const Alert = () => {
    const { type, message } = useSelector(state=>state.alert)
    return (
        <div style={{
                maxHeight: `${message?'30px':'0px'}`, 
                padding: `${message?'var(--bs-alert-padding-y) var(--bs-alert-padding-x)':'0'}`, 
                marginBottom: `${message?'var(--bs-alert-margin-bottom)':'0'}`,
                border: `${message?'var(--bs-alert-border)':'0'}`
            }} 
            className={`alert alert-${type} d-flex align-items-center`} role="alert"
        >
            <div>
                {message}
            </div>
        </div>
    )
}

export default Alert
