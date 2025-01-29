const mockProducts = [
    {
        id: 1,
        name: "Camiseta Naruto",
        description: "Camiseta de Naruto con 50% de descuento",
        price: "10.99€",
        originalPrice: "20.99€",
        discount: "50%",
        image: "/assets/products/image1.jpg",
        ratings: [],
        comments: []
    },
    {
        id: 2,
        name: "Camiseta Linkin Park",
        description: "Camiseta de Linkin Park con 10% de descuento",
        price: "18.89€",
        originalPrice: "20.99€",
        discount: "10%",
        image: "/assets/products/image2.jpg",
        ratings: [],
        comments: []
    },
    {
        id: 3,
        name: "Camiseta Limp Bizkit",
        description: "Camiseta de Limp Bizkit con 35% de descuento",
        price: "13.64€",
        originalPrice: "20.99€",
        discount: "35%",
        image: "/assets/products/image3.jpg",
        ratings: [],
        comments: []
    },
    {
        id: 4,
        name: "Camiseta Dragon Ball Z",
        description: "Camiseta de Dragon Ball Z con 95% de descuento",
        price: "1.05€",
        originalPrice: "20.99€",
        discount: "95%",
        image: "/assets/products/image4.jpg",
        ratings: [],
        comments: []
    },
    {
        id: 5,
        name: "Camiseta One Piece",
        description: "Camiseta de One Piece con 20% de descuento",
        price: "16.79€",
        originalPrice: "20.99€",
        discount: "20%",
        image: "/assets/products/image5.jpg",
        ratings: [],
        comments: []
    },
    {
        id: 6,
        name: "Camiseta Bleach",
        description: "Camiseta de Bleach con 30% de descuento",
        price: "14.69€",
        originalPrice: "20.99€",
        discount: "30%",
        image: "/assets/products/image6.jpeg",
        ratings: [],
        comments: []
    }
];

const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 1000); // Simula un retraso de 1 segundo
    });
};

export const addToMockupCart = (productConfig) => {
    const cart = getCartFromLocalStorage();
    cart.push(productConfig);
    saveCartToLocalStorage(cart);
};

export const getMockupCart = () => {
    return getCartFromLocalStorage();
};

export const addRating = (productId, rating) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        product.ratings.push(rating);
    }
};

export const addComment = (productId, comment) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        const existingComment = product.comments.find(c => c.id === comment.id);
        if (!existingComment) {
            const newComment = {
                id: Date.now(), // Genera un ID único basado en la marca de tiempo actual
                ...comment
            };
            product.comments.push(newComment);
        }
    }
};

export const likeComment = (productId, commentId) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        const comment = product.comments.find(c => c.id === commentId);
        if (comment) {
            comment.likes = (comment.likes || 0) + 1;
        }
    }
};

const api = {
    fetchProducts,
    addToMockupCart,
    getMockupCart,
    addRating,
    addComment,
    likeComment
};

export default api;