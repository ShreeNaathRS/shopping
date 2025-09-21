import { useEffect, useState } from "react"

const OrderTablePagination = ({ itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, response }) => {
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(()=>{
        if(response){
            setTotalPages(response.totalPages)
            setTotalItems(response.totalItems)
        }
    }, [response])

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {!response?.data && ''}
            {
                response?.data &&
                <div className='order-pagination-container'>
                    <div className="d-flex justify-content-end align-items-center">
                        <label htmlFor="itemsPerPage" className="fw-bold me-2">Items:</label>
                        <select
                            id="itemsPerPage"
                            className="form-select w-auto"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            {[3, 5, 10, 25, 50].map(size => (
                            <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <div className='items-on-page fw-bold'>
                        {response?.data?.length===1?<span>{(itemsPerPage*(currentPage-1))+1}({totalItems})</span>:''}
                        {response?.data?.length>1&&response?.data?.length<itemsPerPage?<span>{(itemsPerPage*(currentPage-1))+1}-{totalItems}({totalItems})</span>:''}
                        {response?.data?.length===itemsPerPage?<span>{(itemsPerPage*(currentPage-1))+1}-{(itemsPerPage*(currentPage-1))+itemsPerPage}({totalItems})</span>:''}
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                {'<<'}
                            </button>
                            </li>
                            { totalPages && [...Array(totalPages)].map((_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                                </button>
                            </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
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
