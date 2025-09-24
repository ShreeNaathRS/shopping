import './orders.css'

import { useEffect, useState } from 'react'
import { ORDER_ROW_TABLE_HEADER, ORDER_TABLE_HEADER } from '../../constants'
import OrderTable from '../orders/OrderTable'
import OrderTablePagination from '../orders/OrderTablePagination'
import { useAuthAxiosWithProps } from '../../hooks/useAuthAxiosWithProps'

const Orders = ({ userId }) => {

    const [orderResponse, setOrderResponse] = useState(null)
    const [paginationParams, setPaginationParams] = useState({
        sortString: 'createdAt,desc',
        itemsPerPage: 3,
        currentPage: 1
    })
    const [loading, setLoading] = useState(false)
    const { doAPICall: getOrders } = useAuthAxiosWithProps({
        setLoader: setLoading,
        setResponse: setOrderResponse,
    })

    useEffect(()=>{
        if(userId){
            getOrders('GET',`/orders/byUser/${userId}?page=${paginationParams.currentPage-1}&size=${paginationParams.itemsPerPage}&sort=${paginationParams.sortString}`)
        }
    }, [paginationParams.currentPage, paginationParams.itemsPerPage, paginationParams.sortString, userId, getOrders])

    return (
        <div className='order-container'>
            <div className='order-table-container'>
                <div className='order-table-wrapper'>
                    <OrderTable mainHeader={ORDER_TABLE_HEADER} subHeader={ORDER_ROW_TABLE_HEADER}
                        responseData={orderResponse?.data} loading={loading}
                        paginationParams={paginationParams} setPaginationParams={setPaginationParams}
                    />
                </div>
                <OrderTablePagination response={orderResponse} paginationParams={paginationParams} setPaginationParams={setPaginationParams}/>
            </div>
            
        </div>
    )
}

export default Orders
