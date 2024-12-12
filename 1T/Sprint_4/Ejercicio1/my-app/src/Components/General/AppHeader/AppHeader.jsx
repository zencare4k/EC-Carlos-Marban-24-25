import React from 'react';
import { Link } from 'react-router-dom';
import './AppHeader.css';

const AppHeader = () => {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/members">Members</Link></li>
          <li><Link to="/parties">Parties</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;