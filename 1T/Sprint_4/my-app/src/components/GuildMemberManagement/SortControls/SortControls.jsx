
import React, { useState } from 'react';

const SortControls = ({ onSort = () => {} }) => {
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleSortChange = (column) => {
        let order = 'asc';
        if (sortColumn === column && sortOrder === 'asc') {
            order = 'desc';
        } else if (sortColumn === column && sortOrder === 'desc') {
            order = '';
        }
        setSortColumn(column);
        setSortOrder(order);
        onSort(column, order);
    };

    return (
        <div>
            <button onClick={() => handleSortChange('user_id')}>Sort by User ID</button>
            <button onClick={() => handleSortChange('username')}>Sort by Username</button>
            <button onClick={() => handleSortChange('level')}>Sort by Level</button>
            <button onClick={() => handleSortChange('ilvl')}>Sort by Item Level</button>
            <button onClick={() => handleSortChange('character_role')}>Sort by Character Role</button>
            <button onClick={() => handleSortChange('guild_role')}>Sort by Guild Role</button>
            <button onClick={() => handleSortChange('main_archetype')}>Sort by Main Archetype</button>
            <button onClick={() => handleSortChange('secondary_archetype')}>Sort by Secondary Archetype</button>
            <button onClick={() => handleSortChange('grandmaster_profession_one')}>Sort by Grandmaster Profession One</button>
            <button onClick={() => handleSortChange('grandmaster_profession_two')}>Sort by Grandmaster Profession Two</button>
        </div>
    );
};

export default SortControls;