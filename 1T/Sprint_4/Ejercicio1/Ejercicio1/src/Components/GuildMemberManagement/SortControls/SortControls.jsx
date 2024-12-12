import React from "react";
import "./SortControls.css";

const SortControls = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    const [key, order] = e.target.value.split(":");
    onSortChange(key, order);
  };

  return (
    <div className="sort-bar">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="">Select an option</option>
        <option value="level:asc">Level (Ascending)</option>
        <option value="level:desc">Level (Descending)</option>
        <option value="ilvl:asc">iLvl (Ascending)</option>
        <option value="ilvl:desc">iLvl (Descending)</option>
        <option value="character_role:asc">Character Role (Ascending)</option>
        <option value="character_role:desc">Character Role (Descending)</option>
        <option value="guild_role:asc">Guild Role (Ascending)</option>
        <option value="guild_role:desc">Guild Role (Descending)</option>
      </select>
    </div>
  );
};

export default SortControls;