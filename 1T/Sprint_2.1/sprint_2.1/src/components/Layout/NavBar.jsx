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
          <li><a href="#ManShirt" className='nav-item'>Camisetas Hombre</a></li>
          <li><a href="#WomenShirt" className='nav-item'>Camisetas Mujer</a></li>
          <li><a href="#BoyShirt" className='nav-item'>Camisetas Niño</a></li>
          <li><a href="#GirlShirt" className='nav-item'>Camisetas Niña</a></li>
          <li><a href="#contact" className="nav-item">Contacto</a></li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
