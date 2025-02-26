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
import CostumerChat from './components/Home/CostumerChat'; // Importar el componente CostumerChat
import SupportPage from './components/Support/SupportPage'; // Importar el componente SupportPage
import FloatingWishlistIcon from './components/Layout/FloatingWishList'; // Importar el componente FloatingWishlistIcon
import { fetchProducts, addToMockupCart, getMockupCart, toggleWishlist } from './services/product_API'; // Importar toggleWishlist

const NotFound = () => <h2>404 Not Found</h2>;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(products => {
      setProducts(products);
      setFilteredProducts(products);
    });
  }, []);

  const handleAddToCart = (product) => {
    addToMockupCart(product);
    setCartItems(getMockupCart());
  };

  const handleAddToWishlist = (product) => {
    toggleWishlist(product.id);
    setProducts(prevProducts => {
      return prevProducts.map(p => 
        p.id === product.id ? { ...p, inWishlist: !p.inWishlist } : p
      );
    });
    setWishlistItems(prevItems => {
      const isInWishlist = prevItems.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevItems.filter(item => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
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
                <ContentList products={filteredProducts} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
              </>
            } />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/weather" element={<WeatherPage />} /> {/* Nueva ruta */}
            <Route path="/support" element={<SupportPage />} /> {/* Nueva ruta */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer>
          <Footer />
        </footer>

        <CostumerChat /> {/* Añadir el componente CostumerChat */}
        <FloatingWishlistIcon wishlistItems={wishlistItems} /> {/* Añadir el componente FloatingWishlistIcon */}
      </div>
    </Router>
  );
}

export default App;