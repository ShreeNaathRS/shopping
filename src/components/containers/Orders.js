import './orders.css'

import { useEffect, useState } from 'react'
import { ORDER_ROW_TABLE_HEADER, ORDER_TABLE_HEADER } from '../../constants'
import OrderTable from '../orders/OrderTable'
import OrderTablePagination from '../orders/OrderTablePagination'
import { useAuthAxiosWithProps } from '../../hooks/useAuthAxiosWithProps'

const Orders = ({ userId }) => {

    const [sortString, setSortString] = useState('createdAt,desc')
    const [orderResponse, setOrderResponse] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const { doAPICall: getOrders } = useAuthAxiosWithProps({ setLoader: setLoading, setResponse: setOrderResponse })

    useEffect(()=>{
        getOrders('GET',`/orders/byUser/${userId}?page=${currentPage-1}&size=${itemsPerPage}&sort=${sortString}`)
    }, [currentPage, userId, itemsPerPage, sortString, getOrders])

    return (
        <div className='order-container'>
            <div className='order-table-container'>
                <div className='order-table-wrapper'>
                    <OrderTable mainHeader={ORDER_TABLE_HEADER} subHeader={ORDER_ROW_TABLE_HEADER} responseData={orderResponse?.data}
                        itemsPerPage={itemsPerPage} currentPage={currentPage} loading={loading} setSortString={setSortString}
                    />
                </div>
                <OrderTablePagination currentPage={currentPage} itemsPerPage={itemsPerPage} response={orderResponse}
                    setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} 
                />
            </div>
            
        </div>
    )
}

export default Orders
