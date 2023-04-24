import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { OneStoryThunk } from '../../store/story';
import { AllUsersThunk } from '../../store/user';
import { AllTopicThunk } from '../../store/topic';
import './index.css'

function OneStory() {

    const { storyId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const userstate = useSelector(state => state.user.all_users)
    const storystate = useSelector(state => state.story.single_story)
    const thisuserstate = useSelector(state => state.session.user)
    const topicstate = useSelector(state => state.topic.all_topics)

    useEffect(() => {
        dispatch(OneStoryThunk(storyId))
        dispatch(AllUsersThunk())
        dispatch(AllTopicThunk())
    }, [])

    let rstory = null;
    let rcreator = null;

    const relvalue = () => {
        if (Object.values(userstate).length >= 1) {
            rstory = storystate[storyId]
            rcreator = userstate[storyId]
        }
    }

    const ocheck = () => {
        if (rstory && thisuserstate) {
            console.log('ocheck', rstory.creatorId, thisuserstate.id)
            return rstory.creatorId == thisuserstate.id
        }
    }

    const gettopic = () => {
        if (topicstate && rstory) {
            return topicstate[rstory.topicId]
        }
    }

    relvalue()
    const thistopic = gettopic()

    return (

        <div className='onestorymain'>
            {rstory && 
                <>
                    <div className='ostop'>
                        <h2>{rstory.title}</h2>
                        {ocheck() ? <div>Edit / Delete</div> : <div>Rating / Favorite</div>}
                    </div>
                    <div className='onestoryinnermain'>
                        <div className='onestoryinnertop'>
                            <div className='onestoryimgholder'><img src={rstory.image_url} alt="Story image" className='onestoryimg'></img></div>
                            <div className='ostopui'>
                                <div><span className='boldme'>Written by:</span>{` ${rcreator.username}`}</div>
                                <div><span className='boldme'>Written at: </span>{` ${rstory.created_at}`}</div>
                                <div><span className='boldme'>Mood: </span>{` ${rstory.mood} / 10`}</div>
                                {thistopic && <div><span>Tag: </span>{` ${thistopic.topic}`}</div>}
                                <div><span>Read more of <span onClick={() => {alert('Feature coming soon!')}} className='buttonlike'>{`${rcreator.first_name} ${rcreator.last_name}`}</span>'s stories!</span></div>
                            </div>
                        </div>
                        <div className='onestoryinnerbot'>
                            <div>{rstory.body}</div>
                            <div className='comments boldme'>Comments and rating feature coming soon!</div>
                        </div>
                    </div>
                </>
            }
        </div>
    )

}

export default OneStory