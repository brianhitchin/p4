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
import AllStories from "./components/AllStory";
import AllExercises from "./components/AllExercise";
import OneStory from "./components/SingleStory";
import SingleExercise from "./components/SingleExercise";
import CSlanding from "./components/CSlanding";
import CElanding from "./components/CElanding";
import Home from "./components/AllGroups";

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
        <Route path="/testing" exact>
          <Navigation isLoaded={isLoaded} />
          <Innernav />
          <Home />
          <Footerfunc />
        </Route>
        <Route path='/cstory'>
          <Navigation isLoaded={isLoaded} />
          <CSlanding />
          <Footerfunc />
        </Route>
        <Route path='/cexercise'>
          <Navigation isLoaded={isLoaded} />
          <CElanding />
          <Footerfunc />
        </Route>
        <Route path='/story/:storyId'>
          <Navigation isLoaded={isLoaded} />
          <Innernav />
          <OneStory />
          <Footerfunc />
        </Route>
        <Route path='/exercise/:exerciseId'>
          <Navigation isLoaded={isLoaded} />
          <Innernav />
          <SingleExercise />
          <Footerfunc />
        </Route>
        <Route path='/story' exact>
          <Navigation isLoaded={isLoaded} />
          <Innernav />
          <AllStories />
          <Footerfunc />
        </Route>
        <Route path='/exercise' exact>
          <Navigation isLoaded={isLoaded} />
          <Innernav />
          <AllExercises />
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
