import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { OneStoryThunk } from "../../store/story";
import { OneExerciseThunk } from "../../store/exercise";
import './index.css'
import landing from './landing.png'

function Userlanding(){

    const sessionUser = useSelector((state) => state.session.user);
    const onestoryloaded = useSelector((state) => state.story.single_story)
    const oneexerciseloaded = useSelector((state) => state.exercise.single_exercise)
    const dispatch = useDispatch();
    const [exstory, setExstory] = useState({})
    const [exexercise, setExexercise] = useState({})

    useEffect(() => {
        dispatch(OneStoryThunk(1))
        dispatch(OneExerciseThunk(1))
    }, [])

    useEffect(() => {
        if (onestoryloaded && oneexerciseloaded) {
            setExstory(onestoryloaded)
            setExexercise(oneexerciseloaded)
        }
    }, [oneexerciseloaded])

    if (!sessionUser) return <Redirect to="/login" />;

    const today = new Date();
    const todayDate = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`
    console.log(exexercise, exstory)

    return (
        <div className="landingmain">
            <div className="topholder">
                <div className="landingimgholder">
                    <img src={landing} alt={'Welcome!'}></img>
                </div>
                <div className="landingintro">
                    <span className="boldme bigfont">"Loneliness is part of being human. It reminds us that we are not complete in ourselves." - David Runcorn</span>
                    <span className="boldme bigfont">Thank you for coming back to NeverAlone.</span>
                    <span className="boldme bigfont">Click on any of the links to begin!</span>
                    <span className="boldme bigfont">Today is: {todayDate}</span>
                </div>
            </div>
            <div className="bottomholder">
                {Object.values(onestoryloaded).length >= 1 && <div className="samples">
                        <h3>Read a sample story!</h3>
                        <div>
                            {onestoryloaded[1].title}
                        </div>
                        <div>
                            {onestoryloaded[1].preview}
                        </div>
                    </div>
                    }
                {Object.values(oneexerciseloaded).length >= 1 && <div className="samples">
                        <h3>Try a random exercise!</h3>
                        <div>
                            {oneexerciseloaded[1].name}
                        </div>
                        <div>
                            {oneexerciseloaded[1].preview}
                        </div>
                    </div>
                    }
            </div>
        </div>
    )
}

export default Userlanding