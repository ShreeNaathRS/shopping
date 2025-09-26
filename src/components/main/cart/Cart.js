import './cart.css'
import { EMPTY_CART } from '../../../constants'
import CenteredIndicator from '../../common/CenteredIndicator'
import CartItems from './CartItems'
import CartPayment from './CartPayment'

import { useSelector } from 'react-redux'

const Cart = () => {
  const productCartSlice = useSelector(state=>state.productCartCounter)
  return (
    productCartSlice.products?.length?
    <div className='cart'>
      <CartItems productCartSlice={productCartSlice} />
      <CartPayment productCartSlice={productCartSlice} />
    </div>:
    <CenteredIndicator message={EMPTY_CART}/>
      
  )
}

export default Cart
