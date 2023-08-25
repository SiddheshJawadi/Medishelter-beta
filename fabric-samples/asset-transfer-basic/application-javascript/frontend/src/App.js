import './App.css'
import React from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import Registration from './components/Registration'
import Login from './components/Login'
import Home from './components/home'
import Patient from './components/Patient'
import RadiologistDoctor from './components/RadiologistDoctor'
import ReportDoctor from './components/ReportDoctor'
import PatientReports from './components/PatientReports'
import Prescription from './components/prescription'
import PhysicianDoctor from './components/PhysicianDoctor'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Foot from './components/Footer/Footer'

function App() {
  return (
    <>
      <div>
        <MainHeader />
        <div>
          <Router>
            <Routes>
              <Route path="/registration" element={<Registration />} />
              {/* Render Login component only on the /login route */}
              <Route path="/login" element={<Login />} />
              <Route path="/patient/report" element={<PatientReports />} />
              {/* Render Home component for all other routes */}
              <Route path="" element={<Home />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/radiologistdoctor" element={<RadiologistDoctor />} />
              <Route path="/physiciandoctor" element={<PhysicianDoctor />} />
              <Route path="/reportdoctor" element={<ReportDoctor />} />
              <Route path="/physiciandoctor/prescription" element={<Prescription />} />
            </Routes>
          </Router>
        </div>
        <Foot />
      </div>
    </>
  )
}

export default App
