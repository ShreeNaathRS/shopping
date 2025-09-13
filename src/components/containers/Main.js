import './main.css'

import Home  from "../Home";
import Cart from '../main/cart/Cart';
import Shop from '../main/shop/Shop';

import { Navigate, Route, Routes } from 'react-router-dom'
import { SafeRender } from '../common/SafeRender';

const Main = ({products, productsLoading, searchText, setSearchText}) => {
  return (
    <main className='main'>
      <Routes>
        <Route path='/' element={<Navigate to='home' />} />
        <Route path='/home' Component={Home} />
        <Route path='/shop' element={
            <SafeRender>
              <Shop products={products} productsLoading={productsLoading} searchText={searchText} setSearchText={setSearchText}/>
            </SafeRender>
          }
        />
        <Route path='/cart' Component={Cart} />
      </Routes>
    </main>
  )
}

export default Main
