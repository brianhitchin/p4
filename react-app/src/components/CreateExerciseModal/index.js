import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import "./index.css"

function CreateExerciseModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="createmain">
            <h2>Share a new exercise!</h2>
            <div className="centerme2">Please fill out the details below.</div>
            <div className="centerme2">Thank you for sharing a new exercise.</div>
            <div className="grayline centerme2">You may edit any details at any time!</div>
            <div className="modalbuttonholder">
                <button type="text" className="modalbutton boldme lineabove">Create</button>
                <button type="text"onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default CreateExerciseModal