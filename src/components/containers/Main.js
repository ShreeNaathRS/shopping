import './main.css'

import Home  from "../Home";
import Cart from '../main/cart/Cart';
import Shop from '../main/shop/Shop';

import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Main = ({products, searchText, setSearchText}) => {
  const appDarkTheme = useSelector(state=>state.appDarkTheme)
  return (
    <main className={`main ${appDarkTheme?'apply-theme dark':''}`}>
      <Routes>
        <Route path='/' element={<Navigate to='home' />} />
        <Route path='/home' Component={Home} />
        <Route path='/shop' element={<Shop products={products} searchText={searchText} setSearchText={setSearchText}/>} />
        <Route path='/cart' Component={Cart} />
      </Routes>
    </main>
  )
}

export default Main
