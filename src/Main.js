import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import Profile from "./routes/Profile";
import EditProfile from "./routes/EditProfile";
import { useState } from "react";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}></Route>
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
