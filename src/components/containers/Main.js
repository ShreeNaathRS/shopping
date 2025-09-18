import './main.css'

import Home  from "../Home";
import Cart from '../main/cart/Cart';
import Shop from '../main/shop/Shop';

import { Navigate, Route, Routes } from 'react-router-dom'
import Orders from './Orders';
import { useSelector } from 'react-redux';
import AuthGuard from '../common/AuthGuard';

const Main = ({products, productsLoading, searchText, setSearchText}) => {
  const { userId } = useSelector(state=>state.loggedInUser)
  return (
    <main className='main'>
      <Routes>
        <Route path='/' element={<Navigate to='home' />} />
        <Route path='/home' Component={Home} />
        <Route path='/shop' element={<Shop products={products} productsLoading={productsLoading} searchText={searchText} setSearchText={setSearchText}/>} />
        <Route path='/cart' Component={Cart} />
        <Route path='/orders' element={
          <AuthGuard>
            <Orders userId={userId}/>
          </AuthGuard>
          } 
        />
      </Routes>
    </main>
  )
}

export default Main
