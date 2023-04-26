import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { EditExerciseThunk } from "../../store/exercise"
import previewimg from './preview.png'
import "./index.css"

function EditExerciseModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const exercisestate = useSelector(state => state.exercise.single_exercise)
    const userId = useSelector(state => state.session.user)
    
    let thisexerciseid;
    let thisexercise = null;
    if (exercisestate) {
        thisexercise = exercisestate[Object.keys(exercisestate)[0]]
        thisexerciseid = thisexercise.id
    }

    const [topic, setTopic] = useState(thisexercise.topicId)
    const [name, setName] = useState(thisexercise.name)
    const [preview, setPreview] = useState(thisexercise.preview)
    const [imageurl, setImageurl] = useState(thisexercise.image_url)
    const [body, setBody] = useState(thisexercise.body)
    const history = useHistory();

    let rId;
    if (userId) {
        rId = userId.id
    }

    let errorz = []

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        if (!name) {
            errorz.push('Name cannot be empty.')
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
                const data = dispatch(EditExerciseThunk(thisexerciseid, { name, preview, body, image_url: "https://thumbs.dreamstime.com/b/preview-icon-trendy-design-style-isolated-white-background-vector-simple-modern-flat-symbol-web-site-mobile-logo-app-135745554.jpg", creatorId: rId, topicId: topic }))
                .then((_res) => closeModal())
            }
        } else {
            if (errorz.length == 0) {
                const data = dispatch(EditExerciseThunk(thisexerciseid, { name, preview, body, image_url: imageurl, creatorId: rId, topicId: topic }))
                .then((_res) => closeModal())
            }
        }
    }

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="editmain">
            {thisexercise && <h2>Confirm edit for '{thisexercise.name}'</h2>}
            <div className="centerme2">Please fill out the details below.</div>
            <div className="grayline centerme2">Any unchanged field will remain as is!</div>
            {errors.length > 0 && <ul className="redme errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>}
            <label for="titlebox" className="boldme">Name</label>
            <input id="titlebox" placeholder="New story title" value={name} onChange={(e) => setName(e.target.value)} className="cminputs"></input>
            <label for="tag" className="boldme">Tag</label>
            <select id="tag" value={topic} onChange={(e) => setTopic(Number(e.target.value))}>
                <option value="1" selected={topic == 1}>Depression</option>
                <option value="2" selected={topic == 2}>Anxiety</option>
            </select>
            <label for="previewbox" className="boldme">Preview</label>
            <input id="previewbox" className="cminputs" placeholder="Preview (keep it as short as possible!)" value={preview} onChange={(e) => setPreview(e.target.value)}></input>
            <label for="urlbox" className="boldme">Title</label>
            <input id="urlbox" className="cminputs" placeholder="Image url!" value={imageurl} onChange={(e) => setImageurl(e.target.value)}></input>
            <div><img src={imageurl.length > 5 ? imageurl : previewimg} alt="preview" className="previewimage thinborderme"></img></div>
            <label for="bodybox" className="boldme">Body</label>
            <textarea id="bodybox" className="cmbox" placeholder="Please write at least 30 characters." value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <div className="modalbuttonholder">
                <button type="text" onClick={handleSubmit} className="modalbutton boldme lineabove">Edit</button>
                <button type="text" onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default EditExerciseModal