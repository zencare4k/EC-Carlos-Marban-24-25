import React from 'react';
import '../../styles/layout.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img 
          src="/assets/images/Logo.svg" 
          alt="Logo de la aplicación" 
          className="logo-image"
        />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><a href="#home" className="nav-item">Inicio</a></li>
          <li><a href="#about" className="nav-item">Acerca de</a></li>
          <li><a href="#services" className="nav-item">Servicios</a></li>
          <li><a href="#contact" className="nav-item">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
