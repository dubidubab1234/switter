import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ userObj }) {
  let name;

  if (userObj.displayName === null) {
    name = userObj.email.split("@")[0];
    userObj.displayName = name;
  }
  return (
    <>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <ul>
          <Link to="/" className="navbar">
            <li>Home</li>
          </Link>
          <Link to="/profile" className="navbar">
            <li>{userObj.displayName}의 Profile</li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
