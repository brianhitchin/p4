import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './index.css'

function Innernav() {

    const history = useHistory();

    return (
        <div className='innerdivmain'>
            <div>
                Where would you like to go?
            </div>
            <div>
                <button type='button'>Exercises</button>
            </div>
            <div>
                <button type='button'>Stories</button>
            </div>
        </div>
    )
}

export default Innernav