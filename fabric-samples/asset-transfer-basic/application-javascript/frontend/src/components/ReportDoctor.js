import React, { useState } from 'react';
import axios from 'axios';
import './css/Registration.css';
import { Link } from 'react-router-dom';

const ReportDoctor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

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

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = reader.result;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('file', base64File);

      try {
        const response = await axios.post('http://localhost:3000/radiologistdoctor/report', formData)
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div>
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
      </div>
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
