import React from 'react';
import './SortControls.css';
const SortControls = ({ sortConfig, onSortChange }) => {
  const handleSortChange = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange(key, direction);
  };

  return (
    <div>
      <button onClick={() => handleSortChange('username')}>Sort by Username</button>
      <button onClick={() => handleSortChange('level')}>Sort by Level</button>
      <button onClick={() => handleSortChange('ilvl')}>Sort by Item Level</button>
      {/* Add more sort buttons as needed */}
    </div>
  );
};

export default SortControls;