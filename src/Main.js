import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import Profile from "./routes/Profile";
import React from "react";

function Main({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="profile"
              element={<Profile userObj={userObj} />}
            ></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
