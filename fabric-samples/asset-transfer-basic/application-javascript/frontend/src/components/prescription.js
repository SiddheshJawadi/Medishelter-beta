import React, { useState, useRef } from 'react'
import Axios from 'axios'
import './css/Navigation.css'
import './css/Prescription.css'
import './css/Patient.css'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function MedicineField({ id, onChange }) {
  const [medicineName, setMedicineName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [usage, setUsage] = useState('')

  const handleMedicineNameChange = (e) => {
    setMedicineName(e.target.value)
    onChange(id, { id, medicineName: e.target.value, quantity, usage })
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
    onChange(id, { id, medicineName, quantity: e.target.value, usage })
  }

  const handleUsageChange = (e) => {
    setUsage(e.target.value)
    onChange(id, { id, medicineName, quantity, usage: e.target.value })
  }

  return (
    <div>
      <input
        type="text"
        value={medicineName}
        onChange={handleMedicineNameChange}
        placeholder="Medicine Name"
      />
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        placeholder="Quantity"
      />
      <input
        type="text"
        value={usage}
        onChange={handleUsageChange}
        placeholder="Usage"
      />
    </div>
  )
}

function App() {
  const [patientName, setPatientName] = useState('')
  const [email, setEmail] = useState('')
  const [medicines, setMedicines] = useState([
    { id: 1, medicineName: '', quantity: '', usage: '' },
  ])
  const [remarks, setRemarks] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const formRef = useRef(null)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handlePatientNameChange = (e) => {
    setPatientName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleMedicineChange = (id, medicine) => {
    setMedicines((medicines) => {
      return medicines.map((m) => {
        if (m.id === id) {
          return medicine
        } else {
          return m
        }
      })
    })
  }

  const handleAddMedicine = () => {
    const newMedicine = {
      id: uuidv4(),
      medicineName: '',
      quantity: '',
      usage: '',
    }
    setMedicines([...medicines, newMedicine])
    formRef.current.style.height = `${formRef.current.scrollHeight}px`
  }

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ patientName, email, medicines, remarks }, 'medicine status')
    Axios.post('http://localhost:3000/prescription', {
      patientName: patientName,
      email: email,
      medicines: medicines,
      remarks: remarks,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/physiciandoctor">Home</Link>
            </li>
            <li>
              <Link to="/physiciandoctor/prescription">Prescription</Link>
            </li>
            <li>
              <Link to="/blankreport">Report</Link>
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

      <div className="prescription-form" ref={formRef}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Patient Name:</label>
            <input
              type="text"
              value={patientName}
              onChange={handlePatientNameChange}
              placeholder="Patient Name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </div>
          <div>
            <label>Medicine:</label>
            {medicines.map((medicine) => (
              <MedicineField
                key={medicine.id}
                id={medicine.id}
                onChange={handleMedicineChange}
              />
            ))}
            <button type="button" onClick={handleAddMedicine}>
              Add Medicine
            </button>
          </div>
          <div>
            <label>Remarks:</label>
            <textarea
              value={remarks}
              onChange={handleRemarksChange}
              placeholder="Remarks"
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
