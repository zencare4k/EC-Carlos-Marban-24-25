import React, { useState, useEffect } from 'react';
import { valorateProduct } from '../../services/product_API';
import '../../styles/ProductRating.css';

const ProductRating = ({ product, onLikeUpdate }) => {
    const [likes, setLikes] = useState(product.likes);
    const [hasLiked, setHasLiked] = useState(product.hasLiked || false);

    useEffect(() => {
        setLikes(product.likes);
        setHasLiked(product.hasLiked || false);
    }, [product.likes, product.hasLiked]);

    const handleLike = () => {
        valorateProduct(product.id).then(newLikes => {
            setLikes(newLikes);
            setHasLiked(!hasLiked);
            onLikeUpdate({ ...product, likes: newLikes, hasLiked: !hasLiked });
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="product-rating">
            <button onClick={handleLike} className={`like-button ${hasLiked ? 'unlike' : 'like'}`}>
                {hasLiked ? 'Unlike' : 'Like'}
            </button>
            <span className="likes-count">{likes} likes</span>
        </div>
    );
};

export default ProductRating;