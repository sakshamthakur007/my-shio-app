import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './login.css'
const Login = () => {
  const [user ,setUser] = useState({
    email:'',
    password:''
  })
const onChangeInput = (e) => {
  e.preventDefault();
  const {name,value} =e.target;
  setUser({
    ...user,
    [name]:value
  })
}
const loginSubmit = async(e) => {
  e.preventDefault();
try {
   await axios.post('/user/login',{...user})

    localStorage.setItem('firstLogin',true)

    window.location.href = '/'


} catch (error) {
  alert (error.response.data.msg)
}
}
  return (
    <div className='login-page'>
        <form onSubmit={loginSubmit}>
          <input type="email" name="email" required placeholder='Email' value={user.email} onChange={onChangeInput}/>
          <input type="password" name="password" required placeholder='Password' value={user.password} onChange={onChangeInput}/>
          <div className="row">
            <button type='submit'>Login</button>
            <Link to='/register'>register</Link>
          </div>

        </form>
    </div>
  )
}

export default Login
