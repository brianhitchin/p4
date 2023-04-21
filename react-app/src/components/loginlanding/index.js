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
    
    function topictrans(id) {
        if (id == 1){
            return "depression"
        }
        return "anxiety"
    }

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
                        <h3 className="centerh3">Read a sample story!</h3>
                        <div className="previewholder">
                            <div class="sampleimage">
                                <img src={onestoryloaded[1].image_url} alt='sample story' className="sampleimageitself"></img>
                            </div>
                            <div className="innerpreview">
                                <span>{"name: " + onestoryloaded[1].title}</span>
                                <span>{"topic: " + topictrans(onestoryloaded[1].topicId)}</span>
                                <span>{"preview: " + onestoryloaded[1].preview}</span>
                                <span>{"written: " + onestoryloaded[1].created_at}</span>
                            </div>
                        </div>
                    </div>
                    }
                {Object.values(oneexerciseloaded).length >= 1 && <div className="samples">
                        <h3 className="centerh3">Try a random exercise!</h3>
                        <div className="previewholder">
                            <div class="sampleimage">
                                <img src={oneexerciseloaded[1].image_url} alt='sample exercise' className="sampleimageitself"></img>
                            </div>
                            <div className="innerpreview">
                                <span>{"name: " + oneexerciseloaded[1].name}</span>
                                <span>{"topic: " + topictrans(oneexerciseloaded[1].topicId)}</span>
                                <span>{"preview: " + oneexerciseloaded[1].preview}</span>
                                <span>{"written: " + oneexerciseloaded[1].created_at}</span>
                            </div>
                        </div>
                    </div>
                    }
            </div>
        </div>
    )
}

export default Userlanding