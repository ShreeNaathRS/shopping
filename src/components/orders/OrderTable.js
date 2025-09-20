import { Fragment } from "react/jsx-runtime";
import { OrderProduct } from "./OrderProduct";
import { useState } from "react";
import moment from "moment";
import CenteredIndicator from "../common/CenteredIndicator";
import { NO_ORDERS } from "../../constants";

export const OrderTable = ( { mainHeader, subHeader, responseData, itemsPerPage, currentPage, loading } ) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const toggleRow = index => {
        setExpandedRow(prev => (prev === index ? null : index));
    };
    return (
        <>
            <table className="table order-table">
                <thead>
                    <tr>
                        {mainHeader.map(header=><th style={{position:'sticky', top: '0'}} scope="col">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {!loading && responseData?.length?  responseData.map((order, index) => {
                        const orderTotal=order.products.reduce((acc, curr)=>{
                        return acc+=curr.qty * curr.price 
                        },0);
                        return (<Fragment key={index}>
                            <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
                                <td>{(index+1)+(itemsPerPage*(currentPage-1))}</td>
                                <td>{moment(order.createdAt).format('YYYY-MM-DD')}</td>
                                <td>{order.receiptId}</td>
                                <td>{order.paymentId}</td>
                                <td>Rs. {new Intl.NumberFormat('en-IN').format(orderTotal)}</td>
                            </tr>
                            {expandedRow === index && (
                            <tr>
                                <td colSpan={mainHeader.length}>
                                    <table className="table table-sm mb-0 order-product-table">
                                        <thead>
                                            <tr>
                                                {subHeader.map(rowHeader=><th>{rowHeader}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.products.map((orderProduct,index)=>
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>
                                                            <OrderProduct product={orderProduct.product} />
                                                        </td>
                                                        <td>{orderProduct.qty}</td>
                                                        <td>{orderProduct.price}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            )}
                        </Fragment>
                    )}):(!loading &&
                            (<tr>
                                <td colSpan={mainHeader.length} className="text-center">
                                    {NO_ORDERS}
                                </td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
            {loading && <CenteredIndicator loader={true}/>}
        </>
    )
}
export default OrderTable
