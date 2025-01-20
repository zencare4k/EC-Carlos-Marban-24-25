import React from "react";
import '../../styles/products.css';

const CartPage = ({ cartItems }) => {
    // Agrupar productos por id y contar la cantidad
    const groupedItems = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    return (
        <div className="cart-page">
            <h2>Carrito de Compras</h2>
            {groupedItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {groupedItems.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p className="cart-item-name">{item.name}</p>
                                <p className="cart-item-price">{item.price}</p>
                                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartPage;