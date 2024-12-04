import React from "react";
import styles from "./comments.module.css";

const PostComments = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
}) => {
  return (
    <div className={styles.commentsSection}>
      <div className={styles.comments}>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>
                user {index} {comment.user}:
              </strong>{" "}
              {comment.text}
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
    </div>
  );
};

export default PostComments;
