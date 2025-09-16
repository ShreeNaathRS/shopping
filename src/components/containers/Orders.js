import './orders.css'

import { Fragment, useEffect, useRef, useState } from 'react'
import { productAxios } from '../../service'
import { ORDER_ROW_TABLE_HEADER, ORDER_TABLE_HEADER } from '../../constants'
import OrderProduct from '../orders/OrderProduct'

const Orders = ({ userId }) => {
    const hasFetched = useRef(false)
    const [responseData, setResponseData] = useState(null)
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = index => {
    setExpandedRow(prev => (prev === index ? null : index));
    };


    useEffect(()=>{
        if(hasFetched.current){
            return
        }
        hasFetched.current = true
        if(userId){
            const getProducts = async () => {
                const response = await productAxios.get(`/orders/byUser/${userId}`)
                setResponseData(response.data)
            }
            getProducts()
        }
    })
  return (
    <div>
        <table className="table order-table">
            <thead>
                <tr>
                    {ORDER_TABLE_HEADER.map(header=><th scope="col">{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {responseData && responseData.map((data, index) => (
                    <Fragment key={index}>
                        <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
                        <td>{index+1}</td>
                        <td>{data.createdAt}</td>
                        <td>{data.receiptId}</td>
                        <td>{data.paymentId}</td>
                        </tr>
                        {expandedRow === index && (
                        <tr>
                            <td colSpan={ORDER_TABLE_HEADER.length}>
                                <table className="table table-sm mb-0 order-product-table">
                                    <thead>
                                        <tr>
                                            {ORDER_ROW_TABLE_HEADER.map(rowHeader=><th>{rowHeader}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.products.map((orderProduct,index)=>
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>
                                                        <OrderProduct product={orderProduct.product} />
                                                    </td>
                                                    <td>{orderProduct.qty}</td>
                                                    <td>{orderProduct.amt}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        )}
                    </Fragment>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Orders
