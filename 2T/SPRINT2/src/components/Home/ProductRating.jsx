import React, { useState, useEffect } from 'react';
import { addRating, addComment, likeComment } from '../../services/product_API';
import '../../styles/ProductRating.css';

const ProductRating = ({ product }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [topComment, setTopComment] = useState(null);

    useEffect(() => {
        setComments(product.comments || []);
        const top = product.comments.reduce((max, comment) => max.likes > comment.likes ? max : comment, { likes: 0 });
        setTopComment(top.likes > 0 ? top : null);
    }, [product]);

    const handleRating = (rate) => {
        setRating(rate);
        addRating(product.id, rate);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            id: Date.now(),
            text: comment,
            rating: rating,
            likes: 0
        };
        addComment(product.id, newComment);
        setComments(prevComments => {
            const updatedComments = [...prevComments, newComment];
            const top = updatedComments.reduce((max, comment) => max.likes > comment.likes ? max : comment, { likes: 0 });
            setTopComment(top.likes > 0 ? top : null);
            return updatedComments;
        });
        setComment('');
        setRating(0);
    };

    const handleLike = (commentId) => {
        likeComment(product.id, commentId);
        setComments(prevComments => {
            const updatedComments = prevComments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c);
            const top = updatedComments.reduce((max, comment) => max.likes > comment.likes ? max : comment, { likes: 0 });
            setTopComment(top.likes > 0 ? top : null);
            return updatedComments;
        });
    };

    return (
        <div className="product-rating">
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <div className="rating">
                    {[1, 2, 3, 4, 5].map(rate => (
                        <span
                            key={rate}
                            className={`star ${rate <= rating ? 'selected' : ''}`}
                            onClick={() => handleRating(rate)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                />
                <button type="submit">Enviar</button>
            </form>
            {topComment && (
                <div className="top-comment">
                    <h3>Comentario destacado</h3>
                    <div className="comment-rating">
                        {[1, 2, 3, 4, 5].map(rate => (
                            <span
                                key={rate}
                                className={`star ${rate <= topComment.rating ? 'selected' : ''}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p>{topComment.text}</p>
                    <button onClick={() => handleLike(topComment.id)}>Me gusta ({topComment.likes})</button>
                </div>
            )}
            <ul className="comments-list">
                {comments.filter(c => c.id !== topComment?.id).map(c => (
                    <li key={c.id} className="comment-item">
                        <div className="comment-rating">
                            {[1, 2, 3, 4, 5].map(rate => (
                                <span
                                    key={rate}
                                    className={`star ${rate <= c.rating ? 'selected' : ''}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p>{c.text}</p>
                        <button onClick={() => handleLike(c.id)}>Me gusta ({c.likes})</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductRating;