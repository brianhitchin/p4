import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import usericon from './usericon.png'
import gh from './gh.png'
import li from './li.webp'
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

	useEffect(() => {
		const script = document.createElement('script');
		script.src = "https://kit.fontawesome.com/c5c7a1da31.js";
	}, [])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className="userbutton">
        <img src={usericon} alt={"user menu"} className='nomargin userimg'></img>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <span>{'Hello, ' + user.first_name + ' ' + user.last_name}</span>
            <span>{'Logged in as ' + user.username}</span>
            <span>{user.email}</span>
            <span className="bordertop toppadding heme" onClick={() => {history.push('/story')}}>Story</span>
            <span onClick={() => {history.push('/exercise')}} className="heme">Exercise</span>
            <span className="bordertop">
              <button onClick={handleLogout} className="topmargin normalbutton">Log Out</button>
            </span>
            <div className="bordertop centerme2">
              <div><a href="https://github.com/brianhitchin"><img src={gh} alt="gh" className="smallsize heme"></img></a></div>
              <div><a href="https://www.linkedin.com/in/brian-hitchin-940b57268/"><img src={li} alt="li" className="smallsize heme"></img></a></div>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
