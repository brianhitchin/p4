import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const demoHandle = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"))
  }

  return (
    <div className="LoginMain">
      <div className="superbig type">
        Welcome to NeverAlone!
      </div>
      <div className="introtxtholder">
        <span className="boldme biggerfont">Ever felt truly alone?</span>
        <span className="boldme biggerfont">Although everyone's journey is unique, similarities can be found with other fellow travelers.</span>
        <span className="boldme biggerfont">A rough day? Or a triumph only you know about? Brand new exercise that helped you out?</span>
        <span className="boldme biggerfont">Now you can read and share them all, and be NeverAlone!</span>
      </div>
      <div className='LoginFormMain'>
        <h2>Thank you for signing up!</h2>
        <div>Join the community of people with similar struggles.</div>
        <div>Not ready to sign up yet? No problem, try signing in as demo!</div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="centerme">
            <label className="boldme">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="logininputs"
              />
            </label>
          </div>
          <div className="centerme">
            <label className="boldme">
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="logininputs"
              />
            </label>
          </div>
          <div className="centerme">
            <label className="boldme">
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="logininputs"
              />
            </label>
          </div>
          <div className="centerme">
            <label className="boldme">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="logininputs"
              />
            </label>
          </div>
          <div className="centerme">
            <label className="boldme">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="logininputs"
              />
            </label>
          </div>
          <div className="centerme">
            <label className="boldme">
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="logininputs"
              />
            </label>
          </div>
          <div className="buttonholder">
            <button type="submit" class="normalbutton">Sign Up</button>
          </div>
        </form>
        <div>
          <button type="button" class="normalbutton" onClick={() => { history.push('/') }}>Log In</button>
          <span className="boldme">- OR -</span>
          <button type="button" class="normalbutton" onClick={demoHandle}>Sign in as demo</button>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
