import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { postsCliant } from "../../api/axiosInstens.js";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

const CreatePost = () => {
  const [caption, setCaption] = useState(""); // Caption for the post
  const [imageUrl, setImageUrl] = useState(null); // Uploaded image URL preview

  const handleOpenWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url", "camera"], // Add other sources if needed
        folder: "Social_Media_Posts", // Optional folder
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("Upload result:", result.info);
          setImageUrl(result.info.secure_url); // Save the image URL
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
      const formData = {
        url: imageUrl,
        caption,
      };

      const response = await postsCliant.post("/add", formData);
      console.log("Post created:", response.data);

      setImageUrl(null);
      setCaption("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <form className={styles.formPost} onSubmit={handleSubmit}>
        <button type="button" onClick={handleOpenWidget}>
          Upload Image/Video
        </button>

        {imageUrl && (
          <div className={styles.preview}>
            <img src={imageUrl} alt="Uploaded media" />
          </div>
        )}

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
