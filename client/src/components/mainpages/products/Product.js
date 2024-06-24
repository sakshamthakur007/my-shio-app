import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './product.css'
import ProductList from '../utils/ProductList/ProductList';
import { GlobalState } from '../../../GlobalState';
const Product = () => {
    const [products, setProducts] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    
    useEffect(() => {
        const fetchProducts = async () => {
            axios.get('/api/products')
                .then(response => {
                setProducts(response.data); // Assuming response.data is an array of products
                setLoading(false);
             })
                .catch(error => {
                setError(error);
                setLoading(false);
            });
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='products'>      
        {
          products.map(product => {
            return <ProductList key={product._id} product={product} isAdmin={isAdmin}/>
          })
        }      
      </div>
    );
};

export default Product;
