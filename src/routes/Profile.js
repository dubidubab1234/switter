import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { myDB } from "../myBase";
import Tweet from "../components/Tweet";
import "../components/Profile.css";

function Profile({ userObj }) {
  const [tweets, setTweets] = useState([]);

  const navigate = useNavigate();
  function onLogoutClick() {
    const auth = getAuth();
    try {
      signOut(auth);
      navigate("/");
    } catch (error) {
      alert("Failed");
    }
  }

  const getMyTweets = async () => {
    const q = query(
      collection(myDB, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, async (snapShot) => {
      setTweets([]);
      const tweetsArray = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets(tweetsArray);
    });
  };
  useEffect(() => {
    getMyTweets();
  }, [tweets]);

  return (
    <>
      <div className="background">
        <Navigation userObj={userObj} />
        <button onClick={onLogoutClick} className="logout">
          로그아웃
        </button>

        {tweets && (
          <>
            <h3>My sweets</h3>
            <div>
              {tweets.map((comment) => {
                return (
                  <Tweet
                    key={comment.id}
                    contentInfo={comment}
                    userObj={userObj}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
