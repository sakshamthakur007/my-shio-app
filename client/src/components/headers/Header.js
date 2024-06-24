import React ,{useContext} from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import {Link} from 'react-router-dom'
import './header.css'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
const Header = () => {
  const state = useContext(GlobalState);
  console.log("state",state);
  const [isLogged,setIsLogged] = state.userAPI.isLogged
  const [isAdmin,setIsAdmin] = state.userAPI.isAdmin
  const [cart,setCart] = state.userAPI.cart

  const logoutUser = async() => {
      await axios.get('/user/logout')

      localStorage.clear()
      setIsAdmin(false)
      setIsLogged(false)
  }


  const adminRouter = () => {
    return (
      <>
      <li><Link to='/create_product'>Create Product</Link></li>
      <li><Link to='/category'>Categories</Link></li>
      </>
    )
  }
  const loggedRouter = () => {
    return (
      <>
      <li><Link to='/history'>History</Link></li>
      <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }
  return (
    <header>
        <div className="menu">
            <MdOutlineMenu size={30}/>
        </div>
        <div className="logo">
            <h1>
               <Link to='/'>{isAdmin?'Admin':'MyShio'}</Link>
            </h1>
        </div>
        <ul>
          <li>
            <Link to ="/">{isAdmin?'Products':'Shop'}</Link>
          </li>
          {isAdmin && adminRouter()}
          {
            isLogged?loggedRouter():<li><Link to ="/login">Login or Register</Link></li>
          }
          
          <li>
            <MdClose size={30} className='menu'/>
          </li>
        </ul>

          {
            isAdmin ? '':<div className='cart-icon'>
            <span>{cart.length}</span>
            <Link to='/cart'><MdOutlineShoppingCart size={30}/></Link>
          </div>
          }

        
    </header>
  )
}

export default Header