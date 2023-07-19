import React, { useState } from 'react';
import Axios from 'axios';
import './css/Registration.css';
import { Link } from 'react-router-dom';

const Navigation = ({ handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/radiologistdoctor">Home</Link>
        </li>
        <li>
          <Link to="/blankprescription">Prescription</Link>
        </li>
        <li>
          <Link to="/reportdoctor">Report</Link>
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
  );
};

const ReportDoctor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);

    console.log(formData)

    Axios.post('http://localhost:3000/report', formData)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <Navigation handleLogout={handleLogout} />
      <div className="logIn-form">
        <form onSubmit={handleSubmit}>
          <label style={{ margin: '8px' }} htmlFor="email">
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label style={{ margin: '8px' }} htmlFor="email">
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label style={{ margin: '8px' }} htmlFor="email">
            File:
            <input type="file" onChange={handleFileChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReportDoctor;
