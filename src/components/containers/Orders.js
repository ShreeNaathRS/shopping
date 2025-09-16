import './orders.css'

import { useEffect, useState } from 'react'
import { productAxios } from '../../service'
import { ORDER_ROW_TABLE_HEADER, ORDER_TABLE_HEADER } from '../../constants'
import OrderTable from '../orders/OrderTable'
import OrderTablePagination from '../orders/OrderTablePagination'

const Orders = ({ userId }) => {
    const [responseData, setResponseData] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getProducts = async () => {
            setLoading(true)
            try{
                const response = await productAxios.get(`/orders/byUser/${userId}?page=${currentPage-1}&size=${itemsPerPage}&sort=createdAt,desc`)
                setResponseData(response.data)
            } catch(err){
                console.error(err)
            } finally{
                setLoading(false)
            }
        }
        getProducts()
    }, [currentPage, userId, itemsPerPage])

    return (
        <div className='order-container'>
            <div className='order-table-container'>
                <div className='order-table-wrapper'>
                    <OrderTable mainHeader={ORDER_TABLE_HEADER} subHeader={ORDER_ROW_TABLE_HEADER} responseData={responseData?.data}
                        itemsPerPage={itemsPerPage} currentPage={currentPage} loading={loading}
                    />
                </div>
                <OrderTablePagination currentPage={currentPage} itemsPerPage={itemsPerPage} response={responseData}
                    setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} 
                />
            </div>
            
        </div>
    )
}

export default Orders
