import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

function Home() {
  return (
    <>
      <span>Home</span>
      <Link to="/profile">Link</Link>
    </>
  );
}

export default Home;
