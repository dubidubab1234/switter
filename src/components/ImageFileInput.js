import React from "react";
import "./ImageFileInput.css";

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
      <div className="img-center">
        {attachment && <img src={attachment} alt="미리 보기" />}
        <div>
          <input type="file" accept="image/*" onChange={onInputChange} />
        </div>
        {attachment && (
          <button onClick={handleCancel} className="delete-button">
            지우기
          </button>
        )}
      </div>
    </>
  );
}

export default ImageFileInput;
