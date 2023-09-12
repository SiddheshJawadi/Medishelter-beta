import React, { useState } from 'react';
import Axios from 'axios';
import './css/Registration.css';
import { Link } from 'react-router-dom';
import MainHeader from './MainHeader/MainHeader1'
import Foot from './Footer/Footer'

const Navigation = ({ handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleEditProfile = () => {
    localStorage.removeItem('token')
    window.location.href = '/editprofile'
  }

  return (
    <>
    <div className='nav'><MainHeader /></div>
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
    <div><Foot /></div>
    </>
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
      <div className="logIn-form" style={{marginTop: '200px'}}>
        <form onSubmit={handleSubmit}>
        <label style={{ color: 'grey', margin: '10px', textAlign: 'center', fontSize: '18px', fontWeight: '600', width: 'fit-content', marginLeft: '100px', marginBottom: '10px' }} htmlFor="email">
          Name
        <input type="text" placeholder='Enter Name' value={name} onChange={handleNameChange} style={{marginTop:'10px'}}/>
        </label>

          <br />
          <label style={{color:'grey',margin: '10px',textAlign:'center',fontSize: '18px',fontWeight:'600',width: 'fit-content',marginLeft:'100px'  }} htmlFor="email">
            <b style={{marginBottom:'20px'}}>Email</b>
            <input type="email" placeholder='Enter Email' value={email} onChange={handleEmailChange} style={{marginTop:'10px'}} />
          </label>
          <br />
          <label style={{color:'grey',margin: '10px',textAlign:'center',fontSize: '18px',fontWeight:'600',width: 'fit-content',marginLeft:'110px',marginBottom:'900000px'  }} htmlFor="email">
            File
            <input type="file" onChange={handleFileChange} style={{marginTop:'10px' ,fontSize: '14px'}}/>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReportDoctor;
