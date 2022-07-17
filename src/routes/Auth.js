import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "../components/Auth.css";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, createNewAccount] = useState(false);
  const [error, setError] = useState("");
  const [logIn, setLogIn] = useState("새 계정 만들기");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    const auth = getAuth();
    try {
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      alert("정상적으로 처리되지 않았습니다.");
    }
  };

  const onGoogleSubmit = async (e) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMEssage = error.message;
        console.log(errorMEssage);
      });
  };

  const handleNewAccount = (e) => {
    createNewAccount((prev) => !prev);
    if (logIn == "새 계정 만들기") {
      setLogIn("로그인");
    } else {
      setLogIn("새 계정 만들기");
    }
  };

  return (
    <>
      <div className="auth-form">
        <div className="center">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
              className="em-ps"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
              className="em-ps"
            />
            <div></div>
            <input
              type="submit"
              id="login"
              value={newAccount ? "새 계정 만들기" : "로그인"}
              style={{ backgroundColor: "#ccccff" }}
            />
          </form>
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <button onClick={onGoogleSubmit} style={{ borderRadius: "20px" }}>
              구글 메일로 로그인
            </button>
            <button onClick={handleNewAccount} style={{ borderRadius: "20px" }}>
              {logIn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
