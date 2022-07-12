import React, { useEffect, useRef, useState } from "react";

function ImageFileInput() {
  const [preview, setPreview] = useState();
  const [imageLocal, setImageLocal] = useState(null);

  const topInputPreview = useRef();

  const onInputChange = (e) => {
    const newImageFile = e.target.files[0];
    setImageLocal(newImageFile);
  };

  const handleCancel = (e) => {
    setPreview("");
    setImageLocal(null);
  };

  useEffect(() => {
    if (!imageLocal) return;
    const objectUrl = URL.createObjectURL(imageLocal);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageLocal]);

  return (
    <>
      <img src={preview} alt="이미지 미리 보기" />
      <input
        type="file"
        accept="image/*"
        onChange={onInputChange}
        ref={topInputPreview}
      />
      {imageLocal && <button onClick={handleCancel}>delete image</button>}
    </>
  );
}

export default ImageFileInput;
