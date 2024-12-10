import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllGuildMembers } from '../../../../Services/guildmembers_API';

const Pagination = ({ onPageChange = () => {} }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTotalPages = async () => {
            try {
                const members = await getAllGuildMembers();
                setTotalPages(Math.ceil(members.length / 10));
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        };

        fetchTotalPages();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;