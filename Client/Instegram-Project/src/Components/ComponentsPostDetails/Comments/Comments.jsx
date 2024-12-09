import React, { useEffect, useRef } from "react";
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

  // Ref para o container de comentários
  const commentsRef = useRef(null);

  // Sempre rola até o final quando novos comentários são adicionados
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [comments]);

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
      <div className={styles.comments} ref={commentsRef}>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li className={styles.liComment} key={index}>
                <div className={styles.containerUserAndText}>
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
                    {comment?.authorId === userGlobal?.user?._id
                      ? "You"
                      : comment?.authorId?.userName || "Unknown User"}
                  </strong>
                  {comment.text}
                </div>
                <div className={styles.likeButton}>
                  <Like commentId={comment._id} />
                </div>
                <div className={styles.containerdelete}>
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
