import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AddExerciseThunk } from "../../store/exercise";
import { useHistory, Redirect } from 'react-router-dom'
import previewimg from './preview.png'
import "./index.css"

function CreateExerciseModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const [topic, setTopic] = useState(0)
    const [title, setTitle] = useState("")
    const [preview, setPreview] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [body, setBody] = useState("")
    const userId = useSelector(state => state.session.user)
    const history = useHistory()

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/login" />;

    let rId;
    if (userId) {
        rId = userId.id
    }

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    let errorz = []

    const handleSubmit = (e) => {
        e.preventDefault();
        errorz = [];
        setErrors([])
        if (!title) {
            errorz.push('Name cannot be empty.')
        }
        if (title.length > 35) {
            errorz.push('Name cannot be longer than 35 chars.')
        }
        if (!preview) {
            errorz.push('Preview cannot be empty.')
        }
        if (preview.length > 50) {
            errorz.push('Preview cannot be longer than 50 chars.')
        }
        if (!body) {
            errorz.push('Body cannot be empty.')
        }
        setErrors(errorz)
        if (!imageurl) {
            if (errorz.length == 0) {
                const data = dispatch(AddExerciseThunk({ preview, body, name: title, image_url: "https://thumbs.dreamstime.com/b/preview-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-app-135745554.jpg", creatorId: rId, topicId: topic ? topic : 1 }))
                .then((_res) => closeModal())
                .then((_res) => history.push('/cexercise'))
            }
        } else {
            if (errorz.length == 0) {
                const data = dispatch(AddExerciseThunk({ preview, body, name: title, image_url: imageurl, creatorId: rId, topicId: topic ? topic : 1 }))
                .then((_res) => closeModal())
                .then((_res) => history.push('/cexercise'))
            }
        }
    }

    return (
        <div className="createmain">
            <div className="grayline cmdiv">
                <h2>Share a new exercise!</h2>
                <div className="centerme2">Please fill out the details below.</div>
                <div className="centerme2">Thank you for sharing a new exercise.</div>
                <div className="centerme2">You may edit any details at any time!</div>
            </div>
            {errors.length > 0 && <ul className="redme errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>}
            <label for="titlebox" className="boldme">Title</label>
            <input id="titlebox" placeholder="New exercise title / Max 35 chars." value={title} onChange={(e) => setTitle(e.target.value)} className="cminputs"></input>
            <label for="tag">Tag</label>
                <select id="tag" value={topic} onChange={(e) => setTopic(Number(e.target.value))}>
                    <option value="" disabled selected>(select one)</option>
                    <option value="1">Depression</option>
                    <option value="2">Anxiety</option>
                </select>
            <label for="previewbox" className="boldme">Preview</label>
            <input id="previewbox" className="cminputs" placeholder="Preview / Max 50 chars." value={preview} onChange={(e) => setPreview(e.target.value)}></input>
            <label for="urlbox" className="boldme">Image</label>
            <div>Preferably any image links. You can leave this blank, and come back to it!</div>
            <input id="urlbox" className="cminputs" placeholder="Image url!" value={imageurl} onChange={(e) => setImageurl(e.target.value)}></input>
            <div><img src={imageurl.length > 5 ? imageurl : previewimg} alt="preview" className="previewimage thinborderme"></img></div>
            <label for="bodybox" className="boldme">Body</label>
            <textarea id="bodybox" className="cmbox" placeholder="Please write at least 30 characters." value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <div className="modalbuttonholder">
                <button type="text" onClick={handleSubmit} className="modalbutton boldme lineabove">Create</button>
                <button type="text" onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default CreateExerciseModal