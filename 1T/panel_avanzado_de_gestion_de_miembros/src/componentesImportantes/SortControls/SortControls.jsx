import React, { useState } from 'react';
import './SortControls.css'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const SortControls = ({ sortConfig, onSort }) => {
    const [localSortConfig, setLocalSortConfig] = useState(sortConfig);

    const handleSortChange = (e) => {
        const { name, value } = e.target;
        setLocalSortConfig((prevConfig) => ({
            ...prevConfig,
            [name]: value,
        }));
    };

    const handleApplySort = () => {
        onSort(localSortConfig.key, localSortConfig.direction);
    };

    return (
        <div className="sort-controls">
            <label>
                Sort By:
                <select name="key" value={localSortConfig.key} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="user_id">User ID</option>
                    <option value="username">Username</option>
                    <option value="level">Level</option>
                    <option value="ilvl">Item Level</option>
                    <option value="character_role">Character Role</option>
                    <option value="guild_role">Guild Role</option>
                    <option value="main_archetype">Main Archetype</option>
                    <option value="secondary_archetype">Secondary Archetype</option>
                    <option value="grandmaster_profession_one">Grandmaster Profession One</option>
                    <option value="grandmaster_profession_two">Grandmaster Profession Two</option>
                    <option value="email">Email</option>
                </select>
            </label>
            <label>
                Order:
                <select name="direction" value={localSortConfig.direction} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </label>
            <button onClick={handleApplySort}>Apply Sort</button>
        </div>
    );
};

export default SortControls;