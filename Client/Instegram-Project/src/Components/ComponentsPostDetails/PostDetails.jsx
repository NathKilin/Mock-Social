import React, { useState } from "react";
import styles from "./PostDetails.module.css";
import { saveCommentApi } from "../../api/commentApi.js";
import PostComments from "./Comments/Comments.jsx";
import PostImage from "./PostImage/PostImage.jsx";
import { useSelector } from "react-redux";
const PostDetails = ({
  selectedPostId,
  selectedPost,
  setSelectedPostId,
  setAllPosts,
}) => {
  const [newComment, setNewComment] = useState("");
  const userPhotoUrl = useSelector((state) => state.user.user.profileImage);
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const newCommentObj = { postId: selectedPost._id, text: newComment };
      const saveComment = await saveCommentApi(newCommentObj);
      if (saveComment?.data?.data) {
        const newCommentData = saveComment.data.data;
        newCommentData.profileImage = userPhotoUrl;
        setAllPosts((prev) =>
          prev.map((post) =>
            post._id === selectedPost._id
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    {
                      ...newCommentData,
                      userName: saveComment.data.data.userName || "Unknown",
                    },
                  ],
                }
              : post
          )
        );
        setNewComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={styles.modalBackdrop}
      onClick={() => setSelectedPostId(null)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={() => setSelectedPostId(null)}
        >
          :heavy_multiplication_x:
        </button>
        <div className={styles.imageSection}>
          <PostImage imageUrl={selectedPost.url} />
        </div>
        <div className={styles.commentsSection}>
          <PostComments
            comments={selectedPost.comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            setAllPosts={setAllPosts}
            selectedPostId={selectedPostId}
          />
        </div>
        <div className={styles.captionSection}>
          <h3 className={styles.caption}>{selectedPost.caption}</h3>
        </div>
      </div>
    </div>
  );
};
export default PostDetails;