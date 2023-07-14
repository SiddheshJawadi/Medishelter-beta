import React, { useState, useEffect } from 'react'

import Navigation from './MainHeader/Navigation'
import { Link } from 'react-router-dom'
import './css/Navigation.css'
import './css/Patient.css'
import axios from 'axios'

const Patient = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/patient', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setName(response.data.name)
        setEmail(response.data.email)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <div className="welcome">
        <h1>Welcome {name}!</h1>
        <p>Thanks for visiting. Feel free to look around.</p>
      </div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/patient">Home</Link>
          </li>
          <li>
            <Link to="/patient/prescription">Prescription</Link>
          </li>
          <li>
            <Link to="/patient/report">Report</Link>
          </li>
          <li>
            <Link to="/patient/about">Edit Profile</Link>
          </li>
          <li>
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </nav> */}
      <div>
       <nav>
        <ul>
          <li>
            <Link to="/patient">Home</Link>
          </li>
          <li>
            <Link to="/blankprescription">Prescription</Link>
          </li>
          <li>
            <Link to="/patient/report">Report</Link>
          </li>
         
        
      <li>
      <div>
      <button onClick={handleClick}>
      <div className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
      {isMenuOpen && (
        <ul className="menu-options">
          <li>
            <Link to="/editprofile">
              Edit Profile
              
            </Link>
          </li>
          <li>
          <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
    </div>
    </li>
    </ul>
    </nav>
    </div>
    </div>
    
  )
}

export default Patient
