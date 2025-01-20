import React, { useState } from "react";
import '../../styles/products.css';

const ProductFilter = ({ onFilter }) => {
    const [name, setName] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleFilter = () => {
        onFilter({ name, minPrice, maxPrice });
    };

    const handleClear = () => {
        setName("");
        setMinPrice("");
        setMaxPrice("");
        onFilter({ name: "", minPrice: "", maxPrice: "" });
    };

    return (
        <div className="product-filter">
            <input
                type="text"
                placeholder="Nombre de la camiseta"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Precio mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Precio máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={handleFilter}>Filtrar</button>
            <button onClick={handleClear}>Limpiar</button>
        </div>
    );
};

export default ProductFilter;