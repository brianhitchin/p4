import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { OneStoryThunk } from "../../store/story";
import { OneExerciseThunk } from "../../store/exercise";
import './index.css'
import landing from './landing.png'

function Userlanding(){

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(OneStoryThunk(1))
        dispatch(OneExerciseThunk(1))
    }, [])

    if (!sessionUser) return <Redirect to="/login" />;

    const today = new Date();
    const todayDate = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`

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
                <div>Test1</div>
                <div>Test2</div>
            </div>
        </div>
    )
}

export default Userlanding