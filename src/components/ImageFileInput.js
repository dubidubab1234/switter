import React, { useEffect, useRef, useState } from "react";

function ImageFileInput({ attachment, setAttachment }) {
  const onInputChange = (e) => {
    const newImageFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(newImageFile);
  };

  const handleCancel = (e) => {
    setAttachment(null);
  };

  return (
    <>
      <img src={attachment} alt="이미지 미리 보기" />
      <input type="file" accept="image/*" onChange={onInputChange} />
      {attachment && <button onClick={handleCancel}>delete image</button>}
    </>
  );
}

export default ImageFileInput;
