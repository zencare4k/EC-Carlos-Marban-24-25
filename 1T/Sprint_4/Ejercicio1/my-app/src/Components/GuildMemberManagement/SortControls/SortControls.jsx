import React from "react";
import "./SortControls.css";

const SortControls = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    const [key, order] = e.target.value.split(":");
    onSortChange(key, order);
  };

  return (
    <div className="sort-bar">
      <label htmlFor="sort">Ordenar por:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="">Selecciona una opción</option>
        <option value="level:asc">Nivel (Ascendente)</option>
        <option value="level:desc">Nivel (Descendente)</option>
        <option value="ilvl:asc">iLvl (Ascendente)</option>
        <option value="ilvl:desc">iLvl (Descendente)</option>
        <option value="character_role:asc">Character Role (Ascendente)</option>
        <option value="character_role:desc">Character Role (Descendente)</option>
        <option value="guild_role:asc">Guild Role (Ascendente)</option>
        <option value="guild_role:desc">Guild Role (Descendente)</option>
      </select>
    </div>
  );
};

export default SortControls;