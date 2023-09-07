import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Navigation.css';
import './css/reportsdwnload.css';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader/MainHeader1'
import Foot from './Footer/Footer'

function Reports() {
  const [reports, setReports] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditProfile = () => {
    localStorage.removeItem('token')
    window.location.href = '/editprofile'
  }

  useEffect(() => {
    // Fetch report filenames from the Node.js API
    axios
      .get('http://localhost:3000/patient/reports', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const downloadFile = (index,item) => {
    console.log("Clicked Download")
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:3000/patient/reports/${index}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', item);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <div className='nav'><MainHeader /></div>
    <div>
      <nav>
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

      <div>
        <div className="centered-container">
          <h1>Reports</h1>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((item,index) => (
                
                <tr key={index}>
                  <td>{item}</td>
                  <td>
                    <button onClick={() => downloadFile(index,item)}>
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
    <div><Foot /></div>
    </>
  );
}

export default Reports;
