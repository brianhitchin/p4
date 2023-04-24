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

    relvalue()

    return (

        <div className='onestorymain'>
            {rstory && <div className='onestoryinnermain'>
                <h1>{rstory.id}</h1>
                <div>{`${rcreator.first_name} ${rcreator.last_name}`}</div>
                <div>{rstory.body}</div>
            </div>}
        </div>

    )

}

export default OneStory