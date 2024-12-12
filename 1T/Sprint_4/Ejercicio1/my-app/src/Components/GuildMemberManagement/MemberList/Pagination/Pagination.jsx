import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllGuildMembers } from '../../../../Services/guildmembers_API';

const Pagination = ({ onPageChange = () => {} }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchTotalPages = async () => {
            try {
                const members = await getAllGuildMembers();
                setTotalPages(Math.ceil(members.length / limit));
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        };

        fetchTotalPages();
        onPageChange(currentPage, limit);
    }, [limit, currentPage, onPageChange]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (event) => {
        setLimit(Number(event.target.value));
        setCurrentPage(1);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={i === currentPage}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <select value={limit} onChange={handleLimitChange}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {renderPageNumbers()}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    onPageChange: PropTypes.func,
};

export default Pagination;