import './cartPayment.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../store/slices/productCartSlice';
import ConfirmModal from '../../common/ConfirmModal';
import { CART_CLEAR_CONFIRMATION } from '../../../constants';
import { usePayment } from '../../../hooks/usePayment';
import { useAuthAxiosWithProps } from '../../../hooks/useAuthAxiosWithProps';
import { useAuthorizedAxios } from '../../../hooks/useAuthorizedAxios';

const CartPayment = ({ productCartSlice }) => {
    const [cartCount, setCartCount] = useState(0)
    const [sum, setSum] = useState(0)
    const dispatch = useDispatch()
    const { doPayment } = usePayment()
    const { userId } = useSelector(state=>state.loggedInUser)
    const [orderResponse, setOrderResponse] = useState(null)
    const { doAPICall: placeOrder } = useAuthAxiosWithProps({
        setResponse: setOrderResponse
    });
    const [deleteCartId, setDeleteCartId] = useState(null)
    const { doAPICall: deleteCart } = useAuthAxiosWithProps({
        setResponse: setDeleteCartId
    });
    const {authorizedAxios} = useAuthorizedAxios()

    useEffect(()=>{
        if(productCartSlice?.products){
            let count = productCartSlice.products.reduce((acc,curr)=>acc+=curr.qty, 0)
            setCartCount(count)
            let sum = productCartSlice.products.reduce((acc,curr)=>acc+=(curr.qty*curr.product.price), 0)
            setSum(sum)
        }
    }, [productCartSlice.products])

    useEffect(()=>{
        if(orderResponse){
            deleteCart('DELETE', '/cart')
        }
    }, [orderResponse, deleteCart])

    useEffect(()=>{
        if(deleteCartId > 0){
            dispatch(clearCart())
        }
    },[deleteCartId, dispatch])

    const createOrder = async () => {
        const response = await authorizedAxios.post('payment/create-order',{
            amount: sum
        })
        doPayment({responseData: response.data, successHandler, failureHandler})
    }

    const successHandler = async data => {
        const {receiptId, paymentId, signature} = data;
        const params = {
            user: userId,
            receiptId,
            paymentId,
            signature,
            products: productCartSlice.products.map(cartProduct=>{
                return {
                    qty: cartProduct.qty,
                    price: cartProduct.price,
                    product: cartProduct.product
                }
            }),
            amt: productCartSlice.products.reduce((acc,curr)=>acc+=curr.price,0)
        }
        placeOrder('POST', '/orders', params)
    }

    const failureHandler = err => {
        console.err('fail', err)
    }

    return (
        cartCount>0?
            <div className="card cart-payment">
                <h5 className='card-title'>Cart Summary</h5>
                <ul className="list-group list-group-flush scrollable-list">
                    {
                    productCartSlice.products?.length && productCartSlice.products.map(cartProduct=>{
                        return (
                        
                        <li className="list-group-item">
                            <div className='cart-summary-item'>
                                <span className='fw-bold'>{cartProduct.product.company}</span>
                                <span className='clip-two-lines'>{cartProduct.product.desc}</span>
                                <div className='cart-total'>
                                    <span>Rs. {new Intl.NumberFormat('en-IN').format(cartProduct.product.price)} x {cartProduct.qty}</span>
                                    <span className='fw-bold'>Rs. {new Intl.NumberFormat('en-IN').format(cartProduct.product.price*cartProduct.qty)}</span>
                                </div>
                            </div>
                        </li>
                        )
                    })
                    }
                </ul>
                <li className="list-group list-group-item cart-sub-total fw-bold">
                    <span>Sub Total ({cartCount} items)</span>
                    <span>Rs. {new Intl.NumberFormat('en-IN').format(sum)}</span>
                </li>
                <div className='cart-payment-actions'>
                    <button type="button" className="payment-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#clearCartModal">Clear</button>
                    <ConfirmModal id='clearCartModal' message={CART_CLEAR_CONFIRMATION} onConfirmation={()=>deleteCart('DELETE', '/cart')}/>
                    <button type="button" className={`payment-button btn btn-primary ${!userId?'disabled':''}`} onClick={()=>createOrder()}>
                        Pay
                    </button>
                </div>
            </div>:
        ""
    )
}

export default CartPayment
