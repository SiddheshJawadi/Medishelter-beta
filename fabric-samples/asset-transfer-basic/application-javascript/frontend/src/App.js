import './App.css'
import React from 'react'
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
// import Foot from './components/Footer/Footer'

function App() {
  return (
    <>
      <div>
        {/* <MainHeader /> */}
        <div>
          <Router>
            <Routes>
              <Route path="/registration" element={<Registration />} />
              {/* Render Login component only on the /login route */}
              <Route path="/login" element={<Login />} />
              {/* Render Home component for all other routes */}
              <Route path="" element={<Home />} />
              <Route path="/patient" element={<Patient />} />
              <Route path="/patient/report" element={<PatientReports />} />
              <Route path="/patient/presciption" element={<></>} />
              <Route path="/reportDoctor" element={<RadiologistDoctor />} />
              <Route path="/reportDoctor/upload" element={<ReportDoctor />} />
              <Route path="/physicianDoctor" element={<PhysicianDoctor />} />
              <Route path="/physicianDoctor/prescription" element={<Prescription />} />
              <Route path="/physicianDoctor/report" element={<></>} />
            </Routes>
          </Router>
        </div>
        {/* <Foot /> */}
      </div>
    </>
  )
}

export default App
