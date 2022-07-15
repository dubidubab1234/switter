import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { myDB } from "../myBase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from "../components/Tweet";
import FileInputTop from "../components/FileInputTop";
import "../components/Home.css";

function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  const q = query(collection(myDB, "tweets"), orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(q, async (snapShot) => {
      setTweets([]);
      const tweetsArray = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets(tweetsArray);
    });
  }, []);

  return (
    <>
      <div className="background">
        <Navigation userObj={userObj} />
        <div className="input-in-home">
          <FileInputTop userObj={userObj} />
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
        </div>
      </div>
    </>
  );
}

export default Home;
