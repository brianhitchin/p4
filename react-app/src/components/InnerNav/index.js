import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './index.css'
import exercisebutton from './exercise.png'
import storybutton from './story.png'

function Innernav() {

    const history = useHistory();

    return (
        <div className='innerdivmain'>
            <div className='boldme'>
                Where would you like to go?
            </div>
            <div>
                <button type='button'><img src={storybutton} alt="Story" className="buttonimg" onClick={() => {history.push('/story')}}></img></button>
            </div>
            <div>
                <button type='button'><img src={exercisebutton} alt="Exercise" className="buttonimg"></img></button>
            </div>
        </div>
    )
}

export default Innernav