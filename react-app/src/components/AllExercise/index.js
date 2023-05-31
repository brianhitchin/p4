import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { AllExercise, AllExerciseThunk, FilterExerciseThunk } from "../../store/exercise"
import OpenModalButton from '../OpenModalButton'
import CreateExerciseModal from "../CreateExerciseModal";
import exericon from "./exericon.png"
import "./index.css"
import t1 from './t1.png'
import t2 from './t2.png'

function AllExercises() {

    const allexercisesession = useSelector((state) => state.exercise.all_exercises)
    const dispatch = useDispatch()
    const history = useHistory();
    const ulRef = useRef()
    const [showMenu, setShowMenu] = useState(false);
    const [filtered, setFiltered] = useState(false);

    useEffect(() => {
        if (!filtered) {
            dispatch(AllExerciseThunk())
        }
    }, [filtered])

    useEffect(() => {
        document.title = 'NA | All Exercises';
      }, []);

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

    const topictran = (val) => {
        return val == 1 ? "depression" : "anxiety"
    }

    useEffect(() => {
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [closeMenu]);

    useEffect(() => {
        if (filtered) {
            dispatch(FilterExerciseThunk(filtered))
        }
    }, [filtered])

    return (
        <div className="allstorymain">
            <div className="allstorytop">
                <div>
                    <span className="bigfont2">Exercises</span>
                    <span>Share and read exercises.</span>
                </div>
                <div className="ditto buttonme">
                    <img src={exericon} alt="Create an exercise" className="writestoryimg"></img>
                    <OpenModalButton
                        buttonText="Write Exercise"
                        onItemClick={closeMenu}
                        modalComponent={<CreateExerciseModal />}
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
                            <button className="buttonme" onClick={() => { setFiltered(false) }}>Clear filter</button>
                        </div>}
                    </form>
                </div>
                <div className="asright">
                {allexercisesession && Object.keys(allexercisesession).map((iexercise, idx) => {
                    const exercise = allexercisesession[iexercise]
                    return (
                        <div key={idx} className='borderme2 asitems' onClick={() => { history.push(`/exercise/${exercise.id}`) }}>
                            <div className="previewholder">
                                <div class="sampleimage2">
                                    <img src={exercise.image_url} alt='sample exercise' className="sampleimageitself2"></img>
                                </div>
                                <div className="innerpreview">
                                    <div><span className="boldme">{"Name: "}</span>{exercise.name}</div>
                                    <div className="tagholder"><span className="boldme">{"Tag: "}</span><img src={exercise.topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>
                                    <div className="boldme"><span className="boldme">{"Preview:: "}</span>{exercise.preview}</div>
                                    <div><span className="boldme">{"Written: "}</span>{exercise.created_at}</div>
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

export default AllExercises