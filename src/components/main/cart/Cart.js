import { EMPTY_CART } from '../../../constants'
import CenteredIndicator from '../../common/CenteredIndicator'
import './cart.css'
import CartPayment from './CartPayment'
import CartProducts from './CartProducts'

import { useSelector } from 'react-redux'

const Cart = () => {
  const productCartSlice = useSelector(state=>state.productCartCounter)
  return (
    productCartSlice?.length?
    <div className='cart'>
      <CartProducts productCartSlice={productCartSlice} />
      <CartPayment productCartSlice={productCartSlice} />
    </div>:
    <CenteredIndicator message={EMPTY_CART}/>
      
  )
}

export default Cart
