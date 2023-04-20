import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

function Userlanding(){

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/login" />;

    return (
        <h1>Hello!</h1>
    )
}

export default Userlanding