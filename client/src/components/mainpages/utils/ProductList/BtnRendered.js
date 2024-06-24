import React, { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom';
const BtnRendered = ({product,isAdmin}) => {
    const state = useContext(GlobalState);
    const addCart =state.userAPI.addCart
  return (
    
      
      <div className="row_btn">
          {
            isAdmin ? 
          <>
          <Link id='#btn_buy' to={'#!'}>delete</Link>
          
          <Link id='#btn_view' to={`detail/${product._id}`}>edit</Link>
          </>
          :
          <>
          <Link id='#btn_buy' to={'#!'} onClick={()=> addCart(product)}>Buy Now</Link>
          
          <Link id='#btn_view' to={`detail/${product._id}`}>View</Link>
          </>
        }
        </div>
    
  )
}

export default BtnRendered
