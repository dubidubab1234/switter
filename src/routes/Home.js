import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { myDB, myStorageService } from "../myBase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Tweet from "../components/Tweet";
import FileInput from "../components/FileInput";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [fileImage, setFileImage] = useState("");
  const [url, setUrl] = useState();

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
    if (!fileImage) return;

    setUrl(URL.createObjectURL(fileImage));

    return () => {
      setUrl("");
      URL.revokeObjectURL(url);
    };
  }, [fileImage]);

  async function onSubmit(e) {
    e.preventDefault();
    let urlInObject;
    if (url) {
      urlInObject = `${userObj.uid}/${uuidv4()}`;

      const storageRef = ref(myStorageService, urlInObject);
      uploadBytes(storageRef, fileImage).then((snapShot) => {
        console.log("uploaded!");
      });
    }

    await addDoc(collection(myDB, "tweets"), {
      text: tweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      imageUrl: urlInObject,
    });
    setTweet("");
    setUrl("");
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
          <FileInput
            fileImage={fileImage}
            setFileImage={setFileImage}
            url={url}
            setUrl={setUrl}
          />
        </form>
        <div>
          {tweets.map((content) => {
            return (
              <Tweet
                key={content.id}
                content={content}
                isOwner={content.creatorId === userObj.uid}
                image={content.imageUrl}
                userObj={userObj}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
