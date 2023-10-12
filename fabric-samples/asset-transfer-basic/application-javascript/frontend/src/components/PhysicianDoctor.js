import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './css/Navigation.css'
import './css/Patient.css'
import axios from 'axios'
import MainHeader from './MainHeader/MainHeader1'
import Foot from './Footer/Footer'

function RadiologistDoctor() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/physiciandoctor', {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleEditProfile = () => {
    localStorage.removeItem('token')
    window.location.href = '/editprofile'
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
              <Link to="/physicianDoctor">Home</Link>
            </li>
            <li>
              <Link to="/physicianDoctor/prescription">Prescription</Link>
            </li>
            <li>
              <Link to="/physicianDoctor/report">Report</Link>
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
                      <Link to="/editprofile">Edit Profile</Link>
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
