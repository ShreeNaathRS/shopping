import { useEffect } from "react"

const OrderTablePagination = ({ response, paginationParams, setPaginationParams }) => {

    useEffect(()=>{
        if(response){
            setPaginationParams(prev=>{
                return {
                    ...prev,
                    totalItems: response.totalItems,
                    totalPages: response.totalPages
                }
            })
        }
    }, [response, setPaginationParams])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= paginationParams.totalPages) {
            setPaginationParams(prev=>{
                return {
                    ...prev,
                    currentPage: page
                }
            })
        }
    };

    return (
        <>
            {!response?.data && ''}
            {
                response?.data &&
                <div className='order-pagination-container'>
                    <div className="items">
                        <label htmlFor="itemsPerPage" className="fw-bold me-2">Items:</label>
                        <select
                            id="itemsPerPage"
                            className="form-select w-auto"
                            value={paginationParams.itemsPerPage}
                            onChange={(e) => {
                                setPaginationParams(prev=>{
                                    return {
                                        ...prev,
                                        itemsPerPage: Number(e.target.value),
                                        currentPage: 1
                                    }
                                })
                            }}
                        >
                            {[3, 5, 10, 25, 50].map(size => (
                            <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <div className='items-on-page fw-bold'>
                        {response?.data?.length===1?<span>{(paginationParams.itemsPerPage*(paginationParams.currentPage-1))+1}({paginationParams.totalItems})</span>:''}
                        {response?.data?.length>1&&response?.data?.length<paginationParams.itemsPerPage?<span>{(paginationParams.itemsPerPage*(paginationParams.currentPage-1))+1}-{paginationParams.totalItems}({paginationParams.totalItems})</span>:''}
                        {response?.data?.length===paginationParams.itemsPerPage?<span>{(paginationParams.itemsPerPage*(paginationParams.currentPage-1))+1}-{(paginationParams.itemsPerPage*(paginationParams.currentPage-1))+paginationParams.itemsPerPage}({paginationParams.totalItems})</span>:''}
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${paginationParams.currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(paginationParams.currentPage - 1)}>
                                {'<<'}
                            </button>
                            </li>
                            { paginationParams.totalPages && [...Array(paginationParams.totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${paginationParams.currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                                </button>
                            </li>
                            ))}
                            <li className={`page-item ${paginationParams.currentPage === paginationParams.totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(paginationParams.currentPage + 1)}>
                                {'>>'}
                            </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            }
        </>
    )
}

export default OrderTablePagination
