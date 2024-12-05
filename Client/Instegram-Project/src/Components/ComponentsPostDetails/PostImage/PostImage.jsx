import React from "react";
import styles from "./postImage.module.css";

const PostImage = ({ imageUrl }) => {
  return (
    <div className={styles.imageSection}>
      <img src={imageUrl} alt="Post" className={styles.postImage} />
    </div>
  );
};

export default PostImage;
