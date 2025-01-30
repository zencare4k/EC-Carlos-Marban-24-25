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
        if (!hasLiked) {
            valorateProduct(product.id).then(newLikes => {
                setLikes(newLikes);
                setHasLiked(true);
                onLikeUpdate({ ...product, likes: newLikes, hasLiked: true });
            }).catch(error => {
                console.error(error);
            });
        }
    };

    return (
        <div className="product-rating">
            <button onClick={handleLike} className="like-button" disabled={hasLiked}>
                {hasLiked ? 'Liked' : 'Like'}
            </button>
            <span className="likes-count">{likes} likes</span>
        </div>
    );
};

export default ProductRating;