import React from "react";
import { Link } from "react-router-dom";

function Navigation({ userObj }) {
  let name;

  if (userObj.displayName === null) {
    name = userObj.email.split("@")[0];
    userObj.displayName = name;
  }
  return (
    <>
      <ul>
        <li>navigation</li>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/profile">
          <li>{userObj.displayName}의 Profile</li>
        </Link>
      </ul>
    </>
  );
}

export default Navigation;
