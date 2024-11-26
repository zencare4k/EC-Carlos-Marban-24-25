import React from 'react';
import './FilterBar.css';
const FilterBar = ({ onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div>
      <input type="text" name="character_role" placeholder="Character Role" onChange={handleInputChange} />
      <input type="text" name="guild_role" placeholder="Guild Role" onChange={handleInputChange} />
      <input type="text" name="main_archetype" placeholder="Main Archetype" onChange={handleInputChange} />
      <input type="text" name="secondary_archetype" placeholder="Secondary Archetype" onChange={handleInputChange} />
      <input type="text" name="grandmaster_profession_one" placeholder="Grandmaster Profession One" onChange={handleInputChange} />
      <input type="text" name="grandmaster_profession_two" placeholder="Grandmaster Profession Two" onChange={handleInputChange} />
      <input type="number" name="min_level" placeholder="Min Level" onChange={handleInputChange} />
      <input type="number" name="max_level" placeholder="Max Level" onChange={handleInputChange} />
      <input type="number" name="min_ilvl" placeholder="Min Item Level" onChange={handleInputChange} />
      <input type="number" name="max_ilvl" placeholder="Max Item Level" onChange={handleInputChange} />
    </div>
  );
};

export default FilterBar;