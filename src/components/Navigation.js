import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <ul>
        <li>navigation</li>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/profile">
          <li>Profile</li>
        </Link>
        <Link to="/profile/edit">
          <li>EditProfile</li>
        </Link>
      </ul>
    </>
  );
}

export default Navigation;
