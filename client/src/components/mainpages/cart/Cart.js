import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom';
import './cart.css'
const Cart = () => {
  const state = useContext(GlobalState);
  const [cart,setCart] =state.userAPI.cart;
  
  if(cart.lenght === 0)
    return <h2 style= {{textAlign:"center",fontSize:"5rem"}}>Cart Empty</h2>
  return (
    <div>
     { cart.map(product => (
        <div className='detail'>
        <img src={product.images} alt=''/>
        <div className="box-detail">
          <div className="row">
              <h2>{product.title}</h2>
              <h6>{product.product_id}</h6>
          </div>
          <span>${product.price}</span>
          <span>{product.description}</span>
          <p>{product.content}</p>
          <p>Sold:{product.sold}</p>
          <Link to='/cart' className='cart'>Buy Now</Link>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Cart
