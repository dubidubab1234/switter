import React, { useRef } from "react";

function FileInput({ fileImage, setFileImage, url, setUrl }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextImage = e.target.files[0];
    setFileImage(nextImage);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    setFileImage("");
    setUrl("");
  };

  return (
    <>
      <div>
        <img src={url} alt="이미지 미리보기" />
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
        />
        {fileImage && (
          <button type="button" onClick={handleClearClick}>
            X
          </button>
        )}
      </div>
    </>
  );
}

export default FileInput;
