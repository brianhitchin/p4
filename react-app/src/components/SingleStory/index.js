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

    console.log(userstate, storystate)

    return (

        <div className='onestorymain'>
            {storystate && <h1>{storystate.id}</h1>}
        </div>

    )

}

export default OneStory