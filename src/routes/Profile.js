import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import EditProfile from "./EditProfile";
import { getAuth, signOut } from "firebase/auth";

function Profile() {
  const navigate = useNavigate();
  function onLogoutClick() {
    const auth = getAuth();
    try {
      signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Navigation />
      <span>Profile</span>
      <button onClick={onLogoutClick}>Sign Out</button>
    </>
  );
}

export default Profile;
