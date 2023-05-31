import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { OneStoryThunk, DeleteStoryThunk, EditStoryThunk } from '../../store/story';
import { AllUsersThunk } from '../../store/user';
import { AllTopicThunk } from '../../store/topic';
import OpenModalButton from '../OpenModalButton'
import DeleteStoryModal from '../DeleteStoryModal'
import EditStoryModal from '../EditStoryModal';
import t1 from './t1.png'
import t2 from './t2.png'
import starbg from './starbg.png'
import './index.css'

function OneStory() {

    const { storyId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const userstate = useSelector(state => state.user.all_users)
    const storystate = useSelector(state => state.story.single_story)
    const thisuserstate = useSelector(state => state.session.user)
    const topicstate = useSelector(state => state.topic.all_topics)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(OneStoryThunk(storyId))
        dispatch(AllUsersThunk())
        dispatch(AllTopicThunk())
    }, [])

    useEffect(() => {
        document.title = 'NA | Single Story';
      }, []);

    let rstory = null;
    let rcreator = null;

    const relvalue = () => {
        if (Object.values(userstate).length >= 1) {
            rstory = storystate[storyId]
            if (rstory) {rcreator = userstate[rstory.creatorId]}
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
    let tagurl = null;
    if (thistopic) {
        if (thistopic.id == 1) {
            tagurl = t1
        }
        else {
            tagurl = t2
        }
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = (e) => {
        if (!showMenu) return;
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [closeMenu]);

    return (
        <div className='onestorymain'>
            {rstory &&
                <>
                    <div className='ostop'>
                        <h2>{rstory.title}</h2>
                        {ocheck() ? <div className="modalwrapper">
                            <div>
                                <OpenModalButton
                                buttonText="Edit Story"
                                onItemClick={closeMenu}
                                modalComponent={<EditStoryModal />}
                            />
                            </div>
                            <div>
                                <OpenModalButton
                                buttonText="Delete Story"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteStoryModal />}
                            />
                            </div>
                        </div> : <div onClick={() => { alert('Favorite and Rating features coming soon!') }}><img src={starbg} alt='rating' className='starimg'></img></div>}
                    </div>
                    <div className='onestoryinnermain'>
                        <div className='onestoryinnertop'>
                            <div className='onestoryimgholder'><img src={rstory.image_url} alt="Story image" className='onestoryimg'></img></div>
                            <div className='ostopui'>
                                {rcreator && <div><span className='boldme'>Written by:</span>{` ${rcreator.username}`}</div>}
                                <div><span className='boldme'>Written at: </span>{` ${rstory.created_at}`}</div>
                                <div><span className='boldme'>Mood: </span>{` ${rstory.mood} / 10`}</div>
                                {thistopic && <div className="tagholder"><span>Tag: </span>{tagurl ? <img src={tagurl} alt='tag' className='tagimg'></img> : ''}</div>}
                                {rcreator && <div><span>Read more of <span onClick={() => { alert('Feature coming soon!') }} className='buttonlike'>{`${rcreator.first_name} ${rcreator.last_name}`}</span>'s stories!</span></div>}
                            </div>
                        </div>
                        <div className='onestoryinnerbot'>
                            <div className='noof fw'>{rstory.body}</div>
                            <div className='comments boldme'>Comments and rating feature coming soon!</div>
                        </div>
                    </div>
                </>
            }
        </div>
    )

}

export default OneStory