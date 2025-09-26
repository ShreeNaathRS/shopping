import { useEffect, useState } from "react";
import { PAGINATION_OPTIONS } from "../../constants";

const OrderTablePagination = ({ response, paginationParams, setPaginationParams }) => {
    const [visibleCount, setVisibleCount] = useState(2);

    useEffect(() => {
        if (response) {
            setPaginationParams(prev => ({
                ...prev,
                totalItems: response.totalItems,
                totalPages: response.totalPages
            }));
        }
    }, [response, setPaginationParams]);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.matchMedia("(max-width: 480px) and (orientation: portrait)").matches) {
            setVisibleCount(2);
            } else if (window.matchMedia("(max-width: 768px) and (orientation: landscape)").matches) {
            setVisibleCount(4);
            } else {
            setVisibleCount(6);
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= paginationParams.totalPages) {
            setPaginationParams(prev => ({
                ...prev,
                currentPage: page
            }));
        }
    };

    const getVisiblePages = () => {
        const { currentPage, totalPages } = paginationParams;
        let start = Math.max(1, currentPage - Math.floor(visibleCount / 2));
        let end = start + visibleCount - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - visibleCount + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
                                setPaginationParams(prev => ({
                                    ...prev,
                                    itemsPerPage: Number(e.target.value),
                                    currentPage: 1
                                }));
                            }}
                        >
                            {PAGINATION_OPTIONS.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <div className='items-on-page fw-bold'>
                        {response?.data?.length === 1 &&
                            <span>{(paginationParams.itemsPerPage * (paginationParams.currentPage - 1)) + 1} ({paginationParams.totalItems})</span>}
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${paginationParams.currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(1)}>
                                    {'<<'}
                                </button>
                            </li>

                            <li className={`page-item ${paginationParams.currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(paginationParams.currentPage - 1)}>
                                    {'<'}
                                </button>
                            </li>

                            {getVisiblePages().map(page => (
                                <li key={page} className={`page-item ${paginationParams.currentPage === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(page)}>
                                        {page}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${paginationParams.currentPage === paginationParams.totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(paginationParams.currentPage + 1)}>
                                    {'>'}
                                </button>
                            </li>

                            <li className={`page-item ${paginationParams.currentPage === paginationParams.totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(paginationParams.totalPages)}>
                                    {'>>'}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            }
        </>
    );
};

export default OrderTablePagination;
