import React, { useState } from 'react';
import '../../styles/layout.css';
import CartPreview from '../Home/CartPreview';

const Header = ({ cartItems }) => {
  const [showCartPreview, setShowCartPreview] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img 
          src="/assets/icons/Logo.svg" 
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
      <div 
        className="cart-container"
        onMouseEnter={() => setShowCartPreview(true)}
        onMouseLeave={() => setShowCartPreview(false)}
      >
        <img 
          src="/assets/icons/Carrito.svg" 
          alt="Carrito de compras" 
          className="cart-icon"
        />
        {showCartPreview && <CartPreview cartItems={cartItems} setShowCartPreview={setShowCartPreview} />}
      </div>
      <button 
        className="login-button" 
        onClick={() => window.location.href = '/login'}
      >
        <img 
          src="/assets/icons/IniciarSesion.svg" 
          alt="Login" 
          className="login-icon"
        />
      </button>
    </header>
  );
};

export default Header;