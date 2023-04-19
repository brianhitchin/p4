import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'

function Footerfunc(){
    return (
        <div className='footermain'>
            <span>Please be advised that this is an amateur project by <NavLink to={'https://www.linkedin.com/in/brian-hitchin-940b57268/'}>Brian.</NavLink></span>
            <p>For further information, please visit <NavLink to={'https://www.mentalhealth.gov/'}>mentalhealth,</NavLink>
            <NavLink to={'https://www.samhsa.gov/'}>SAMHSA,</NavLink> or <NavLink to={'https://www.cdc.gov/mentalhealth/learn/index.htm'}>CDC Mental Health.</NavLink>
            </p>
            <span>In a case of emergency, please call 911.</span>
        </div>
    )
}

export default Footerfunc;