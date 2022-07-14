import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import React, { useState } from "react";
import { myDB, storageService } from "../myBase";
import ImageFileInput from "./ImageFileInput";
import { v4 as uuidv4 } from "uuid";

function Tweet({ contentInfo, userObj }) {
  const [editing, setEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(contentInfo.text);
  const [editImage, setEditImage] = useState(contentInfo.attachmentUrl);

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
    if (editImage) {
      let attachmentUrl = null;
      let attachmentReference = "";
      const dataType = editImage.substr(0, 5);
      if (dataType == "data:") {
        // 기존 이미지 삭제
        if (contentInfo.attachmentRef) {
          const imgRef = ref(storageService, contentInfo.attachmentReference);
          deleteObject(imgRef);
        }

        //새로운 이미지를 입력했을 때

        attachmentReference = `${userObj.uid}/${uuidv4()}`;
        const attachmentRef = ref(storageService, attachmentReference);
        const response = await uploadString(
          attachmentRef,
          editImage,
          "data_url"
        );
        attachmentUrl = await getDownloadURL(
          ref(storageService, attachmentRef)
        );

        const wantToEdit = doc(myDB, "tweets", contentInfo.id);
        await updateDoc(wantToEdit, {
          text: editInputValue,
          attachmentUrl,
          attachmentReference,
        });
      }
    } else {
      if (contentInfo.attachmentReference) {
        const imgRef = ref(storageService, contentInfo.attachmentReference);
        deleteObject(imgRef);
      }

      const wantToEdit = doc(myDB, "tweets", contentInfo.id);
      await updateDoc(wantToEdit, {
        text: editInputValue,
        attachmentUrl: null,
        attachmentReference: "",
      });
    }
    setEditing(false);
  };

  return (
    <div>
      {!editing ? (
        <>
          <h4>{contentInfo.text}</h4>
          {contentInfo.attachmentUrl && <img src={contentInfo.attachmentUrl} />}
          <h6>{contentInfo.name}</h6>
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
            <ImageFileInput
              attachment={editImage}
              setAttachment={setEditImage}
            />
            <input type="submit" value="update" />
          </form>
        </>
      )}
    </div>
  );
}

export default Tweet;
