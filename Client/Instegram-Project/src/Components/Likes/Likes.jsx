import React, { useState, useEffect } from "react";
import styles from './Likes.module.css';
import axios from "axios";
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; // Material-UI Icon

const Likes = ({ postId }) => {
  const [likesCount, setLikesCount] = useState(0); // State for the number of likes
  const [hasLiked, setHasLiked] = useState(false); // State to track if the user has liked the post

  // Fetch initial likes count
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/likes/${postId}`);
        setLikesCount(response.data.likesCount);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [postId]);

  // Handle like button click
  const handleLike = async () => {
    try {
      if (hasLiked) {
        // Remove like
        await axios.delete("http://localhost:3000/api/likes/remove", {
          data: { userId: "USER_ID", postId }, // Replace USER_ID with actual user ID
        });
        setLikesCount((prev) => Math.max(prev - 1, 0));
        setHasLiked(false);
      } else {
        // Add like
        await axios.post("http://localhost:3000/api/likes/add", {
          userId: "USER_ID", // Replace USER_ID with actual user ID
          postId,
        });
        setLikesCount((prev) => prev + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className={styles.likes}>
      <button onClick={handleLike} className={styles.likeButton}>
        <ThumbUpIcon
          color={hasLiked ? "primary" : "disabled"}
          fontSize="small"
        />
      </button>
      <span className={styles.likeCount}>{likesCount}</span>
    </div>
  );
};

export default Likes;
