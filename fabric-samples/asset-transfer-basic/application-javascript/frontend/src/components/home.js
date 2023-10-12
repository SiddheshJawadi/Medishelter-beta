import React from 'react'
import './css/Home.css'
import { Stack } from '@mui/material'
import Lanpic from './Lanpic.png';
import MainHeader from './MainHeader/MainHeader'
import Foot from './Footer/Footer'




function home() {
  return (
    <>
    <div className='nav'><MainHeader /></div>
    <div className='home'>
        

        <h1>About US</h1> 
        <Stack spacing={2} direction='row'> 
            <p>Healthcare systems are an essential aspect of modern society, providing crucial medical services to millions of people around the world.
However, the healthcare industry is notoriously complex and can often be disjointed, with multiple stakeholders involved in patient care. 
This can lead to logistical and communication gaps that can have serious consequences for patient health and safety.<br /><br />

One of the most significant challenges in healthcare is the sharing of patient data between hospitals, insurers, and pharmacies. 
Data sharing can be complicated due to a lack of standardization and interoperability, and data privacy and security concerns. 
Moreover, patients often have to provide their data multiple times to different healthcare providers, leading to data redundancy and inconsistencies.<br /> <br />

It is within this context that a pioneering solution comes to the fore—MEDISHELTER : which brings hospitals, insurers, and pharmacies under one roof. 
This solution enables the seamless sharing of patient data 
while ensuring that data privacy and security are maintained through 
Blockchain’s immutability mechanisms. <br /><br />
By using this web application, healthcare providers can access up-to-date 
and comprehensive patient data while reducing administrative overhead and improving patient outcomes.</p>
            <img src={Lanpic}/>
        </Stack>
    </div>
    <div className='Medishelter'>
        <h1>About Medishelter</h1>
        <p>Technologies Used

Our platform leverages a comprehensive set of cutting-edge technologies to ensure a seamless user experience and robust functionality.<br /><br /> 

<b>Frontend Development with React</b><br />
The frontend of our application, where users interact with our system, is developed using React. Our team has crafted user-friendly login and registration pages, a dynamic home page, and an intuitive patient details page. This frontend interface provides users with a smooth and engaging experience.<br /><br />

<b>Backend Powered by Node.js and MongoDB</b><br />
Our backend infrastructure is built on Node.js, a versatile and efficient runtime environment. We've seamlessly integrated MongoDB, a powerful NoSQL database, to store user login details and patient information securely. This combination enables us to manage data efficiently and maintain the integrity of user accounts and sensitive patient data.<br /><br />

<b>Blockchain Integration with Hyperledger Fabric</b><br />
To enhance data security and transparency, we've integrated blockchain technology using Hyperledger Fabric. This private blockchain framework ensures that transactions are tamper-proof and traceable. Notably, patient prescriptions are stored as assets in the CouchDB instance within the blockchain, guaranteeing data immutability and accessibility.<br /><br />

<b>Smart Contracts and Chaincode Customization</b><br />
Within the Hyperledger Fabric framework, we've harnessed the power of smart contracts through our customizable chaincode. This innovative approach empowers us to install and utilize multiple smart contracts across different organizations seamlessly. By tailoring our chaincode to specific processes, we ensure a tailored and optimized experience for all stakeholders involved.<br /><br />

<b>Zero Gas Cost Implementation</b><br />
One of the standout advantages of using Hyperledger Fabric is its implementation with zero gas cost. Unlike public blockchains, our solution minimizes transaction costs, making it economically efficient for our users and organizations.</p>
    </div>
    <div className='Teams'>
        <h1>Our Team Members</h1>
        <Stack spacing={5} direction='row'> 
            <p>Anvi</p>
            <p>Shruti</p>
            <p>Siddhesh</p>
            <p>Tanish</p>
            <p>Tanmay</p>
        </Stack>
    </div>
    </>
  )
}

export default home
