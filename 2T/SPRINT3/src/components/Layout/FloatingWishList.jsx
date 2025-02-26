import React, { useState } from 'react';
import Wishlist from './Wishlist';
import '../../styles/FloatingWishlistIcon.css';

const FloatingWishlistIcon = ({ wishlistItems }) => {
  const [showWishlist, setShowWishlist] = useState(false);

  const handleWishlistIconClick = () => {
    setShowWishlist(!showWishlist);
  };

  return (
    <div>
      <div className="floating-wishlist-icon" onClick={handleWishlistIconClick}>
        <img src="/assets/icons/Wishlist.png" alt="Lista de deseos" />
      </div>
      {showWishlist && <Wishlist wishlistItems={wishlistItems} setShowWishlist={setShowWishlist} />}
    </div>
  );
};

export default FloatingWishlistIcon;