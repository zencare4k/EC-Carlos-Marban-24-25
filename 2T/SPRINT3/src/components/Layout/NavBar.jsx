import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout.css';
import CartPreview from '../Home/CartPreview';

const Header = ({ cartItems }) => {
  const [showCartPreview, setShowCartPreview] = useState(false);

  const handleCartIconClick = () => {
    setShowCartPreview(!showCartPreview);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img 
            src="/assets/icons/Logo.svg" 
            alt="Logo de la aplicación" 
            className="logo-image"
          />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/" className="nav-item">Inicio</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Hombre</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Mujer</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Niño</Link></li>
          <li><Link to="/404" className="nav-item">Camisetas Niña</Link></li>
          <li><Link to="/support" className="nav-item">Contacto</Link></li> {/* Actualizado */}
          <li><Link to="/weather" className="nav-item">Weather</Link></li> {/* Nueva opción */}
        </ul>
      </nav>
      <div className="cart-container">
        <img 
          src="/assets/icons/Carrito.svg" 
          alt="Carrito de compras" 
          className="cart-icon"
          onClick={handleCartIconClick}
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