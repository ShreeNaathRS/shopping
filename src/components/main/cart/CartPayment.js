import './cartPayment.css'
import { useEffect, useState } from 'react'
import { productAxios  } from "../../../service";
import { useRazorpay } from 'react-razorpay';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../store/slices/productCartSlice';
import ConfirmModal from '../../common/ConfirmModal';
import { CART_CLEAR_CONFIRMATION } from '../../../constants';

const CartPayment = ({ productCartSlice }) => {
    const [cartCount, setCartCount] = useState(0)
    const [sum, setSum] = useState(0)
    const { Razorpay } = useRazorpay();
    const dispatch = useDispatch()

    useEffect(()=>{
        if(productCartSlice){
            let count = productCartSlice.reduce((acc,curr)=>acc+curr.qty, 0)
            setCartCount(count)
            let sum = productCartSlice.reduce((acc,curr)=>acc+(curr.qty*curr.price), 0)
            setSum(sum)
        }
    }, [productCartSlice])

    const doPayment = async () =>{
        try{
            const postPayment = await productAxios.post('payment/create-order',{
                amount: sum
            })
            const paymentData =  postPayment.data;
            const options = {
                key: "rzp_test_RGE8UNieYQNDVG",
                amount: paymentData.amount,
                currency: paymentData.currency,
                name: "SwiftKart",
                description: "Purchase!",
                order_id: paymentData.id,
                handler: (response) => {
                    console.log("Payment Success:", response);
                },
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#F37254",
                },
            };
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.error("Payment Failed:", response.error);
            });
            rzp.open();
        } catch(err){
            console.error(err)
        }
    }

    return (
        cartCount>0?
            <div className="card cart-payment">
                <h5 className='card-title'>Cart Summary</h5>
                <ul className="list-group list-group-flush scrollable-list">
                    {
                    productCartSlice && productCartSlice.map(product=>{
                        return (
                        
                        <li className="list-group-item">
                            <div className='cart-summary-item'>
                                <span className='fw-bold'>{product.company}</span>
                                <span>{product.desc.substring(0,50)+(product.desc.length>50?"...":"")}</span>
                                <div className='cart-total'>
                                    <span>Rs. {new Intl.NumberFormat('en-IN').format(product.price)} x {product.qty}</span>
                                    <span className='fw-bold'>Rs. {new Intl.NumberFormat('en-IN').format(product.price*product.qty)}</span>
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
                    <ConfirmModal id='clearCartModal' message={CART_CLEAR_CONFIRMATION} onConfirmation={()=>dispatch(clearCart())}/>
                    <button type="button" className="payment-button btn btn-primary" onClick={()=>doPayment()}>
                        Pay
                    </button>
                </div>
            </div>:
        ""
    )
}

export default CartPayment
