import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { OneStoryThunk } from "../../store/story";
import { OneExerciseThunk } from "../../store/exercise";
import './index.css'
import t1 from './t1.png'
import t2 from './t2.png'
import landing from './landing.png'

function Userlanding(){

    const sessionUser = useSelector((state) => state.session.user);
    const onestoryloaded = useSelector((state) => state.story.single_story)
    const oneexerciseloaded = useSelector((state) => state.exercise.single_exercise)
    const dispatch = useDispatch();
    const [exstory, setExstory] = useState(null)
    const [exexercise, setExexercise] = useState(null)
    const history = useHistory();

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
                {exstory && <div className="samples hoverme" onClick={() => {history.push('/story/1')}}>
                        <h3 className="centerh3">Read a sample story!</h3>
                        <div className="previewholder">
                            <div class="sampleimage">
                                {onestoryloaded[1] && <img src={onestoryloaded[1].image_url} alt='sample story' className="sampleimageitself"></img>}
                            </div>
                            <div className="innerpreview">
                                {onestoryloaded[1] && <div><span className="boldme">{"Name: "}</span><span className="underlineme">{onestoryloaded[1].title}</span></div>}
                                {onestoryloaded[1] && <div className="tagholder"><span className="boldme">{"Tag: "}</span><img src={onestoryloaded[1].topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>}
                                {onestoryloaded[1] && <div className="centerme2"><span className="boldme">{"Preview: "}</span>{onestoryloaded[1].preview}</div>}
                                {onestoryloaded[1] && <div><span className="boldme">{"Written: "}</span>{onestoryloaded[1].created_at}</div>}
                            </div>
                        </div>
                    </div>
                    }
                {exexercise && <div className="samples hoverme" onClick={() => {history.push('/exercise/1')}}>
                        <h3 className="centerh3">Try a random exercise!</h3>
                        <div className="previewholder">
                            <div class="sampleimage">
                                {oneexerciseloaded[1] && <img src={oneexerciseloaded[1].image_url} alt='sample exercise' className="sampleimageitself"></img>}
                            </div>
                            <div className="innerpreview">
                                {oneexerciseloaded[1] && <div><span className="boldme">{"Name: "}</span><span className="underlineme">{oneexerciseloaded[1].name}</span></div>}
                                {oneexerciseloaded[1] && <div className="tagholder"><span className="boldme">{"Tag: "}</span><img src={oneexerciseloaded[1].topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>}
                                {oneexerciseloaded[1] && <div className="centerme2"><span className="boldme">{"Preview: "}</span>{oneexerciseloaded[1].preview}</div>}
                                {oneexerciseloaded[1] && <div><span className="boldme">{"Written: "}</span>{oneexerciseloaded[1].created_at}</div>}
                            </div>
                        </div>
                    </div>
                    }
            </div>
        </div>
    )
}

export default Userlanding