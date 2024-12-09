import getAuthTokenFromCookie from "../../auth/auth.js";
import React, { useState, useEffect } from "react";
import styles from "./Likes.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import heart1 from "../../assets/heart1.png";
import heart2 from "../../assets/heart2.png";

const Likes = ({ postId, commentId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const globalUserHost = useSelector((state) => state.user);

  useEffect(() => {
    const fetchLikesPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/likes/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${getAuthTokenFromCookie()}`, // Using the token from cookies
            },
          }
        );
        const checkLiked = response.data.likedBy.some(
          (user) => user?._id === globalUserHost?.user?._id
        );
        if (checkLiked) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        }
        setLikesCount(response.data.likesCount);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    const fetchLikesComment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/likes/comments/${commentId}`, // Change to use commentId instead of postId
          {
            headers: {
              Authorization: `Bearer ${getAuthTokenFromCookie()}`, // Using the token from cookies
            },
          }
        );
        // console.log(response);
        const checkLiked = response.data.likedBy.some(
          (user) => user?._id === globalUserHost?.user?._id
        );
        if (checkLiked) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        }
        setLikesCount(response.data.likesCount);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    commentId && fetchLikesComment();
    !commentId && fetchLikesPost();
  }, [postId, globalUserHost]);

  const handleLike = async () => {
    try {
      const token = getAuthTokenFromCookie(); // Get token before API call
      const data = commentId ? { commentId } : { postId }; // Check if commentId exists, otherwise use postId
      if (hasLiked) {
        // Remove like
        console.log(commentId + "remove");
        await axios.delete(`http://localhost:3000/api/likes/remove`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data, // Sending data dynamically based on the condition
        });
        setLikesCount((prev) => Math.max(prev - 1, 0));
        setHasLiked(false);
        console.log("delete");
      } else {
        // Add like
        console.log(commentId + "add");
        await axios.post(
          `http://localhost:3000/api/likes/add`,
          data, // Sending data dynamically based on the condition
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikesCount((prev) => prev + 1);
        setHasLiked(true);
        // console.log("add");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className={styles.likesContainer}>
      <button
        onClick={handleLike}
        className={`${styles.likeButton} ${hasLiked ? styles.liked : ""}`}
        style={{
          backgroundImage: `url(${hasLiked ? heart2 : heart1})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "50px",
          height: "50px",
          border: "none",
          cursor: "pointer",
        }}
      ></button>
      <span className={styles.likeCount}>{likesCount}</span>
    </div>
  );
};

export default Likes;
