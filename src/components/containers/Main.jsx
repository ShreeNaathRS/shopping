import './main.css'

import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import AuthGuard from '../common/AuthGuard';
import React, { Suspense } from 'react';
import CenteredIndicator from '../common/CenteredIndicator';

const LazyShop = React.lazy(()=>import('../main/shop/Shop'))
const LazyCart = React.lazy(()=>import('../main/cart/Cart'))
const LazyOrders = React.lazy(()=>import('../containers/Orders'))

const Main = ({products, productsLoading, searchText, setSearchText}) => {
  const { userId } = useSelector(state=>state.loggedInUser)
  return (
    <main className='main'>
      <Routes>
        <Route path='/' element={<Navigate to='/shop' />} />
        {/* <Route path='/home' element={<Navigate to='/shop' />} /> */}
        <Route path='/shop' element={
          <Suspense fallback={<CenteredIndicator loader={true}/>}>
            <LazyShop products={products} productsLoading={productsLoading} searchText={searchText} setSearchText={setSearchText}/>
          </Suspense>
        } />
        <Route path='/cart' element={
          <Suspense fallback={<CenteredIndicator loader={true}/>}>
            <LazyCart />
          </Suspense>
        } />
        <Route path='/orders' element={
          <Suspense fallback={<CenteredIndicator loader={true}/>}>
            <AuthGuard>
              <LazyOrders userId={userId}/>
            </AuthGuard>
          </Suspense>
        } />
        <Route path='/*' element={<Navigate to='/shop' />} />
      </Routes>
    </main>
  )
}

export default Main
