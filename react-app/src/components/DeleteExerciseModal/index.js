import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import "./index.css"

function DeleteExerciseModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="deletemain">
            <h2>Confirm Delete</h2>
            <div>Once you confirm delete, the exercise is permanently gone!</div>
            <button type="text" className="modalbutton boldme">Delete</button>
            <button type="text"onClick={handleSubmitN} className="modalbutton redme boldme">Go back...</button>
        </div>
    );
}

export default DeleteExerciseModal