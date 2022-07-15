import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import Profile from "./routes/Profile";
import React from "react";
import CommonStyle from "./components/CommonStyle";

function Main({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonStyle />}>
          {isLoggedIn ? (
            <>
              <Route index element={<Home userObj={userObj} />}></Route>
              <Route
                path="profile"
                element={<Profile userObj={userObj} />}
              ></Route>
            </>
          ) : (
            <Route index element={<Auth />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
