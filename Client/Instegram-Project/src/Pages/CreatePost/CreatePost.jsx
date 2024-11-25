import React, { useState } from "react";
import styles from "./CreatePost.module.css";

const creatPost = async (mediaUrl, caption) => {
  try {
    const post = { mediaUrl, caption };
    const res = await axios.post("http://localhost:3000/api/post", post);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const CreatePost = () => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mediaUrl || !caption) {
      alert("Both fields are required.");
      return;
    }
    try {
      const newPost = creatPost(mediaUrl, caption);
      console.log("Post created:", newPost);
    } catch (error) {
      console.log(error);
    } finally {
      setMediaUrl("");
      setCaption("");
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
            value={mediaUrl}
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
      {/* <div className="post-preview">
        <h3>Preview</h3>
        {mediaUrl && (
          <img
            src={mediaUrl}
            alt="Media Preview"
            style={{ maxWidth: "100%" }}
          />
        )}
        {caption && <p>{caption}</p>}
      </div> */}
    </div>
  );
};

export default CreatePost;
