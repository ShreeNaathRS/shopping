import './productActions.css'

import { useSelector } from 'react-redux'
import { useCartActions } from '../../hooks/useCartActions'
import { useState } from 'react'

const ProductActions = ({ product }) => {
    const productCartSlice = useSelector(state=>state.cart)
    const [cartUpdateLoader, setCartUpdateLoader] = useState(false)
    const { handleSaveCart, handleRemoveCart } = useCartActions({ setCartUpdateLoader })

    const getCount = (prd) => {
        return productCartSlice?.products.find(cartProduct=>cartProduct.product.id === prd.id && cartProduct.product.category === prd.category && cartProduct.product.subCategory === prd.subCategory)?.qty??0
    }
    
    return (
        <div className='card-cart-actions-container'>
            <div className='card-cart-actions'>
                <i className={`bi bi-cart-dash fs-4 text-danger ${(getCount(product) === 0)||cartUpdateLoader?'text-muted':''}`} onClick={()=>!(getCount(product) === 0||cartUpdateLoader) && handleRemoveCart(product)}></i>
                <input className="form-control" type="text" value={getCount(product)} readOnly/>
                <i className={`bi bi-cart-plus fs-4 text-primary ${cartUpdateLoader?'text-muted':'add-color'}`} onClick={()=>!cartUpdateLoader && handleSaveCart(product)}></i>
            </div>
        </div>
    )
}

export default ProductActions
