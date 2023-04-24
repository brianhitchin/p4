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

    return (

        <div className='onestorymain'>
            {Object.values(userstate).length >= 1 && <div className='onestoryinnermain'>
                <h1>{storystate.get(2).id}</h1>
                <div>{storystate.get(2).body}</div>
                <div>{userstate.all_users[storystate.get(2).creatorId][first_name]}</div>
            </div>}
        </div>

    )

}

export default OneStory