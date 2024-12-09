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
    await axios.delete(`http://localhost:3000/api/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  const deleteComment = async (id) => {
    try {
      await deleteCommentApi(id);
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
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className={styles.commentsSection}>
      <div className={styles.comments}>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li className={styles.liComment} key={index}>
<<<<<<< HEAD
                <div className={styles.containerUserAndText}>
                  
                <strong>
=======
                <div className="containerUserAndText">
                  <img
                    className={styles.imgCommentUser}
                    src={
                      comment?.authorId?._id === userGlobal?.user?._id
                        ? userGlobal.user.profileImage
                        : comment.authorId?.profileImage
                        ? comment.authorId.profileImage
                        : comment.profileImage || ""
                    }
                    alt="photo user"
                  />
                  <strong>
>>>>>>> 589e75f7f58636c76b3d0ac0f6d655e398f4ac76
                    {comment?.authorId === userGlobal?.user?._id
                      ? "You"
                      : comment?.authorId?.userName || "Unknown User"}
                  </strong>
                  {comment.text}
                </div>
                      <div className={styles.likeButton}
                      >
                        <Like commentId={comment._id}/>
                      </div>
                <div className={styles.containerdelete}>
                  {(comment?.authorId?._id === userGlobal?.user?._id ||
                    comment?.authorId === userGlobal?.user?._id) && (
                      <DeleteOutlineIcon
                      onClick={() => deleteComment(comment._id)}
                      className={styles.deleteIcon}
                      style={{ fontSize: '32px' }} // Ajusta o tamanho do ícone
                    />
                    
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
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
