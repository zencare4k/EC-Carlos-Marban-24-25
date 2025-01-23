import React from "react";
import ProductCard from './ProductCard';
import '../../styles/products.css';

const ContentList = ({ products, onAddToCart }) => {
    return (
        <div className="content-list">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ContentList;