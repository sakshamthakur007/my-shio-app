// History.js
import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState'; 
import './history.css'; // Assuming you have a separate CSS file for styling

const History = () => {
    const state = useContext(GlobalState);
    const [cart] = state.userAPI.cart;

    return (
        <div className='history-page'>
            <h2>Purchase History</h2>
            {cart.length === 0 ? (
                <h4>No products in the cart</h4>
            ) : (
                <div className='history-container'>
                    {cart.map(product => (
                        <div className='history-card' key={product._id}>
                            <img src={product.images} alt={product.title} />
                            <div className='history-details'>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <span>${product.price}</span>
                                <span>Quantity: {product.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
