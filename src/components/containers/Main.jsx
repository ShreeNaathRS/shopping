import './main.css'

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
        <Route path='/' element={<Navigate to='/shop' />} />
        {/* <Route path='/home' element={<Navigate to='/shop' />} /> */}
        <Route path='/shop' element={<Shop products={products} productsLoading={productsLoading} searchText={searchText} setSearchText={setSearchText}/>} />
        <Route path='/cart' Component={Cart} />
        <Route path='/orders' element={
          <AuthGuard>
            <Orders userId={userId}/>
          </AuthGuard>
          } 
        />
        <Route path='/*' element={<Navigate to='/shop' />} />
      </Routes>
    </main>
  )
}

export default Main
