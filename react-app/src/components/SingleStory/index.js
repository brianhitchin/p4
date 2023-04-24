import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { OneStoryThunk } from '../../store/story';
import { AllUsersThunk } from '../../store/user';
import './index.css'

function OneStory() {

    const { storyId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const userstate = useSelector(state => state.user.all_users)
    const storystate = useSelector(state => state.story.single_story)
    const thisuserstate = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(OneStoryThunk(storyId))
        dispatch(AllUsersThunk())
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

    relvalue()

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
                                <div><span>Read more of <span onClick={() => {alert('Feature coming soon!')}} className='buttonlike'>{`${rcreator.first_name} ${rcreator.last_name}`}</span>'s stories!</span></div>
                                <div><span className='boldme'>Written at: </span>{` ${rstory.created_at}`}</div>
                            </div>
                        </div>
                        <div className='onestoryinnerbot'>{rstory.body}</div>
                    </div>
                </>
            }
        </div>
    )

}

export default OneStory