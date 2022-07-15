import Main from "../Main";
import React, { useEffect, useState } from "react";
import myBase from "../myBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [isLoggedIn]);

  const style = {
    textAlign: "center",
  };

  return (
    <>
      {init ? (
        <Main isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "initializing..."
      )}
      <footer style={style}>&copy; switter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
