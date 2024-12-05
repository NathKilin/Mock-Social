import getAuthTokenFromCookie from "../../auth/auth.js";
import React, { useState, useEffect } from "react";
import styles from "./Likes.module.css";
import axios from "axios";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Likes = ({ postId }) => {
  const [likesCount, setLikesCount] = useState(0); // State for the number of likes
  const [hasLiked, setHasLiked] = useState(false); // State to track if the user has liked the post

  // Fetch initial likes count
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/likes/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${getAuthTokenFromCookie()}`, // Using the token from cookies
            },
          }
        );
        console.log(response);
        response.data.likedBy.find((user) => {
          user._id === globalUser.id;
        });
        setLikesCount(response.data.likesCount);

        setHasLiked((prev) => !prev); // Assuming API response includes hasLiked
        //response.data.hasLiked
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [postId]);

  // Handle like button click
  const handleLike = async () => {
    try {
      const token = getAuthTokenFromCookie(); // Get token before API call

      if (hasLiked) {
        // Remove like
        await axios.delete(`http://localhost:3000/api/likes/remove`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { postId },
        });
        setLikesCount((prev) => Math.max(prev - 1, 0));
        setHasLiked(false);
      } else {
        // Add like
        await axios.post(
          `http://localhost:3000/api/likes/add`,
          { postId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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