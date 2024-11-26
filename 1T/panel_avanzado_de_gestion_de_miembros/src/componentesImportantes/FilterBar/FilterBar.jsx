import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters = {}, onFilterChange, onSort, onSelectAll, onApplyFilters }) => {
  const handleSortChange = (e) => {
    const { name, value } = e.target;
    onSort(name, value);
  };

  return (
    <div className="filter-bar">
      <label>
        <input type="checkbox" onChange={onSelectAll} /> Select All
      </label>
      <label>
        Character Role:
        <select name="characterRole" value={filters.characterRole} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="TANK">TANK</option>
          <option value="HEALER">HEALER</option>
          <option value="DAMAGE">DAMAGE</option>
          <option value="SUPPORT">SUPPORT</option>
        </select>
      </label>
      <label>
        Guild Role:
        <select name="guildRole" value={filters.guildRole} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="LIDER">LIDER</option>
          <option value="GERENTE SENIOR">GERENTE SENIOR</option>
          <option value="GERENTE">GERENTE</option>
          <option value="GERENTE A2">GERENTE A2</option>
          <option value="ALPHA 2">ALPHA 2</option>
          <option value="MEMBER">MEMBER</option>
        </select>
      </label>
      <label>
        Main Archetype:
        <select name="mainArchetype" value={filters.mainArchetype} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="BARD">BARD</option>
          <option value="CLERIC">CLERIC</option>
          <option value="FIGHTER">FIGHTER</option>
          <option value="MAGE">MAGE</option>
          <option value="RANGER">RANGER</option>
          <option value="ROGUE">ROGUE</option>
          <option value="SUMMONER">SUMMONER</option>
          <option value="TANK">TANK</option>
        </select>
      </label>
      <label>
        Secondary Archetype:
        <select name="secondaryArchetype" value={filters.secondaryArchetype} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="BARD">BARD</option>
          <option value="CLERIC">CLERIC</option>
          <option value="FIGHTER">FIGHTER</option>
          <option value="MAGE">MAGE</option>
          <option value="RANGER">RANGER</option>
          <option value="ROGUE">ROGUE</option>
          <option value="SUMMONER">SUMMONER</option>
          <option value="TANK">TANK</option>
        </select>
      </label>
      <label>
        Grandmaster Professions:
        <select name="grandmasterProfessions" value={filters.grandmasterProfessions} onChange={onFilterChange}>
          <option value="">All</option>
          <option value="FISHING">FISHING</option>
          <option value="HERBALISM">HERBALISM</option>
          <option value="HUNTING">HUNTING</option>
          <option value="LUMBERJACKING">LUMBERJACKING</option>
          <option value="MINING">MINING</option>
          <option value="ALCHEMY">ALCHEMY</option>
          <option value="ANIMALHUSBANDRY">ANIMALHUSBANDRY</option>
          <option value="COOKING">COOKING</option>
          <option value="FARMING">FARMING</option>
          <option value="LUMBERMILLING">LUMBERMILLING</option>
          <option value="METALWORKING">METALWORKING</option>
          <option value="STONECUTTING">STONECUTTING</option>
          <option value="TANNING">TANNING</option>
          <option value="WEAVING">WEAVING</option>
          <option value="ARCANEENGINEERING">ARCANEENGINEERING</option>
          <option value="ARMORSMITHING">ARMORSMITHING</option>
          <option value="CARPENTRY">CARPENTRY</option>
          <option value="JEWELCUTTING">JEWELCUTTING</option>
          <option value="LEATHERWORKING">LEATHERWORKING</option>
          <option value="SCRIBE">SCRIBE</option>
          <option value="TAILORING">TAILORING</option>
          <option value="WEAPONSMITHING">WEAPONSMITHING</option>
        </select>
      </label>
      <input name="minLevel" type="number" placeholder="Min Level" value={filters.minLevel} onChange={onFilterChange} />
      <input name="maxLevel" type="number" placeholder="Max Level" value={filters.maxLevel} onChange={onFilterChange} />
      <input name="minItemLevel" type="number" placeholder="Min Item Level" value={filters.minItemLevel} onChange={onFilterChange} />
      <input name="maxItemLevel" type="number" placeholder="Max Item Level" value={filters.maxItemLevel} onChange={onFilterChange} />
      <label>
        Sort By:
        <select name="sortBy" onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="level">Level</option>
          <option value="itemLevel">Item Level</option>
        </select>
      </label>
      <button onClick={onApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;
