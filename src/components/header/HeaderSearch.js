import { useLocation } from 'react-router-dom'
import './headerSearch.css'

const HeaderSearch = ({ setSearchText }) => {
  const location = useLocation()
  return ( location.pathname ==='/shop' &&
    <div className="input-group mb-3 search">
        <input type="text" className="form-control" placeholder="Search" onChange={e=>setSearchText(e.target.value)} />
    </div>
  )
}

export default HeaderSearch
