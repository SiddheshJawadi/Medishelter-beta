import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './css/Navigation.css'
import './css/reportsdwnload.css'
import { Link } from 'react-router-dom'
function Reports() {
  const [reports, setReports] = useState([])
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/patient/reports', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setReports(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const downloadFile = (filename) => {
    const token = localStorage.getItem('token')
    axios
      .get(`http://localhost:3000/patient/reports/${filename}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div>
    <nav>
     <ul>
       <li>
         <Link to="/patient">Home</Link>
       </li>
       <li>
         <Link to="/download">Prescription</Link>
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
 
    
    <div >
      <div class="centered-container">
  <h1>Reports</h1>
</div>
      <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Filename</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report.Patientname}</td>
              <td>{report.filename}</td>
              <td>
                <button onClick={() => downloadFile(report.filename)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  )
}

export default Reports
