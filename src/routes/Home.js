import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { myStorage } from "../myBase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
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

  async function onSubmit(e) {
    e.preventDefault();
    await addDoc(collection(myStorage, "tweets"), {
      text: tweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
    });
    setTweet("");
  }
  function onChange(e) {
    setTweet(e.target.value);
  }

  return (
    <>
      <Navigation />
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="what's going on?"
            maxLength={120}
          />
          <input type="submit" value="send" />
        </form>
        <div>
          {tweets.map((comment) => {
            return <h4 key={comment.id}>{comment.text}</h4>;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
