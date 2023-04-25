import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import "./index.css"

function EditStoryModal() {

    const dispatch = useDispatch();
    const { storyId } = useParams()
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const storystate = useSelector(state => state.story.single_story)

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    let thisstory = null;
    if (storystate) {
        thisstory = storystate[Object.keys(storystate)[0]]
    }

    console.log(thisstory)

    return (
        <div className="editmain">
            {thisstory && <h2>Confirm edit for '{thisstory.title}'</h2>}
            <div className="centerme2">Please fill out the details below.</div>
            <div className="grayline centerme2">Any unchanged field will remain as is!</div>
            <div className="modalbuttonholder">
                <button type="text" className="modalbutton boldme lineabove">Edit</button>
                <button type="text"onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default EditStoryModal