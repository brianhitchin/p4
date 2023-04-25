import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import "./index.css"

function EditExerciseModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const exercisestate = useSelector(state => state.exercise.single_exercise)

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    let thisexercise = null;
    if (exercisestate) {
        thisexercise = exercisestate[Object.keys(exercisestate)[0]]
    }

    return (
        <div className="editmain">
            {thisexercise && <h2>Confirm edit for '{thisexercise.name}'</h2>}
            <div className="centerme2">Please fill out the details below.</div>
            <div className="grayline centerme2">Any unchanged field will remain as is!</div>
            <div className="modalbuttonholder">
                <button type="text" className="modalbutton boldme lineabove">Edit</button>
                <button type="text"onClick={handleSubmitN} className="modalbutton redme boldme">Cancel</button>
            </div>
        </div>
    );
}

export default EditExerciseModal