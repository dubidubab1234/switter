import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import Profile from "./routes/Profile";
import EditProfile from "./routes/EditProfile";
import React from "react";
import Navigation from "./components/Navigation";
import App from "./components/App";

function Main({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="profile/edit" element={<EditProfile />}></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
