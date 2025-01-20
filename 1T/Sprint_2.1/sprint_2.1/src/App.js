import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/NavBar';
import Herosection from './components/Home/HeroSection';
import ContentList from './components/Home/ProductList';
import ProductFilter from './components/Home/ProductFilter';
import CartPage from './components/Home/CartPage'; // Asegúrate de tener este componente
import { fetchProducts } from './components/services/product_API';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(products => {
      setProducts(products);
      setFilteredProducts(products);
    });
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleFilter = ({ name, minPrice, maxPrice }) => {
    const filtered = products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(name.toLowerCase());
      const matchesMinPrice = minPrice === "" || product.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === "" || product.price <= parseFloat(maxPrice);
      return matchesName && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredProducts(filtered);
  };

  return (
    <Router>
      <div>
        <header>
          <Header cartItems={cartItems} />
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Herosection />
                <ProductFilter onFilter={handleFilter} />
                <ContentList products={filteredProducts} onAddToCart={handleAddToCart} />
              </>
            } />
            <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          </Routes>
        </main>
        
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;