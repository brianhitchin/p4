import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DeleteExerciseThunk } from "../../store/exercise"
import { useHistory } from 'react-router-dom'
import "./index.css"

function DeleteExerciseModal() {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const thisexer = useSelector(state => state.exercise.single_exercise)
    const thisexeridid = thisexer[Object.keys(thisexer)[0]].id
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = dispatch(DeleteExerciseThunk(thisexeridid)).then((_res) => closeModal()).then((_res) => history.push('/exercise'))
    }

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="deletemain">
            <h2>Confirm Delete</h2>
            <div className="grayline centerme2">Once you confirm delete, the exercise is permanently gone!</div>
            <div className="modalbuttonholder">
                <button type="text" onClick={handleSubmit} className="modalbutton boldme">Delete</button>
                <button type="text" onClick={handleSubmitN} className="modalbutton redme boldme">Go back...</button>
            </div>
        </div>
    );
}

export default DeleteExerciseModal