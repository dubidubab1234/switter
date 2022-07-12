import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { myStorage } from "../myBase";

function Tweet({ contentInfo, userObj }) {
  const [editing, setEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(contentInfo.text);

  const handleDelete = async () => {
    await deleteDoc(doc(myStorage, "tweets", contentInfo.id));
  };

  let isOwner;
  if (contentInfo.creatorId === userObj.uid) {
    isOwner = true;
  }

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEditInput = (e) => {
    const newText = e.target.value;
    setEditInputValue(newText);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const wantToEdit = doc(myStorage, "tweets", contentInfo.id);
    await updateDoc(wantToEdit, {
      text: editInputValue,
    });
    setEditing(false);
  };

  return (
    <div>
      {!editing ? (
        <>
          <h4>{contentInfo.text}</h4>
          {isOwner && (
            <>
              <button onClick={handleDelete}>delete</button>
              <button onClick={handleEdit}>edit</button>
            </>
          )}
        </>
      ) : (
        <>
          <form onSubmit={handleUpdate}>
            <input
              value={editInputValue}
              placeholder="Edit your sweet"
              onChange={handleEditInput}
            />
            <button>update</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Tweet;
