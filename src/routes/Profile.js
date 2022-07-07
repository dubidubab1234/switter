import React from "react";
import { Link } from "react-router-dom";
import EditProfile from "./EditProfile";

function Profile() {
  return (
    <>
      <span>Profile</span>
      <Link to="edit">EditProfile</Link>
    </>
  );
}

export default Profile;
