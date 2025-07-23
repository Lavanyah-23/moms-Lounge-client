import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Forum from "./pages/Forum";
import PromptLibrary from "./pages/PromptLibrary";
import Marketplace from "./pages/Marketplace";
import MyPosts from "./pages/MyPosts";
import AskAI from "./pages/AskAI";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import StoryDetail from "./pages/StoryDetail";
import Category from "./pages/Category";
import AddMyStory from "./pages/StoryForm";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/prompt-library" element={<PromptLibrary />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/category" element={<Category />} />
        {/* <Route path='/addmystory' element={<AddMyStory />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
