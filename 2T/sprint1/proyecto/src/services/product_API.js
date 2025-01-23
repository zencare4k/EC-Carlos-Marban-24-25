const mockProducts = [
    {
        id: 1,
        name: "Camiseta Naruto",
        description: "Camiseta de Naruto con 50% de descuento",
        price: "10.99€",
        originalPrice: "20.99€",
        discount: "50%",
        image: "/assets/products/image1.jpg"
    },
    {
        id: 2,
        name: "Camiseta Linkin Park",
        description: "Camiseta de Linkin Park con 10% de descuento",
        price: "18.89€",
        originalPrice: "20.99€",
        discount: "10%",
        image: "/assets/products/image2.jpg"
    },
    {
        id: 3,
        name: "Camiseta Limp Bizkit",
        description: "Camiseta de Limp Bizkit con 35% de descuento",
        price: "13.64€",
        originalPrice: "20.99€",
        discount: "35%",
        image: "/assets/products/image3.jpg"
    },
    {
        id: 4,
        name: "Camiseta Dragon Ball Z",
        description: "Camiseta de Dragon Ball Z con 95% de descuento",
        price: "1.05€",
        originalPrice: "20.99€",
        discount: "95%",
        image: "/assets/products/image4.jpg"
    }
];

// Simula una llamada a una API para obtener los productos
export const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 1000); // Simula un retraso de 1 segundo
    });
};

export default fetchProducts;