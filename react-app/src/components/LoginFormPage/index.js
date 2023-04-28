import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
        <span className="boldme biggerfont fadeintext">Ever felt truly alone?</span>
        <span className="boldme biggerfont fadeintext">Although everyone's journey is unique, similarities can be found with other fellow travelers.</span>
        <span className="boldme biggerfont fadeintext">A rough day? Or a triumph only you know about? Brand new exercise that helped you out?</span>
        <span className="boldme biggerfont fadeintext">Now you can read and share them all, and be NeverAlone!</span>
      </div>
      <div className='LoginFormMain'>
        <h2>Welcome back!</h2>
        <div>Please Log in or Sign up to join the community of people with similar struggles.</div>
        <div>Not ready to sign up yet? No problem, try signing in as demo!</div>
        <form onSubmit={handleSubmit} className='loginForm'>
          <ul className="redme errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
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
          <div className="buttonholder">
            <button type="submit" class="normalbutton">Log In</button>
          </div>
        </form>
        <div>
          <button type="button" class="normalbutton" onClick={() => { history.push('/signup') }}>Sign up</button>
          <span className="boldme">- OR -</span>
          <button type="button" class="normalbutton" onClick={demoHandle}>Sign in as demo</button>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
