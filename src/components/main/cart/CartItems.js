import './cartItems.css'

import Item from "../../common/Item";
import ListComponent from '../../common/ListComponent';

const CartItems = ({ productCartSlice }) => {
    return (
        <div className='cart-items'>
            <ListComponent data={productCartSlice.products} renderItem={cartProduct=><Item product={cartProduct.product}/>}/>
        </div>
      )
}

export default CartItems
