import React, { useState } from 'react'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import './css/Login.css'
import { Link } from 'react-router-dom'
import Button from './Button/Button'
import MainHeader from './MainHeader/MainHeader1'
import Foot from './Footer/Footer'
import Lanpic from './Lanpic.png';




const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      })
      if (response.data.token) {
        const decoded = jwt_decode(response.data.token)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', decoded.id)
        if (response.data.role === 'Patient') {
          window.location.href = '/patient'
        } else if (response.data.role === 'Doctor - Radiologist') {
          window.location.href = '/reportDoctor'

        } 
        else if (response.data.role === 'Doctor - Physician') {
          window.location.href = '/physicianDoctor'

        } 
        else {
          window.location.href = '/home'
        }
      } else {
        alert('Incorrect Password')
      }
    } catch (error) {
      alert('An error occurred while logging in.')
      console.log(error)
    }
  }

  return (
    <>
    
    <div className='nav'><MainHeader /></div>
    <div className='pic'><img src={Lanpic}/></div>
    <div className='form-box'>
    <div className="logIn-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ color:'grey',margin: '10px',textAlign:'center',fontSize: '18px',fontWeight:'600',width: 'fit-content',marginLeft:'100px' }} htmlFor="email">
            Email
          </label>
          <input
            style={{ marginLeft: '30px',marginTop:'8px',marginBottom:'18px' }}
            className="Email"
            type="text"
            name="email"
            placeholder="abc@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
          />
        </div>
        <div>
          <label style={{color:'grey',margin: '10px',textAlign:'center',fontSize: '18px',fontWeight:'600',width: 'fit-content',marginLeft:'85px'  }} htmlFor="password">Password </label>
          <input
            style={{  marginLeft: '30px',marginTop:'8px',marginBottom:'18px' }}
            className="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
          />
        </div>

        <div>
          <Button type="submit">Login</Button>
        </div>
        <div>
          <span style={{ margin: '8px' }}>
            Don't have an account?
            <br />
            <Link to="/registration" tabIndex={5}>
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
    </div>
    <div><Foot /></div>
    </>
  )
}

export default Login
