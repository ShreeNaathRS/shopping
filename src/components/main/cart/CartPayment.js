import './cartPayment.css'

import { useEffect, useState } from 'react'

const CartPayment = ({ productCartSlice }) => {
    const [cartCount, setCartCount] = useState(0)
    const [sum, setSum] = useState(0)

    useEffect(()=>{
        if(productCartSlice){
        if(productCartSlice){
            let count = productCartSlice.reduce((acc,curr)=>acc+curr.qty, 0)
            setCartCount(count)
            let sum = productCartSlice.reduce((acc,curr)=>acc+(curr.qty*curr.price), 0)
            setSum(sum)
        }
        }
    }, [productCartSlice])

    return (
            <div className="card cart-payment">
                <h5 className='card-title'>Cart Summary</h5>
                <ul className="list-group list-group-flush scrollable-list">
                    {
                    productCartSlice && productCartSlice.map(product=>{
                        return (
                        
                        <li className="list-group-item">
                            <span className='fw-bold'>{product.company.substring(0,10)+(product.company.length>10?"...":"")}</span> &nbsp;
                            <span>{product.desc.substring(0,10)+(product.desc.length>10?"...":"")}</span><br />
                            <div className='cart-total'>
                            <span>Rs. {new Intl.NumberFormat('en-IN').format(product.price)} x {product.qty}</span>
                            <span className='fw-bold'>Rs. {new Intl.NumberFormat('en-IN').format(product.price*product.qty)}</span>
                            </div>
                        </li>
                        )
                    })
                    }
                </ul>
                <li className="list-group list-group-item cart-total fw-bold">
                    <span>Sub Total ({cartCount} items)</span>
                    <span>Rs. {new Intl.NumberFormat('en-IN').format(sum)}</span>
                </li>
            </div>
    )
}

export default CartPayment
