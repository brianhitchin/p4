import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'

function Footerfunc(){
    return (
        <div className='lolz'>
            <div className='footermain'>
                <div>Please be advised that this is an amateur project by <NavLink to={'https://www.linkedin.com/in/brian-hitchin-940b57268/'}>Brian.</NavLink></div>
                <div>For further information, please visit <NavLink to={'https://www.mentalhealth.gov/'}>mentalhealth,</NavLink>
                    <NavLink to={'https://www.samhsa.gov/'}>SAMHSA,</NavLink> or <NavLink to={'https://www.cdc.gov/mentalhealth/learn/index.htm'}>CDC Mental Health.</NavLink>
                </div>
                <div>In a case of emergency, please call 911.</div>
            </div>
        </div>
    )
}

export default Footerfunc;