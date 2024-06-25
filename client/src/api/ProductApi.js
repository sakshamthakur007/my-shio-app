import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductAPI = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        try {
            const response = await axios.get('https://my-shio-app.onrender.com/api/products');
            setProducts(response.data);
            setLoading(false);
            console.log('Products fetched:', response.data);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
        console.log('useEffect hook called');
    }, []);

    return {
        products: [products, setProducts],
        loading,
        error
    };
};

export default ProductAPI;
