import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
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


    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="createmain">
            <div className="grayline cmdiv">
                <h2>Share a new exercise!</h2>
                <div className="centerme2">Please fill out the details below.</div>
                <div className="centerme2">Thank you for sharing a new exercise.</div>
                <div className="centerme2">You may edit any details at any time!</div>
            </div>
            <label for="titlebox" className="boldme">Title</label>
            <input id="titlebox" placeholder="New group title" value={title} onChange={(e) => setTitle(e.target.value)} className="cminputs"></input>
            <label for="tag">Tag</label>
                <select id="tag" value={topic} onChange={(e) => setTopic(Number(e.target.value))}>
                    <option value="" disabled selected>(select one)</option>
                    <option value="1">Depression</option>
                    <option value="2">Anxiety</option>
                </select>
            <label for="previewbox" className="boldme">Preview</label>
            <input id="previewbox" className="cminputs" placeholder="Preview (keep it as short as possible!)" value={preview} onChange={(e) => setPreview(e.target.value)}></input>
            <label for="urlbox" className="boldme">Title</label>
            <input id="urlbox" className="cminputs" placeholder="Image url!" value={imageurl} onChange={(e) => setImageurl(e.target.value)}></input>
            <div><img src={imageurl.length > 5 ? imageurl : previewimg} alt="preview" className="previewimage thinborderme"></img></div>
            <label for="bodybox" className="boldme">Body</label>
            <textarea id="bodybox" className="cmbox" placeholder="Please write at least 30 characters." value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <div className="modalbuttonholder">
                <button type="text" className="modalbutton boldme lineabove">Create</button>
                <button type="text"onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default CreateExerciseModal