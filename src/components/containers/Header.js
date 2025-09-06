import './header.css'

import HeaderLogo from '../header/HeaderLogo';
import HeaderSearch from '../header/HeaderSearch';
import HeaderLinks from '../header/HeaderLinks';
import HeaderTheme from '../header/HeaderTheme';

const Header = ({ setSearchText }) => {
  return (
    <header className='header'>
      <HeaderLogo />
      <HeaderSearch setSearchText={setSearchText} />
      <HeaderTheme />
      <HeaderLinks />
    </header>
  )
}

export default Header