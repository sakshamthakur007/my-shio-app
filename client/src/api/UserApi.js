import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UserApi = (token) => {

    const [isLogged,setIsLogged] = useState(false);
    const [isAdmin ,setIsAdmin] = useState(false);
    const [cart,setCart] = useState([])
    useEffect(()=>{
        if(token){

            const getUser = async() => {
                try{
                    const res = await axios.get('https://my-shio-app.onrender.com/user/info',{
                        headers:{Authorization:token}
                    })
                    setIsLogged(true)
                    console.log("set true");
                    res.data.role === 1 ? setIsAdmin(true):setIsAdmin(false);
                }
                catch(err){
                    alert (err.response.data.msg)
                }
            }
            
            getUser()
        }
        
},[token])
    const addCart = async (product) => {
        if(!isLogged) return alert ( "PLEASE LOGIN ")

    const check = cart.every(item => {
        return item.id !==product._id
    })
    if(check){
        setCart([...cart,{...product,quantity:1}])
    }
    else {
        alert ("This Product has been already to cart ")
    }
  }
  return {
    
      isLogged:[isLogged,setIsLogged],
      isAdmin:[isAdmin,setIsAdmin],
      cart:[cart,setCart],
      addCart:addCart
  }
}

export default UserApi
