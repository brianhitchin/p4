import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { OneExerciseThunk, AddCommentEThunk } from '../../store/exercise';
import { AllUsersThunk } from '../../store/user';
import { AllTopicThunk } from '../../store/topic';
import OpenModalButton from '../OpenModalButton'
import DeleteExerciseModal from '../DeleteExerciseModal';
import EditExerciseModal from '../EditExerciseModal';
import t1 from './t1.png'
import t2 from './t2.png'
import starbg from './starbg.png'
import './index.css'

function SingleExercise() {

    const { exerciseId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const userstate = useSelector(state => state.user.all_users)
    const exercisestate = useSelector(state => state.exercise.single_exercise)
    const thisuserstate = useSelector(state => state.session.user)
    const topicstate = useSelector(state => state.topic.all_topics)
    const [showMenu, setShowMenu] = useState(false);
    const [rating, setRating] = useState(3)
    const [postcom, setPostcom] = useState("")
    const [comments, setComments] = useState([])
    const [errors, setErrors] = useState([]);
    const ulRef = useRef();

    useEffect(() => {
        dispatch(OneExerciseThunk(exerciseId))
        dispatch(AllUsersThunk())
        dispatch(AllTopicThunk())
    }, [])

    useEffect(() => {
        if (exercisestate && rexercise) {
            setComments([...rexercise.comments])
        }
    }, [exercisestate])

    useEffect(() => {
        document.title = 'NA | Single Exercise';
    }, []);

    let rexercise = null;
    let rcreator = null;

    const relvalue = () => {
        if (Object.values(userstate).length >= 1) {
            rexercise = exercisestate[exerciseId]
            if (rexercise) { rcreator = userstate[rexercise.creatorId] }
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

    let errorz = []

    const bsplit = (x) => {
        const y = x.split(" ")
        const ans = []
        ans.push(y[1])
        ans.push(y[2])
        ans.push(y[3])
        return ans.join(' ')
    }

    const posthandler = (e) => {
        e.preventDefault();
        errorz = []
        setErrors([])
        if (postcom.length < 10) { errorz.push('Comment must be at least 10 characters long.') }
        if (postcom.length > 200) { errorz.push('Comment cannot be longer than 200 characters.') }
        setErrors(errorz)
        if (errorz.length == 0) {
            dispatch(AddCommentEThunk(rexercise.id, { body: postcom, rating }))
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
            {rexercise &&
                <>
                    <div className='ostop'>
                        <h2>{rexercise.name}</h2>
                        {ocheck() ? <div className="modalwrapper">
                        <div className='stars'><img src={starbg} alt='rating' className='starimg'></img><span>{`Average rating: ${avgRating(rexercise.comments)} / 5`}</span></div>
                            <div>
                                <OpenModalButton
                                    buttonText="Edit Exercise"
                                    onItemClick={closeMenu}
                                    modalComponent={<EditExerciseModal />}
                                />
                            </div>
                            <div>
                                <OpenModalButton
                                    buttonText="Delete Exercise"
                                    onItemClick={closeMenu}
                                    modalComponent={<DeleteExerciseModal />}
                                />
                            </div>
                        </div> : <div className='stars'><img src={starbg} alt='rating' className='starimg'></img><span>{`Average rating: ${avgRating(rexercise.comments)} / 5`}</span></div>}
                    </div>
                    <div className='onestoryinnermain'>
                        <div className='onestoryinnertop'>
                            <div className='onestoryimgholder'><img src={rexercise.image_url} alt="Story image" className='onestoryimg'></img></div>
                            <div className='ostopui'>
                                <div><span className='boldme'>Created by:</span>{` ${rcreator.username}`}</div>
                                <div><span className='boldme'>Created at: </span>{` ${rexercise.created_at}`}</div>
                                {thistopic && <div className="tagholder"><span>Tag: </span>{tagurl ? <img src={tagurl} alt='tag' className='tagimg'></img> : ''}</div>}
                                <div><span>Read more of <span onClick={() => { alert('Feature coming soon!') }} className='buttonlike'>{`${rcreator.first_name} ${rcreator.last_name}`}</span>'s stories!</span></div>
                            </div>
                        </div>
                        <div className='onestoryinnerbot'>
                            <div className='noof fw'>{rexercise.body}</div>
                            <div className='cinner'>
                                {comments.length > 0 && Object.values(rexercise.comments).map((comment) => {
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

                </>
            }
        </div >
    )

}

export default SingleExercise