import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/NavBar';
import Herosection from './components/Home/HeroSection';
import ContentList from './components/Home/ProductList';
import ProductFilter from './components/Home/ProductFilter';
import CartPage from './components/Home/CartPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm';
import WeatherPage from './components/AEMET/WeatherPage'; // Importar el nuevo componente
import { fetchProducts } from './services/product_API';

const NotFound = () => <h2>404 Not Found</h2>;

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
      const price = parseFloat(product.price.replace('€', ''));
      const matchesMinPrice = minPrice === "" || price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === "" || price <= parseFloat(maxPrice);
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
                <ProductFilter products={products} onFilter={handleFilter} />
                <ContentList products={filteredProducts} onAddToCart={handleAddToCart} />
              </>
            } />
            <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/weather" element={<WeatherPage />} /> {/* Nueva ruta */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
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