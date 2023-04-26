import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { AddStoryThunk } from "../../store/story"
import previewimg from './preview.png'
import "./index.css"

function CreateStoryModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user)
    const [topic, setTopic] = useState(0)
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState(5)
    const [preview, setPreview] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [body, setBody] = useState("")
    const history = useHistory()

    let rId;
    if (userId) {
        rId = userId.id
    }

    let errorz = []

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        if (!title) {
            errorz.push('Title cannot be empty.')
        }
        if (!mood) {
            errorz.push('Mood cannot be empty.')
        }
        if (!preview) {
            errorz.push('Preview cannot be empty.')
        }
        if (!body) {
            errorz.push('Body cannot be empty.')
        }
        setErrors(errorz)
        if (!imageurl) {
            if (errorz.length == 0) {
                const data = dispatch(AddStoryThunk({ title, mood, preview, body, image_url: "https://thumbs.dreamstime.com/b/preview-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-app-135745554.jpg", creatorId: rId, topicId: topic }))
                .then((res) => history.push(`/story/${res}`))
            }
        } else {
            if (errorz.length == 0) {
                const data = dispatch(AddStoryThunk({ title, mood, preview, body, image_url: imageurl, creatorId: rId, topicId: topic }))
                .then((res) => history.push(`/story/${res}`))
            }
        }
    }

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="createmain">
            <div className="grayline cmdiv">
                <h2>Write a new story!</h2>
                <div className="centerme2">Please fill out the details below.</div>
                <div className="centerme2">Thank you for sharing your story.</div>
                <div className="centerme2">You may edit any details at any time!</div>
            </div>
            {errors.length > 0 && <ul className="redme errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>}
            <label for="titlebox" className="boldme">Title</label>
            <input id="titlebox" placeholder="New story title" value={title} onChange={(e) => setTitle(e.target.value)} className="cminputs"></input>
            <label for="tag">Tag</label>
            <select id="tag" value={topic} onChange={(e) => setTopic(Number(e.target.value))}>
                <option value="" disabled selected>(select one)</option>
                <option value="1">Depression</option>
                <option value="2">Anxiety</option>
            </select>
            <label for="moodbox" className="boldme">Mood: {mood}</label>
            <input id="moodbox" type="range" min="0" max="10" step="1" value={mood} onChange={(e) => setMood(e.target.value)}></input>
            <label for="previewbox" className="boldme">Preview</label>
            <input id="previewbox" className="cminputs" placeholder="Preview (keep it as short as possible!)" value={preview} onChange={(e) => setPreview(e.target.value)}></input>
            <label for="urlbox" className="boldme">Title</label>
            <input id="urlbox" className="cminputs" placeholder="Image url!" value={imageurl} onChange={(e) => setImageurl(e.target.value)}></input>
            <div><img src={imageurl.length > 5 ? imageurl : previewimg} alt="preview" className="previewimage thinborderme"></img></div>
            <label for="bodybox" className="boldme">Body</label>
            <textarea id="bodybox" className="cmbox" placeholder="Please write at least 30 characters." value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <div className="modalbuttonholder">
                <button type="text" className="modalbutton boldme lineabove" onClick={handleSubmit}>Create</button>
                <button type="text" onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default CreateStoryModal