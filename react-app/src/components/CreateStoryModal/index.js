import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AddStoryThunk } from "../../store/story"
import "./index.css"

function CreateStoryModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const userId = useSelector(state => state.session.user)
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState(5)
    const [preview, setPreview] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [body, setBody] = useState("")

    if (userId) {
        const rId = userId.id
    }

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="createmain">
            <h2>Write a new story!</h2>
            <div className="centerme2">Please fill out the details below.</div>
            <div className="centerme2">Thank you for sharing your story.</div>
            <div className="grayline centerme2">You may edit any details at any time!</div>
            <label for="titlebox">Title</label>
                <input id="titlebox" placeholder="New group title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <label for="moodbox">Mood</label>
            <input id="moodbox" type="range" min="0" max="10" step="1" value={mood} onChange={(e) => setMood(e.target.value)}></input>
            <div className="modalbuttonholder">
                <button type="text" className="modalbutton boldme lineabove">Create</button>
                <button type="text" onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default CreateStoryModal