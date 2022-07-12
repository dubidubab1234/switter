import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { myDB, storageService } from "../myBase";

function Tweet({ contentInfo, userObj }) {
  const [editing, setEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(contentInfo.text);

  const handleDelete = async () => {
    if (contentInfo.attachmentReference) {
      const imgRef = ref(storageService, contentInfo.attachmentReference);
      deleteObject(imgRef);
    }
    await deleteDoc(doc(myDB, "tweets", contentInfo.id));
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
    const wantToEdit = doc(myDB, "tweets", contentInfo.id);
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
          {contentInfo.attachmentUrl && <img src={contentInfo.attachmentUrl} />}
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
