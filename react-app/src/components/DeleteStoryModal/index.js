import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { DeleteStoryThunk } from "../../store/story";
import "./index.css"

function DeleteStoryModal() {

    const { storyId } = useParams()
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const thisstory = useSelector(state => state.story.single_story)
    const thisstoryid = thisstory[Object.keys(thisstory)[0]].id

    console.log(thisstory, thisstoryid)

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = dispatch(DeleteStoryThunk(thisstoryid)).then((_res) => closeModal()).then((_res) => history.push('/story'))
    }

    const handleSubmitN = (e) => {
        e.preventDefault();
        closeModal()
    }

    return (
        <div className="deletemain">
            <h2>Confirm Delete</h2>
            <div className="grayline centerme2">Once you confirm delete, the story is permanently gone!</div>
            <div className="modalbuttonholder">
                <button type="text" onClick={handleSubmit} className="modalbutton boldme lineabove">Delete</button>
                <button type="text" onClick={handleSubmitN} className="modalbutton redme boldme">Go back...</button>
            </div>
        </div>
    );
}

export default DeleteStoryModal