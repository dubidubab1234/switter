import { deleteDoc, doc, writeBatch } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { myDB, myStorageService } from "../myBase";
import { v4 as uuidv4 } from "uuid";

function Tweet({ content, isOwner, image, userObj }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(content.text);
  const [newImage, setNewImage] = useState();
  const [editPreview, setEditPreview] = useState();

  const imageRef = useRef();
  const editImageRef = useRef();

  const imageSrc = getDownloadURL(ref(myStorageService, image)).then(
    (imageURlFromStorage) => {
      if (imageRef.current && imageURlFromStorage) {
        imageRef.current.src = imageURlFromStorage;
        setNewImage(imageURlFromStorage);
        setEditPreview(imageURlFromStorage);
      }
    }
  );

  function onDeleteClick() {
    const ok = window.confirm("Do you want to delete this sweet?");
    if (ok) {
      deleteDoc(doc(myDB, "tweets", content.id));
    }
  }

  function onEditClick() {
    setEditing(true);
  }

  function handleEditImage(e) {
    setEditPreview(URL.createObjectURL(e.target.files[0]));
  }

  function handleClearClick(e) {
    if (!editImageRef.current) return;

    getDownloadURL(ref(myStorageService, image)).then((imageURlFromStorage) => {
      if (editImageRef.current && imageURlFromStorage) {
        editImageRef.current.src = imageURlFromStorage;
        setNewImage(imageURlFromStorage);
        setEditPreview(imageURlFromStorage);
      }
    });
  }

  function onCancelClick() {
    setEditing(false);
    setNewTweet(content.text);
  }

  async function onSubmit(e) {
    e.preventDefault();
    let urlInObject;
    if (editImageRef.current) {
      urlInObject = `${userObj.uid}/${uuidv4()}`;
      const storageRef = ref(myStorageService, urlInObject);
      uploadBytes(storageRef, editImageRef.current.files[0]).then(
        (snapShot) => {
          console.log("uploaded!");
        }
      );
    }

    const batch = writeBatch(myDB);
    const newTweetRef = doc(myDB, "tweets", content.id);
    batch.update(newTweetRef, { text: newTweet, imageUrl: urlInObject });
    await batch.commit();
    setEditing(false);
  }

  function onChangeInput(e) {
    setNewTweet(e.target.value);
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your sweet"
              value={newTweet}
              onChange={onChangeInput}
            />
            <img src={editPreview} alt="편집 이미지 미리 보기" />
            <input
              type="file"
              accept="image/*"
              ref={editImageRef}
              onChange={handleEditImage}
            />
            <input type="submit" value="update" />
          </form>
          {editPreview && (
            <button type="button" onClick={handleClearClick}>
              origin image
            </button>
          )}
          <button onClick={onCancelClick}>cancel</button>
        </>
      ) : (
        <>
          <h4>{content.text}</h4>
          <img ref={imageRef} src="" />
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>delete</button>
              <button onClick={onEditClick}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
