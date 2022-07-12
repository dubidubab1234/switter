import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { myStorage } from "../myBase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from "../components/Tweet";
import FileInputTop from "../components/FileInputTop";

function Home({ userObj }) {
  const [tweets, setTweets] = useState([]);

  const q = query(
    collection(myStorage, "tweets"),
    orderBy("createdAt", "desc")
  );

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
      <Navigation />
      <div>
        <FileInputTop userObj={userObj} />
        <div>
          {tweets.map((comment) => {
            return <Tweet key={comment.id} content={comment.text} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
