import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footerfunc from "./components/footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      {
        (sessionUser ?
          (
            <>
              <Navigation isLoaded={isLoaded} />
              <Footerfunc />
            </>
          ) :
          (
            <>
              <LoginFormPage />
              <Footerfunc />
            </>
          )
        )
      }
    </>
  );
}

export default App;
