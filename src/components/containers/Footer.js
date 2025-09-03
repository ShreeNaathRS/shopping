import { useSelector } from 'react-redux'
import './footer.css'

const Footer = () => {
  const appDarkTheme = useSelector(state=>state.appDarkTheme)
  return (
    <div className={`${appDarkTheme? 'apply-theme dark': ''}`}>
        <footer className="footer">
          <p>© 2025 EaseKart. All rights reserved</p>
        </footer>
    </div>
  )
}

export default Footer
