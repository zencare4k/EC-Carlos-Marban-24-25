import React, { useState } from 'react';
import './SortControls.css';
const SortControls = ({ onSort }) => {
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleSortChange = (field) => {
        let order = 'asc';
        if (sortField === field && sortOrder === 'asc') {
            order = 'desc';
        } else if (sortField === field && sortOrder === 'desc') {
            order = '';
        }
        setSortField(field);
        setSortOrder(order);
        onSort(field, order);
    };

    return (
        <div className="sort-controls">
            <button onClick={() => handleSortChange('name')}>Sort by Name</button>
            <button onClick={() => handleSortChange('level')}>Sort by Level</button>
            <button onClick={() => handleSortChange('ilvl')}>Sort by iLvl</button>
            <button onClick={() => handleSortChange('character_role')}>Sort by Role</button>
        </div>
    );
};

export default SortControls;