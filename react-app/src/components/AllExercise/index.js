import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { AllExercise, AllExerciseThunk } from "../../store/exercise"
import exericon from "./exericon.png"
import "./index.css"
import t1 from './t1.png'
import t2 from './t2.png'

function AllExercises() {

    const allexercisesession = useSelector((state) => state.exercise.all_exercises)
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(AllExerciseThunk())
    }, [])

    return (
        <div className="allstorymain">
            <div className="allstorytop">
                <div>
                    <span className="bigfont2">Exercises</span>
                    <span>Share and read exercises.</span>
                </div>
                <div onClick={() => { alert('Create story') }} className="ditto buttonme">
                    <img src={exericon} alt="Create an exercise" className="writestoryimg"></img>
                    <span className="boldd">Create an exercise!</span>
                </div>
            </div>
            <div className="allstorybot">
                {allexercisesession && Object.keys(allexercisesession).map((iexercise, idx) => {
                    const exercise = allexercisesession[iexercise]
                    return (
                        <div key={idx} className='borderme2 asitems' onClick={() => { history.push(`/exercise/${exercise.id}`) }}>
                            <div className="previewholder">
                                <div class="sampleimage2">
                                    <img src={exercise.image_url} alt='sample exercise' className="sampleimageitself2"></img>
                                </div>
                                <div className="innerpreview">
                                    <div><span className="boldme">{"name: "}</span>{exercise.name}</div>
                                    <div className="tagholder"><img src={exercise.topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>
                                    <div className="boldme">{exercise.preview}</div>
                                    <div><span className="boldme">{"written: "}</span>{exercise.created_at}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllExercises