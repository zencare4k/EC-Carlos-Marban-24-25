import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        const sorted = [...products].sort((a, b) => b.likes - a.likes);
        setSortedProducts(sorted);
    }, [products]);

    const handleLikeUpdate = (updatedProduct) => {
        setSortedProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            const sorted = [...updatedProducts].sort((a, b) => b.likes - a.likes);
            return sorted;
        });
    };

    return (
        <div className="content-list">
            {sortedProducts.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={{ ...product, position: index + 1 }}
                    onAddToCart={onAddToCart}
                    onLikeUpdate={handleLikeUpdate}
                />
            ))}
        </div>
    );
};

export default ProductList;