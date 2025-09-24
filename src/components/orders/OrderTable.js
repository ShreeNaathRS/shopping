import { Fragment } from "react/jsx-runtime";
import { OrderProduct } from "./OrderProduct";
import { useEffect, useState } from "react";
import moment from "moment";
import CenteredIndicator from "../common/CenteredIndicator";
import { NO_ORDERS } from "../../constants";

export const OrderTable = ( { mainHeader, subHeader, responseData, loading, paginationParams, setPaginationParams } ) => {
    const [header, setHeader] = useState(null)
    const [expandedRow, setExpandedRow] = useState(null);
    const toggleRow = index => {
        setExpandedRow(prev => (prev === index ? null : index));
    };
    useEffect(()=>{
        if(mainHeader){
            setHeader(mainHeader)
        }
    },[mainHeader])
    const toggleSort = index => {
        const head = header[index]
        setPaginationParams(prev=>{
            return {
                ...prev,
                sortString: `${head.sortingName},${head.sortOrder === 'desc'? 'asc': 'desc'}`
            }
        })
        setHeader(header?.map((header, headerIndex)=>
            {
                if(index===headerIndex){
                    return {
                        ...header,
                        sortOrder: header.sortOrder === 'desc'? 'asc': 'desc'
                    }
                } else {
                    return {
                        ...header,
                        sortOrder: 'desc'
                    }
                }
            })
        )
    }
    return (
        <>
            <table className="table order-table">
                <thead>
                    <tr>
                        {
                            header?.map((header, index)=>
                                <th style={{position:'sticky', top: '0', minWidth: header.minWidth}} scope="col">
                                    {header.title}
                                    {header.sortable && <span onClick={()=>toggleSort(index)}>{header.sortOrder==='desc'?<i class="bi bi-caret-down-fill"></i>:<i class="bi bi-caret-up-fill"></i>}</span>}
                                </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {!loading && responseData?.length?  responseData.map((order, index) => {
                        return (<Fragment key={index}>
                            <tr onClick={() => toggleRow(index)} style={{ cursor: 'pointer' }}>
                                <td>{(index+1)+(paginationParams.itemsPerPage*(paginationParams.currentPage-1))}</td>
                                <td>{moment(order.createdAt).format('YYYY-MM-DD')}</td>
                                <td>Rs. {new Intl.NumberFormat('en-IN').format(order.amt)}</td>
                                <td>{order.receiptId}</td>
                                <td>{order.paymentId}</td>
                            </tr>
                            {expandedRow === index && (
                            <tr>
                                <td colSpan={header?.length}>
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
                                <td colSpan={header?.length} className="text-center">
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
