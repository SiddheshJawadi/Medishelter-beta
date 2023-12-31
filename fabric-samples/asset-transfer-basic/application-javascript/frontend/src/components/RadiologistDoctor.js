import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './css/Navigation.css'
import './css/Patient.css'
import MainHeader from './MainHeader/MainHeader1'
import Foot from './Footer/Footer'

function RadiologistDoctor() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/radiologistdoctor', {
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
  const handleEditProfile = () => {
    localStorage.removeItem('token')
    window.location.href = '/editprofile'
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
    <div className='nav'><MainHeader /></div>
    <div>
      <div>
        <div class="welcome">
          <h1>Welcome Dr. {name}!</h1>
          <p>Thanks for visiting. Feel free to look around.</p>
        </div>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/reportDoctor">Home</Link>
            </li>
            <li>
              <Link to="/reportDoctor/upload">Report</Link>
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
                    <button onClick={handleEditProfile}>Edit Profile</button>
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
    </>
  )
}

export default RadiologistDoctor
