import './productActions.css'

import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../../store/slices/productCartSlice'

const ProductActions = ({ product }) => {
    const productCartSlice = useSelector(state=>state.productCartCounter)
    const dispatch = useDispatch()
    const getCount = (id, category, subCategory) => {
        return productCartSlice?.find(product=>product.id == id && product.category == category && product.subCategory === subCategory)?.qty??0
    }
    return (
        <div className='card-cart-actions'>
            <i className={`bi bi-cart-dash fs-4 text-danger ${getCount(product.id, product.category, product.subCategory) == 0?'text-muted':''}`} onClick={()=>dispatch(remove(product))}></i>
            <input className="form-control" type="text" value={getCount(product.id, product.category, product.subCategory)} readOnly/>
            <i className="bi bi-cart-plus fs-4 text-primary add-color" onClick={()=>dispatch(add(product))}></i>
        </div>
    )
}

export default ProductActions
