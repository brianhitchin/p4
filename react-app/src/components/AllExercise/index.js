import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { AllExerciseThunk } from "../../store/exercise"
import writestory from "./writestory.webp"
import "./index.css"

function AllStories() {

    const allexercisesession = useSelector((state) => state.exercise.all_exercises)
    const dispatch = useDispatch()

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
                <div onClick={() => { alert('Create story') }} className="ditto">
                    <img src={writestory} alt="Write a story!" className="writestoryimg"></img>
                    <span className="boldd">Create an exercise!</span>
                </div>
            </div>
            <div className="allstorybot">
                {allexercisesession && Object.keys(allexercisesession).map((iexercise, idx) => {
                    const exercise = allexercisesession[iexercise]
                    return (
                        <div key={idx} className='borderme'>
                            <NavLink exact to={`/exercise/${exercise.id}`}>
                                <span>{exercise.name}</span>
                            </NavLink>
                            <span></span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllStories