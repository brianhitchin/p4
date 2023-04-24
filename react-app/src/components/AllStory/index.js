import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { AllStoryThunk } from "../../store/story";
import writestory from "./writestory.webp"
import "./index.css"
import t1 from './t1.png'
import t2 from './t2.png'

function AllStories() {

    const allstorysession = useSelector((state) => state.story.all_stories)
    const dispatch = useDispatch()
    const history = useHistory()

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
                <div onClick={() => { alert('Create story') }} className="ditto buttonme">
                    <img src={writestory} alt="Write a story!" className="writestoryimg"></img>
                    <span className="boldd">Write a story!</span>
                </div>
            </div>
            <div className="allstorybot">
                {allstorysession && Object.keys(allstorysession).map((istory, idx) => {
                    const story = allstorysession[istory]
                    return (
                        <div key={idx} className='borderme2 asitems' onClick={() => {history.push(`/story/${story.id}`)}}>
                            <div className="previewholder">
                                <div class="sampleimage2">
                                    <img src={story.image_url} alt='sample story' className="sampleimageitself2"></img>
                                </div>
                                <div className="innerpreview">
                                    <div><span className="boldme">{"name: "}</span>{story.title}</div>
                                    <div className="tagholder"><img src={story.topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>
                                    <div className="boldme">{story.preview}</div>
                                    <div><span className="boldme">{"written: "}</span>{story.created_at}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllStories