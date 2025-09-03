import './headerSearch.css'

const HeaderSearch = ({ setSearchText }) => {
  return (
    <div className="input-group mb-3 search">
        <input type="text" className="form-control" placeholder="Search" onChange={e=>setSearchText(e.target.value)} />
    </div>
  )
}

export default HeaderSearch
