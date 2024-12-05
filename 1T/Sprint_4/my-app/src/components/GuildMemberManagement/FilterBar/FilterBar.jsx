import React from 'react';

const FilterBar = ({ onFilterChange }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className="filter-bar">
            <input 
                type="text" 
                name="name" 
                placeholder="Filter by name" 
                onChange={handleInputChange} 
            />
            <select name="role" onChange={handleInputChange}>
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="guest">Guest</option>
            </select>
            <input 
                type="range" 
                name="activityLevel" 
                min="0" 
                max="100" 
                onChange={handleInputChange} 
            />
        </div>
    );
};

export default FilterBar;