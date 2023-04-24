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
        if (rstory && rcreator) {
            console.log('ocheck', rstory.creatorId, rcreator.id)
            return rstory.creatorId == rcreator.id
        }
    }

    relvalue()

    return (

        <div className='onestorymain'>
            {rstory && 
                <>
                    <div className='ostop'>
                        <h2>{rstory.title}</h2>
                        {ocheck() ? <div>Owner</div> : <div>Not Owner</div>}
                    </div>
                    <div className='onestoryinnermain'>
                        <div className='onestoryimgholder'><img src={rstory.image_url} alt="Story image" className='onestoryimg'></img></div>
                        <div><span className='boldme'>Written by:</span>{` ${rcreator.username}`}</div>
                        <div><span className='boldme'>Written at: </span>{` ${rstory.created_at}`}</div>
                        <div>{rstory.body}</div>
                    </div>
                </>
            }
        </div>
    )

}

export default OneStory