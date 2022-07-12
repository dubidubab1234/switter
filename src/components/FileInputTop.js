import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { myStorage } from "../myBase";
import ImageFileInput from "./ImageFileInput";

function FileInputTop({ userObj }) {
  const [tweet, setTweet] = useState("");
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
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="what's going on?"
          maxLength={120}
        />
        <ImageFileInput />
        <input type="submit" value="send" />
      </form>
    </>
  );
}

export default FileInputTop;
