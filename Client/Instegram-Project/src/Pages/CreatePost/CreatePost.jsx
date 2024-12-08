import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import addPostIcon from "../../assets/new-post.png";
import { postsCliant } from "../../api/axiosInstens.js";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleOpenWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ["local", "url", "camera"],
        folder: "Social_Media_Posts",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url);
        } else if (error) {
          console.error("Upload error:", error);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image.");
      return;
    }

    try {
      const formData = { url: imageUrl, caption };
      await postsCliant.post("/add", formData);
      setImageUrl(null);
      setCaption("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className={styles.createPost}>
      <form className={styles.formPost} onSubmit={handleSubmit}>
        <div className={styles.uploadContainer}>
          {!imageUrl ? (
            <>
              <img
                src={addPostIcon}
                alt="Add Post Icon"
                className={styles.addPostIcon}
              />
              <button
                type="button"
                onClick={handleOpenWidget}
                className={styles.uploadButton}
              >
                Upload Image/Video
              </button>
            </>
          ) : (
            <>
              <div className={styles.preview}>
                <label htmlFor="create">Create New Post</label>
                <img src={imageUrl} alt="Uploaded media" />
                <button
                  type="button"
                  className={styles.uploadButton}
                  onClick={handleOpenWidget}
                >
                  Choose a Different Upload
                </button>
              </div>
              <div className={styles.captionContainer}>
                <label htmlFor="caption">Caption:</label>
                <input
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Enter a caption"
                  required
                />
                <button type="submit" className={styles.createPostButton}>
                  Create Post
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
