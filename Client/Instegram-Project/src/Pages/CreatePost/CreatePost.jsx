import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import axios from "axios";
import getAuthTokenFromCookie from "../../auth/auth.js";

const creatPostApi = async (url, caption) => {
  try {
    const token = getAuthTokenFromCookie();
    console.log(token);

    if (!token) {
      throw new Error("User is not authenticated.");
    }
    const post = { url, caption };
    const res = await axios.post("http://localhost:3000/api/posts/add", post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const CreatePost = () => {
  const [url, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      alert("Media URL is required.");
      return;
    }
    try {
      const newPost = await creatPostApi(url, caption);
      console.log(newPost);

      setMediaUrl("");
      setCaption("");
    } catch (error) {
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <form className={styles.formPost} onSubmit={handleSubmit}>
        <div className={styles.containerMediaUrl}>
          <label htmlFor="media-url">Image/Video URL:</label>
          <input
            type="url"
            id="media-url"
            value={url}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Paste the image or video URL"
            required
          />
        </div>
        <div className={styles.containerCaption}>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter a caption"
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
