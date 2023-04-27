import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom"
import { AllStoryThunk } from "../../store/story";
import write from './write.gif'
import t1 from './t1.png'
import t2 from './t2.png'
import './index.css'

function CSlanding() {

    const storystate = useSelector((state) => state.story.all_stories)
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    useEffect(() => {
        dispatch(AllStoryThunk())
    }, [])

    /*
    useEffect(() => {
        setTimeout(() => {
            history.push(`/story/${lastid}`)
        }, 3000)
    }, [history])
    */

    let laststory;
    let redirectId;

    useEffect(() => {
        if (storystate) {
            laststory = storystate[Object.keys(storystate).slice(-1)]
            redirectId = laststory.id
        }
    }, [storystate])



    return (
        <div className="csmain">
            <h3 className="boldme">Story successfully written!</h3>
            <h3 className="boldme">Being integrated into the database...</h3>
            <img src={write} className="csgif"></img>
            <div className="csinner">
                <div className="cssinnerinner">
                    <div className="buttonme2" onClick={() => {history.push('/story')}}>Go back to story</div>
                </div>
                <div className="cssinnerinner">
                    <div className="buttonme2" onClick={() => {history.push(`/story/${redirectId}`)}}>Go to new story</div>
                    {laststory && 
                        <div className='borderme2 asitems' onClick={() => {history.push(`/story/${redirectId}`)}}>
                            <div className="previewholder">
                                <div class="sampleimage2">
                                    <img src={laststory.image_url} alt='sample story' className="sampleimageitself2"></img>
                                </div>
                                <div className="innerpreview">
                                    <div><span className="boldme">{"name: "}</span>{laststory.title}</div>
                                    <div className="tagholder"><img src={laststory.topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>
                                    <div className="boldme">{laststory.preview}</div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CSlanding