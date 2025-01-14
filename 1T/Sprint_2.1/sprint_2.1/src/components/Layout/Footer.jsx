import React from 'react';
import '../../styles/layout.css';

const footer = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <img 
          src="/assets/images/Logo.svg" 
          alt="Logo de la aplicación" 
          className="logo-image"
        />
      </div>
      <nav className="nav-footer">
        <ul className="nav-list-footer">
          <li><a href="#home" className="nav-item-footer">Inicio</a></li>
          <li><a href="#about" className="nav-item-footer">Acerca de</a></li>
          <li><a href="#services" className="nav-item-footer">Servicios</a></li>
          <li><a href="#contact" className="nav-item-footer">Contacto</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default footer;
