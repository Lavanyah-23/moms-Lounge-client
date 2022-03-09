import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage"

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Jumbotron } from "react-bootstrap";
import StoryDetail from "./pages/StoryDetail";


const Other = () => (
  <Jumbotron>
    <h1>Other</h1>
  </Jumbotron>
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className='App'>
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/other' element={<Other />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/stories/:id' element={<StoryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
