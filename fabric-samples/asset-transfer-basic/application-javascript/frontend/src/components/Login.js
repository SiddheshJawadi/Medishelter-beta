import React, { useState } from 'react'
import Button from './Button/Button'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import './css/Login.css'
import { Link } from 'react-router-dom'

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
          window.location.href = '/radiologistdoctor'

        } 
        else if (response.data.role === 'Doctor - Physician') {
          window.location.href = '/physiciandoctor'

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
    <div className="logIn-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ margin: '8px' }} htmlFor="email">
            Email:
          </label>
          <input
            style={{ margin: '8px' }}
            className="Email"
            type="text"
            name="email"
            placeholder="Email ..."
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            style={{ margin: '8px' }}
            className="Password"
            type="password"
            name="password"
            placeholder="Password ..."
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
            <Link to="/registration" tabIndex={5}>
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Login
