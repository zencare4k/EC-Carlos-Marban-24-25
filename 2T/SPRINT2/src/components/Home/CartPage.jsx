import React, { useState, useEffect } from "react";
import '../../styles/CartPage.css';
import { getMockupCart } from '../../services/product_API';
import UserSurvey from './UserSurvey';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getMockupCart());
    }, []);

    // Agrupar productos por id y contar la cantidad
    const groupedItems = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id && i.color === item.color && i.tamaño === item.tamaño);
        if (existingItem) {
            existingItem.quantity += item.cantidad;
        } else {
            acc.push({ ...item, quantity: item.cantidad });
        }
        return acc;
    }, []);

    const handleSurveySubmit = (surveyData) => {
        console.log('Encuesta enviada:', surveyData);
        // Aquí puedes manejar el envío de la encuesta, por ejemplo, enviándola a un servidor
    };

    return (
        <div className="cart-page">
            <h2>Carrito de Compras</h2>
            {groupedItems.length === 0 ? (
                <p className="empty-cart">El carrito está vacío</p>
            ) : (
                <ul>
                    {groupedItems.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p className="cart-item-name">{item.name}</p>
                                <p className="cart-item-price">{item.price}</p>
                                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                                <p className="cart-item-config">Color: {item.color}, Tamaño: {item.tamaño}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <UserSurvey onSubmit={handleSurveySubmit} />
        </div>
    );
};

export default CartPage;