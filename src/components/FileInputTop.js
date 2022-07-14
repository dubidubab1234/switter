import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { myDB, storageService } from "../myBase";
import ImageFileInput from "./ImageFileInput";
import { v4 as uuidv4 } from "uuid";

function FileInputTop({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState(null); //data_url 형식의 이미지 레퍼런스

  async function onSubmit(e) {
    e.preventDefault();

    const name = userObj.email.split("@")[0];

    let attachmentUrl = null;
    let attachmentReference = "";
    if (attachment) {
      attachmentReference = `${userObj.uid}/${uuidv4()}`;
      const attachmentRef = ref(storageService, attachmentReference);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(ref(storageService, attachmentRef));
    }

    const newTweet = {
      text: tweet,
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      attachmentUrl,
      attachmentReference,
      name,
    };
    await addDoc(collection(myDB, "tweets"), newTweet);

    setTweet("");
    setAttachment(null);
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
        <ImageFileInput attachment={attachment} setAttachment={setAttachment} />
        <input type="submit" value="send" />
      </form>
    </>
  );
}

export default FileInputTop;
