import React, { useState } from "react";
import styles from "./Comment.module.css";
import commentApi from "../../api/commentApi.js";

const Comment = ({ selectedPost, setSelectedPostId, setallPosts }) => {
  const [newComment, setNewComment] = useState("");
  console.log(selectedPost);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      postId: selectedPost._id,
      text: newComment,
    };
    const saveComment = await commentApi.saveCommentApi(newCommentObj);
    console.log(saveComment);

    setallPosts((prev) => {
      const postToUpdateIdx = prev.findIndex(
        (post) => post._id === selectedPost._id
      );
      console.log("postToUpdateIdx", postToUpdateIdx);
      const clone = structuredClone(prev);
      clone[postToUpdateIdx].comments.push(saveComment.data.data);
      return clone;
    });

    console.log(saveComment);
    setNewComment("");
  };
  return (
    <div
      className={styles.modalBackdrop}
      onClick={() => {
        setSelectedPostId(null);
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.comments}>
          <h3>Comments</h3>
          <ul>
            {selectedPost.comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.addComment}>
          <input
            type="text"
            placeholder="Add comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add</button>
        </div>
        <button
          className={styles.closeButton}
          onClick={() => {
            setSelectedPostId(null);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Comment;
