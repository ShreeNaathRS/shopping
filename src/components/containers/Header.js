import './header.css'

import HeaderLogo from '../header/HeaderLogo';
import HeaderSearch from '../header/HeaderSearch';
import HeaderLinks from '../header/HeaderLinks';
import HeaderTheme from '../header/HeaderTheme';
import { useSelector } from 'react-redux';
import HeaderLoginModal from '../header/HeaderLoginModal';

const Header = ({ setSearchText }) => {
  const appDarkTheme = useSelector(state=>state.appDarkTheme)
  return (
    <header className={`header ${appDarkTheme? 'apply-theme dark': ''}`}>
      <HeaderLogo />
      <HeaderSearch setSearchText={setSearchText} />
      <HeaderTheme />
      <HeaderLinks />
    </header>
  )
}

export default Header