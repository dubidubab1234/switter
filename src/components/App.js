import Main from "../Main";
import React, { useEffect, useState } from "react";
import myBase from "../myBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [isLoggedIn]);

  return (
    <>
      {init ? <Main isLoggedIn={isLoggedIn} /> : "initializing..."}
      <footer>&copy; switter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
