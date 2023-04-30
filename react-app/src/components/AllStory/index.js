import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { AllStoryThunk } from "../../store/story";
import writestory from "./writestory.webp"
import OpenModalButton from '../OpenModalButton'
import CreateStoryModal from "../CreateStoryModal";
import "./index.css"
import t1 from './t1.png'
import t2 from './t2.png'

function AllStories() {

    const allstorysession = useSelector((state) => state.story.all_stories)
    const dispatch = useDispatch()
    const ulRef = useRef()
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const [filtered, setFiltered] = useState(false);

    useEffect(() => {
        dispatch(AllStoryThunk())
    }, [])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = (e) => {
        if (!showMenu) return;
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [closeMenu]);

    const topictran = (val) => {
        return val == 1 ? "depression" : "anxiety"
    }

    return (
        <div className="allstorymain">
            <div className="allstorytop">
                <div>
                    <span className="bigfont2">Stories</span>
                    <span className="graybig">Share and read stories.</span>
                </div>
                <div className="ditto buttonme">
                    <img src={writestory} alt="Write a story!" className="writestoryimg"></img>
                    <OpenModalButton
                        buttonText="Write Story"
                        onItemClick={closeMenu}
                        modalComponent={<CreateStoryModal />}
                    />
                </div>
            </div>
            <div className="allstorybot">
                <div className="filteroption">
                    <form action="#" className="centered">
                        <div className="boldme">Filter by:</div>
                        <select name="languages" id="topic" value={filtered} onChange={(e) => Number(setFiltered(e.target.value))} className="sf">
                            <option selected={"selected"}>Pick a filter</option>
                            <option value="1">Depression</option>
                            <option value="2">Anxiety</option>
                        </select>
                        {filtered && <div className="appa">
                            <div className="boldme">Active filters:</div>
                            <div className="thiaf">{topictran(filtered)}</div>
                        </div>}
                    </form>
                </div>
                <div className="asright">
                    {allstorysession && Object.keys(allstorysession).map((istory, idx) => {
                        const story = allstorysession[istory]
                        return (
                            <div key={idx} className='borderme2 asitems' onClick={() => { history.push(`/story/${story.id}`) }}>
                                <div className="previewholder">
                                    <div class="sampleimage2">
                                        <img src={story.image_url} alt='sample story' className="sampleimageitself2"></img>
                                    </div>
                                    <div className="innerpreview">
                                        <div><span className="boldme">{"Name: "}</span>{story.title}</div>
                                        <div className="tagholder"><span className="boldme">{"Tag:: "}</span><img src={story.topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>
                                        <div className="boldme"><span className="boldme">{"Preview: "}</span>{story.preview}</div>
                                        <div><span className="boldme">{"Written: "}</span>{story.created_at}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="filteroption2">
                </div>
            </div>
        </div>
    )
}

export default AllStories