import React, { useState} from 'react'
import Axios from 'axios'
import './css/Registration.css'
import { Link } from 'react-router-dom'
import MainHeader from './MainHeader/MainHeader1'
import Foot from './Footer/Footer'

export default function Registration() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [contact, setContact] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [dob, setDob] = useState('')

  const handleMobileNumberChange = (event) => {
    const inputMobileNumber = event.target.value

    // Validate that the input value contains only digits and has a length of 10
    if (/^\d{10}$/.test(inputMobileNumber)) {
      setIsValid(true)
      setMobileNumber(inputMobileNumber)
    } else {
      setIsValid(false)
    }
  }

  const handleSubmit = (e) => {
    if (!isValid) {
      alert('Invalid phone number')
    }
    e.preventDefault()

    Axios.post('http://localhost:3000/register', {
      firstName: name,
      role: role,
      email: email,
      password: password,
      contact: mobileNumber,
      dob: dob,
    })
  }
  return (
    <>
    <div className='nav'><MainHeader /></div>
    <div className="logIn-form">
      <form onSubmit={handleSubmit}>
        <p>First Name</p>
        <input
          className="Name"
          type="text"
          name="name"
          placeholder="First name"
          onChange={(e) => {
            setName(e.target.value)
          }}
          required
        />

        <p> Company Role</p>
        {/* <input
          className="Role"
          type="text"
          name="role"
          placeholder="Role"
          onChange={(e) => {
            setRole(e.target.value)
          }}
        /> */}
        <select
          name="role"
          id="role"
          className="Role"
          onChange={(e) => {
            setRole(e.target.value)
          }}
          required
        >
          <option value="">Select a role</option>
          <option value={'Patient'}>Patient</option>
          <option value={'Doctor - Physician'}>Physician Doctor</option>
          <option value={'Doctor - Radiologist'}>Radiologist Doctor</option>
        </select>

        <p>Email</p>
        <input
          className="Email"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          required
        />

        <p>Password</p>
        <input
          className="Password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          required
        />

        <p>Contact Number</p>
        <input
          className="Contact"
          type="text"
          name="contact"
          placeholder="Contact Number"
          onChange={handleMobileNumberChange}
          required
        />

        <p>Date of Birth</p>
        <input
          className="DOB"
          type="text"
          name="dob"
          placeholder='Select Date'
          onChange={(e) => {
            setDob(e.target.value)
          }}
          onFocus={(e) => {(e.target.type = "date");
                          (e.target.placeholder="dd-mm-yyyy")}}
          onBlur={(e) => (e.target.type = "text")}

          required
        />

        <button type="submit">Submit</button>
        <div>
          <span>
            Already have an account?
            <br></br>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
    <div><Foot /></div>

    </>
  )
}
