import React, { useState, useEffect } from "react";
import styles from "./Comment.module.css";
import axios from "axios";
import getAuthTokenFromCookie from "../../auth/auth";

const saveCommentApi = async (comment) => {
  try {
    const token = getAuthTokenFromCookie();
    if (!token) {
      console.log("no token");
    }
    const save = await axios.post(
      "http://localhost:3000/api/comments/add",
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(save);
    return save;
  } catch (error) {
    console.error(error);
  }
};

const Comment = ({ selectedPost, setSelectedPost }) => {
  // holding value of new comment
  const [newComment, setNewComment] = useState("");

  // Function to handle adding a new comment
  const handleAddComment = async () => {
    // Prevents adding empty comments
    if (newComment.trim() === "") return;
    const newCommentObj = {
      postId: selectedPost._id,
      text: newComment,
    };
    const saveComment = await saveCommentApi(newCommentObj);
    console.log(saveComment);

    setNewComment("");
  };
  return (
    <div
      className={styles.modalBackdrop}
      onClick={() => {
        setSelectedPost(null);
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.comments}>
          <h3>Comentários</h3>
          {/* Comments section header */}
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
          <button onClick={handleAddComment}>Enviar</button>
        </div>
        <button
          className={styles.closeButton}
          onClick={() => {
            setSelectedPost(null);
          }}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default Comment;
