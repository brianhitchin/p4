import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Userlanding from "./components/loginlanding";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footerfunc from "./components/footer";
import Innernav from "./components/InnerNav";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <Switch>
        <Route path="/signup" exact>
          <SignupFormPage />
          <Footerfunc />
        </Route>
        <Route path="/login" exact>
          <LoginFormPage />
          <Footerfunc />
        </Route>
        <Route path='/' exact>
          <Navigation isLoaded={isLoaded} />
          <Innernav />
          <Userlanding />
          <Footerfunc />
        </Route>
      </Switch>
    </>
  );
}

export default App;
