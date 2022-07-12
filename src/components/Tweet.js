import React from "react";

function Tweet() {
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
