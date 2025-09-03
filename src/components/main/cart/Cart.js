import './cart.css'
import CartPayment from './CartPayment'
import CartProducts from './CartProducts'

import { useSelector } from 'react-redux'

const Cart = () => {
  const productCartSlice = useSelector(state=>state.productCartCounter)
  return (
    <div className='cart'>
      <CartProducts productCartSlice={productCartSlice} />
      <CartPayment productCartSlice={productCartSlice} />        
    </div>
  )
}

export default Cart
