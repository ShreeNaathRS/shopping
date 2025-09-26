import './cartItems.css'

import Item from "../../common/Item";

const CartItems = ({ productCartSlice }) => {
    return (
        <div className='cart-items'>
        {
            productCartSlice.products?.map(cartProduct=><Item product={cartProduct.product}/>)
        }
        </div>
      )
}

export default CartItems
