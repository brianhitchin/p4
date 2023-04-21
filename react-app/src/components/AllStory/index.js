import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { AllStoryThunk } from "../../store/story";
import writestory from "./writestory.webp"
import "./index.css"

function AllStories(){

    const allstorysession = useSelector((state) => state.story.all_stories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(AllStoryThunk())
    }, [])

    console.log(allstorysession)

    return (
        <div className="allstorymain">
            <div className="allstorytop">
                <div>
                    <span className="bigfont2">Stories</span>
                    <span>Share and read stories.</span>
                </div>
                <div onClick={() => {alert('Create story')}}>
                    <img src={writestory} alt="Write a story!" className="writestoryimg"></img> 
                    <span className="boldd">Write a story!</span>
                </div>
            </div>
        </div>
    )
}

export default AllStories