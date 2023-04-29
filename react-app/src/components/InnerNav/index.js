import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './index.css'
import exercisebutton from './exercise.png'
import storybutton from './story.png'

function Innernav() {

    const history = useHistory();

    return (
        <div className='innerdivmain'>
            <div className='iistyle'>
                <div className='boldme wavyme'>
                    Where would you like to go?
                </div>
                <div>
                    <div><img src={storybutton} alt="Story" className="buttonimg" onClick={() => {history.push('/story')}}></img></div>
                </div>
                <div>
                    <div><img src={exercisebutton} alt="Exercise" className="buttonimg" onClick={() => {history.push('/exercise')}}></img></div>
                </div>
            </div>
        </div>
    )
}

export default Innernav