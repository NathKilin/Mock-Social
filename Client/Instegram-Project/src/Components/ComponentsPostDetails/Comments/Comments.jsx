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
                <div className="containerUserAndText">
                <img
                    className={styles.imgCommentUser}
                    src={
                      comment?.authorId?._id === userGlobal?.user?._id
                        ? userGlobal.user.profileImage
                        : comment.authorId?.profileImage
                        ? comment.authorId.profileImage
                        : "https://files.oaiusercontent.com/file-JUQ2DU1tkmMTvkyd5j54Xt?se=2024-12-08T08%3A41%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D53f18caf-b073-499a-aaf6-a2c4fb5bec85.webp&sig=Vpv7emoXfuQxrDMoh4wjkJbaea4qhLMovda4wDRK95E%3D"
                    }
                    alt="photo user"
                  />
                  <strong>
                    {comment?.authorId === userGlobal?.user?._id
                      ? "You"
                      : "Unknown User"}
                    :
                  </strong>
                  {comment.text}
                </div>
                <Like commentId={comment._id} />
                <div className="containerDelete">
                  {(comment?.authorId?._id === userGlobal?.user?._id ||
                    comment?.authorId === userGlobal?.user?._id) && (
                    <DeleteOutlineIcon
                      onClick={() => deleteComment(comment._id)}
                      className={styles.deleteIcon}
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
