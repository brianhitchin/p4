import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { OneStoryThunk, DeleteStoryThunk, EditStoryThunk, AddCommentThunk } from '../../store/story';
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
    const [rating, setRating] = useState(3)
    const [postcom, setPostcom] = useState("")
    const [comments, setComments] = useState([])
    const [errors, setErrors] = useState([]);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(OneStoryThunk(storyId))
        dispatch(AllUsersThunk())
        dispatch(AllTopicThunk())
    }, [])

    useEffect(() => {
        if (storystate && rstory) {
            setComments([...rstory.comments])
        }
    }, [storystate])

    useEffect(() => {
        document.title = 'NA | Single Story';
    }, []);

    let rstory = null;
    let rcreator = null;

    const relvalue = () => {
        if (Object.values(userstate).length >= 1) {
            rstory = storystate[storyId]
            if (rstory) { rcreator = userstate[rstory.creatorId] }
        }
    }

    const ocheck = () => {
        if (rstory && thisuserstate) {
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

    const bsplit = (x) => {
        const y = x.split(" ")
        const ans = []
        ans.push(y[1])
        ans.push(y[2])
        ans.push(y[3])
        return ans.join(' ')
    }

    let errorz = []

    const posthandler = (e) => {
        e.preventDefault();
        errorz = []
        setErrors([])
        if (postcom.length < 10) { errorz.push('Comment must be at least 10 characters long.') }
        if (postcom.length > 200) { errorz.push('Comment cannot be longer than 200 characters.') }
        setErrors(errorz)
        if (errorz.length == 0) {
            dispatch(AddCommentThunk(rstory.id, { body: postcom, rating }))
            .then((res) => setComments([...comments, res]))
            setPostcom("")
            setRating(3)
        }
    }

    const avgRating = (reviews) => {
        let value = 0;
        for (let review of reviews) {
            value += review.rating
        }
        return Math.round((value / reviews.length) * 100) / 100
    }

    const ratingTrans = (val) => {
        switch (val) {
            case 1:
                return "1 - This wasn't for me. "
            case 2:
                return "2 - It could use some improvements."
            case 3:
                return "3 - I liked it!"
            case 4:
                return "4 - I really liked it!"
            default:
                return "5 - Best post ever!"
        }
    }

    return (
        <div className='onestorymain'>
            {rstory &&
                <>
                    <div className='ostop'>
                        <h2>{rstory.title}</h2>
                        {ocheck() ? <div className="modalwrapper">
                            <div onClick={() => { alert('Favorite and Rating features coming soon!') }} className='stars'><img src={starbg} alt='rating' className='starimg'></img><span>{`Average rating: ${avgRating(rstory.comments)} / 5`}</span></div>
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
                        </div> : <div className='stars'><img src={starbg} alt='rating' className='starimg'></img><span>{`Average rating: ${avgRating(rstory.comments)} / 5`}</span></div>}
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
                            <div className='comments boldme'>
                                <div className='cinner'>
                                    {comments.length > 0 && Object.values(rstory.comments).map((comment) => {
                                        return (
                                            <div className='icom'>
                                                <div className='icomtop'>{comment.body}</div>
                                                <div>{`Rating: ${comment.rating}/5 • Written at: ${bsplit(comment.created_at)}`}</div>
                                            </div>
                                        )
                                    })}
                                    <div className='commentbox'>
                                        <h3>Write a comment!</h3>
                                        {thisuserstate && <div>
                                            <span>Commenting as •</span><span className='graysmall'>{`${thisuserstate.first_name} ${thisuserstate.last_name}`}</span>
                                        </div>}
                                        {errors.length > 0 && <ul className="redme errors">
                                            {errors.map((error, idx) => (
                                                <li key={idx}>{error}</li>
                                            ))}
                                        </ul>}
                                        <form className='commentform'>
                                            <label for="commentbody">comment</label>
                                            <input type="textarea" name="commentbody" className='cinp' value={postcom} onChange={(e) => setPostcom(e.target.value)} required />

                                            <label for="rating">rating</label>
                                            <span className='boldme centerme brownme'>{` ${ratingTrans(rating)} `}</span>
                                            <input type="range" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} required />

                                            <input type="submit" value="Post comment!" className='cbut' onClick={posthandler} />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )

}

export default OneStory