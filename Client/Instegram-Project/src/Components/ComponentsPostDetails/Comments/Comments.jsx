import React from "react";
import styles from "./comments.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import getAuthTokenFromCookie from "../../../auth/auth.js";
import { useSelector } from "react-redux";
import Like from "../../Likes/Likes.jsx";

const deleteCommentApi = async (id) => {
  const token = getAuthTokenFromCookie();

  try {
    const res = await axios.delete(`http://localhost:3000/api/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

const PostComments = ({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
  setAllPosts,
  selectedPostId,
}) => {
  const userGlobal = useSelector((state) => state.user);
  console.log(userGlobal);

  const deleteComment = (id) => {
    deleteCommentApi(id);

    setAllPosts((prev) =>
      prev.map((post) =>
        post._id === selectedPostId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment._id !== id),
            }
          : post
      )
    );
  };

  return (
    <div className={styles.commentsSection}>
      <div className={styles.comments}>
        <ul>
          {comments.map((comment, index) => (
            <li className={styles.liComment} key={index}>
              <div className="containerUserAndText">
                <strong>
                  user {comment?.userName ? comment.authorId : index}{" "}
                  {comment.user}:
                </strong>
                {comment.text}
              </div>
              <Like commentId={comment._id} />
              <div className="containerDelete">
                {comment.authorId._id === userGlobal?.user?._id && (
                  <DeleteOutlineIcon
                    onClick={() => deleteComment(comment._id)}
                    className={styles.deleteIcon}
                  />
                )}
              </div>
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
