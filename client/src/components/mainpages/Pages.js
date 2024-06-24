import React from 'react'
import Product from './products/Product'
import Login from './login/Login'
import Register from './login/Register'
import Cart from './cart/Cart'
import { Route, Routes } from 'react-router-dom'
import DetailProduct from './utils/detailProducts/DetailProduct'
import History from './cart/History'
const Pages = () => {
  return (
    <Routes>
      <Route path ='/' element ={<Product/>}></Route>
      <Route path ='/login' element={<Login/>}></Route>
      <Route path ='/cart' element={<Cart/>}></Route>
      <Route path ='/register' element={<Register/>}></Route>
      <Route path='/detail/:id' element={<DetailProduct/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/history' element={<History/>}></Route>
    </Routes>
  )
}

export default Pages
