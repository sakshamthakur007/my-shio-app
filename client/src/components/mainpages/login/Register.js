import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './register.css'
const Register = () => {
  const [user ,setUser] = useState({
    name:'',
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
const registerSubmit = async(e) => {
  e.preventDefault();
try {
   await axios.post('https://my-shio-app.onrender.com/user/register',{...user})

    localStorage.setItem('firstRegister',true)

    window.location.href = '/'


} catch (error) {
  alert (error.response.data.msg)
}
}
  return (
    <div className='register-page'>
        <form onSubmit={registerSubmit}>
        <input type="name" name="name" required placeholder='Name' value={user.name} onChange={onChangeInput}/>

          <input type="email" name="email" required placeholder='Email' value={user.email} onChange={onChangeInput}/>
          <input type="password" name="password" required placeholder='Password' value={user.password} onChange={onChangeInput}/>
          <div className="row">
            <button type='submit'>Register</button>
            <Link to='/login'>login</Link>
          </div>

        </form>
    </div>
  )
}

export default Register
