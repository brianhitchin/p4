import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'

function Footerfunc(){
    return (
        <div className='lolz'>
            <div className='footermain'>
                <div>Please be advised that this is an amateur project by <a href='https://www.linkedin.com/in/brian-hitchin-940b57268/'>Brian.</a></div>
                <div>For further information, please visit <a href="https://www.mentalhealth.gov/">mentalhealth,</a>
                    <a href="https://www.samhsa.gov/">SAMHSA,</a> or <a href="https://www.cdc.gov/mentalhealth/learn/index.htm">CDC Mental Health.</a>
                </div>
                <div>In a case of emergency, please call 911.</div>
            </div>
        </div>
    )
}

export default Footerfunc;