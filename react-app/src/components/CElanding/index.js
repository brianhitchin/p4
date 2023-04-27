import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom"
import { AllExerciseThunk } from "../../store/exercise"
import write from './write.gif'
import t1 from './t1.png'
import t2 from './t2.png'
import './index.css'

function CElanding() {

    const exerstate = useSelector((state) => state.exercise.all_exercises)
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;
    
    useEffect(() => {
        dispatch(AllExerciseThunk())
    }, [])

    /*
    useEffect(() => {
        setTimeout(() => {
            history.push(`/story/${lastid}`)
        }, 3000)
    }, [history])
    */

    let lastexer;
    let redirectId;

    useEffect(() => {
        if (exerstate) {
            lastexer = exerstate[Object.keys(exerstate).slice(-1)]
            redirectId = lastexer.id
        }
    }, [exerstate])

    console.log(lastexer)

    return (
        <div className="csmain">
            <h3 className="boldme">Exercise successfully written!</h3>
            <h3 className="boldme">Being integrated into the database...</h3>
            <img src={write} className="csgif"></img>
            <div className="csinner">
                <div className="cssinnerinner">
                    <div className="buttonme2" onClick={() => {history.push('/exercise')}}>Go back to exercise</div>
                </div>
                <div className="cssinnerinner">
                    <div className="buttonme2" onClick={() => {history.push(`/exercise/${redirectId}`)}}>Go to new exercise</div>
                    {lastexer && 
                        <div className='borderme2 asitems' onClick={() => {history.push(`/exercise/${redirectId}`)}}>
                            <div className="previewholder">
                                <div class="sampleimage2">
                                    <img src={lastexer.image_url} alt='sample story' className="sampleimageitself2"></img>
                                </div>
                                <div className="innerpreview">
                                    <div><span className="boldme">{"name: "}</span>{lastexer.name}</div>
                                    <div className="tagholder"><img src={lastexer.topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>
                                    <div className="boldme">{lastexer.preview}</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CElanding