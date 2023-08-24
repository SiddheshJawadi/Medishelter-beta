import React from 'react'
import './css/Home.css'
import { Stack } from '@mui/material'
import Lanpic from './Lanpic.png';



function home() {
  return (
    <>
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
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, doloremque corrupti consequatur ratione officiis rerum doloribus assumenda odit expedita laboriosam eum sed provident voluptatibus facere sunt maiores ducimus sapiente ex.</p>
    </div>
    <div className='Teams'>
        <h1>Our Team Members</h1>
        <Stack spacing={2} direction='row'> 
            <p>Anvi<br />BackEnd</p>
            <p>Shruti<br />FrontEnd</p>
            <p>Siddhesh<br />BlockChain</p>
            <p>Tanish<br />BlockChain</p>
            <p>Tanmay<br />FrontEnd</p>
        </Stack>
    </div>
    </>
  )
}

export default home
