import React, { useState } from 'react';
import './FilterBar.css';
import updateMember from '../../../Services/updateMember'; // Ajusta la ruta según sea necesario

const FilterBar = ({ filters, onFilterChange, onSort }) => {
  const [editingMember, setEditingMember] = useState({
    character_role: '',
    guild_role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingMember((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedMember = await updateMember(editingMember.id, editingMember);
      console.log('Member updated successfully:', updatedMember);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return (
    <div className="filter-bar">
      <label>
        Character Role:
        <select name="character_role" value={editingMember.character_role} onChange={handleChange}>
          <option value="">All</option>
          <option value="TANK">TANK</option>
          <option value="HEALER">HEALER</option>
          <option value="DAMAGE">DAMAGE</option>
          <option value="SUPPORT">SUPPORT</option>
        </select>
      </label>
      <input name="character_role" placeholder="Character Role" value={editingMember.character_role} onChange={handleChange} />
      <input name="guild_role" placeholder="Guild Role" value={editingMember.guild_role} onChange={handleChange} />
      <input name="mainArchetype" placeholder="Main Archetype" value={filters.mainArchetype} onChange={onFilterChange} />
      <input name="secondaryArchetype" placeholder="Secondary Archetype" value={filters.secondaryArchetype} onChange={onFilterChange} />
      <input name="grandmasterProfessions" placeholder="Grandmaster Professions" value={filters.grandmasterProfessions} onChange={onFilterChange} />
      <input name="minLevel" type="number" placeholder="Min Level" value={filters.minLevel} onChange={onFilterChange} />
      <input name="maxLevel" type="number" placeholder="Max Level" value={filters.maxLevel} onChange={onFilterChange} />
      <input name="minItemLevel" type="number" placeholder="Min Item Level" value={filters.minItemLevel} onChange={onFilterChange} />
      <input name="maxItemLevel" type="number" placeholder="Max Item Level" value={filters.maxItemLevel} onChange={onFilterChange} />
      <button onClick={() => onSort('characterRole', 'asc')}>Sort by Character Role Asc</button>
      <button onClick={() => onSort('characterRole', 'desc')}>Sort by Character Role Desc</button>
      <button onClick={() => onSort('guildRole', 'asc')}>Sort by Guild Role Asc</button>
      <button onClick={() => onSort('guildRole', 'desc')}>Sort by Guild Role Desc</button>
      <button onClick={() => onSort('mainArchetype', 'asc')}>Sort by Main Archetype Asc</button>
      <button onClick={() => onSort('mainArchetype', 'desc')}>Sort by Main Archetype Desc</button>
      <button onClick={() => onSort('secondaryArchetype', 'asc')}>Sort by Secondary Archetype Asc</button>
      <button onClick={() => onSort('secondaryArchetype', 'desc')}>Sort by Secondary Archetype Desc</button>
      <button onClick={() => onSort('grandmasterProfessions', 'asc')}>Sort by Grandmaster Professions Asc</button>
      <button onClick={() => onSort('grandmasterProfessions', 'desc')}>Sort by Grandmaster Professions Desc</button>
      <button onClick={() => onSort('level', 'asc')}>Sort by Level Asc</button>
      <button onClick={() => onSort('level', 'desc')}>Sort by Level Desc</button>
      <button onClick={() => onSort('itemLevel', 'asc')}>Sort by Item Level Asc</button>
      <button onClick={() => onSort('itemLevel', 'desc')}>Sort by Item Level Desc</button>
      <button onClick={handleUpdate}>Update Member</button>
    </div>
  );
};

export default FilterBar;