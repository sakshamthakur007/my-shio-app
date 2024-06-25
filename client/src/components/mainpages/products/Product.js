import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './product.css'
import ProductList from '../utils/ProductList/ProductList';
import { GlobalState } from '../../../GlobalState';
const Product = () => {
    const [loading, setLoading] = useState(true);
    const [error] = useState(null);
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const { productsAPI} = state;
    const [products] = productsAPI.products;
    useEffect(() => {
        if(products){
          setLoading(false);
        }
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
