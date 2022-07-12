import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { myStorage } from "../myBase";

function Tweet({ contentInfo, userObj }) {
  const handleDelete = async () => {
    await deleteDoc(doc(myStorage, "tweets", contentInfo.id));
  };

  let isOwner;
  if (contentInfo.creatorId === userObj.uid) {
    isOwner = true;
  }

  const handleEdit = () => {};

  return (
    <div>
      <h4>{contentInfo.text}</h4>
      {isOwner && (
        <>
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleEdit}>edit</button>
        </>
      )}
    </div>
  );
}

export default Tweet;
