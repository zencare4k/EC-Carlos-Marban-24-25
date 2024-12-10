import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    character_role: '',
    guild_role: '',
    main_archetype: '',
    secondary_archetype: '',
    grandmaster_profession_one: '',
    grandmaster_profession_two: '',
    min_level: '',
    max_level: '',
    min_ilvl: '',
    max_ilvl: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="filter-bar">
      {/* Implement filter inputs */}
      <input type="text" name="character_role" placeholder="Character Role" onChange={handleChange} />
      {/* Add more filters as needed */}
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;