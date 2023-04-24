import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { OneExerciseThunk } from '../../store/exercise';
import { AllUsersThunk } from '../../store/user';
import { AllTopicThunk } from '../../store/topic';
import t1 from './t1.png'
import t2 from './t2.png'
import './index.css'

function OneExercise() {

    const { exerciseId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const userstate = useSelector(state => state.user.all_users)
    const exercisestate = useSelector(state => state.exercise.single_exercise)
    const thisuserstate = useSelector(state => state.session.user)
    const topicstate = useSelector(state => state.topic.all_topics)

    useEffect(() => {
        dispatch(OneExerciseThunk(exerciseId))
        dispatch(AllUsersThunk())
        dispatch(AllTopicThunk())
    }, [])

    let rexercise = null;
    let rcreator = null;

    const relvalue = () => {
        if (Object.values(userstate).length >= 1) {
            rexercise = storystate[exerciseId]
            rcreator = userstate[exerciseId]
        }
    }

    const ocheck = () => {
        if (rexercise && thisuserstate) {
            return rexercise.creatorId == thisuserstate.id
        }
    }

    const gettopic = () => {
        if (topicstate && rexercise) {
            return topicstate[rexercise.topicId]
        }
    }

    relvalue()
    
    const thistopic = gettopic()
    let tagurl = null;
    if (thistopic) {
        if (thistopic.id == 1) {
            tagurl = t1
        }
        else {
            tagurl = t2
        }
    }

    return (

        <div className='onestorymain'>
            {rexercise && 
                <>
                    <div className='ostop'>
                        <h2>{rexercise.name}</h2>
                        {ocheck() ? <div>Edit / Delete</div> : <div>Rating / Favorite</div>}
                    </div>
                    <div className='onestoryinnermain'>
                        <div className='onestoryinnertop'>
                            <div className='onestoryimgholder'><img src={rexercise.image_url} alt="Story image" className='onestoryimg'></img></div>
                            <div className='ostopui'>
                                <div><span className='boldme'>Created by:</span>{` ${rcreator.username}`}</div>
                                <div><span className='boldme'>Created at: </span>{` ${rexercise.created_at}`}</div>
                                {thistopic && <div className="tagholder"><span>Tag: </span>{tagurl ? <img src={tagurl} alt='tag' className='tagimg'></img> : ''}</div>}
                                <div><span>Read more of <span onClick={() => {alert('Feature coming soon!')}} className='buttonlike'>{`${rcreator.first_name} ${rcreator.last_name}`}</span>'s stories!</span></div>
                            </div>
                        </div>
                        <div className='onestoryinnerbot'>
                            <div>{rexercise.body}</div>
                            <div className='comments boldme'>Comments and rating feature coming soon!</div>
                        </div>
                    </div>
                </>
            }
        </div>
    )

}

export default OneExercise