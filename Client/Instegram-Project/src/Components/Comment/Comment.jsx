import React, { useState, useEffect } from "react";
import styles from "./Comment.module.css";
import axios from "axios";

const saveCommentApi = async (comment) => {
  try {
    const save = await axios.post(
      "http://localhost:3000/api/comments/add",
      comment
    );
    console.log(save);
    return save;
  } catch (error) {
    console.error(error);
  }
};

const Comment = ({ selectedPost, setSelectedPost }) => {
  console.log(selectedPost);

  const [comments, setComments] = useState([]);
  // holding value of new comment
  const [newComment, setNewComment] = useState("");
  // fake API function to fetch
  const fetchComments = () => {
    // const allCommentsPerPost = axios.get("");
    return [
      { id: 1, user: "User 1", text: "My maaaan!" },
      { id: 2, user: "User 2", text: "Mazal Tov" },
    ];
  };
  // simulating loading comments when the modal opens
  useEffect(() => {
    // fake API call
    const simulatedComments = fetchComments();
    // Setting the fetched comments in the state
    setComments(simulatedComments);
    // Empty dependency array ensures this runs only once when the modal is rendered
  }, []);
  // Function to handle adding a new comment
  const handleAddComment = async () => {
    // Prevents adding empty comments
    if (newComment.trim() === "") return;
    const newCommentObj = {
      postId: selectedPost._id,
      text: newComment,
      authorId: "6743986b0b73dc1a2e25e4b0",
    };
    const saveComment = await saveCommentApi(newCommentObj);
    console.log(saveComment);

    // Updates the comments state with the new comment
    setComments([...comments, newCommentObj]);
    // Clears the input field
    setNewComment("");
  };
  return (
    <div
      className={styles.modalBackdrop}
      onClick={() => {
        setSelectedPost(null);
      }}
    >
      {/* Backdrop that closes the modal when clicked */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Modal content container; click events inside do not close the modal */}
        <div className={styles.imagePlaceholder}>
          {/* {selectedPost.imagePlaceholder}{" "} */}
          {/* Displays the post's image or placeholder */}
        </div>
        {/* <p className={styles.caption}>{selectedPost.caption}</p> */}
        {/* Displays the caption of the post */}
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
