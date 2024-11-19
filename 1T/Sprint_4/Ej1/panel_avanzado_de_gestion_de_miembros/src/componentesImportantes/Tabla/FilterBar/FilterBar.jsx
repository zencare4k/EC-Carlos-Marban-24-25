import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange, onSort }) => {
  return (
    <div className="filter-bar">
      <input name="characterRole" placeholder="Character Role" value={filters.characterRole} onChange={onFilterChange} />
      <input name="guildRole" placeholder="Guild Role" value={filters.guildRole} onChange={onFilterChange} />
      <input name="mainArchetype" placeholder="Main Archetype" value={filters.mainArchetype} onChange={onFilterChange} />
      <input name="secondaryArchetype" placeholder="Secondary Archetype" value={filters.secondaryArchetype} onChange={onFilterChange} />
      <input name="grandmasterProfessions" placeholder="Grandmaster Professions" value={filters.grandmasterProfessions} onChange={onFilterChange} />
      <input name="minLevel" type="number" placeholder="Min Level" value={filters.minLevel} onChange={onFilterChange} />
      <input name="maxLevel" type="number" placeholder="Max Level" value={filters.maxLevel} onChange={onFilterChange} />
      <input name="minItemLevel" type="number" placeholder="Min Item Level" value={filters.minItemLevel} onChange={onFilterChange} />
      <input name="maxItemLevel" type="number" placeholder="Max Item Level" value={filters.maxItemLevel} onChange={onFilterChange} />
      <button onClick={() => onSort('characterRole')}>Sort by Character Role</button>
      <button onClick={() => onSort('guildRole')}>Sort by Guild Role</button>
      <button onClick={() => onSort('mainArchetype')}>Sort by Main Archetype</button>
      <button onClick={() => onSort('secondaryArchetype')}>Sort by Secondary Archetype</button>
      <button onClick={() => onSort('grandmasterProfessions')}>Sort by Grandmaster Professions</button>
      <button onClick={() => onSort('level')}>Sort by Level</button>
      <button onClick={() => onSort('itemLevel')}>Sort by Item Level</button>
    </div>
  );
};

export default FilterBar;