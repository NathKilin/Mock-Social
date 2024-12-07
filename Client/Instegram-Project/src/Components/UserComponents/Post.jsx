import styles from "./Post.module.css";

const Post = ({ image, text, likes, comments, onclick }) => {
  console.log(comments);

  return (
    <div className={styles.postContainer} onClick={onclick}>
      <img
        src={image || "https://via.placeholder.com/80"}
        alt="Post"
        className={styles.postImage}
      />
      <div className={styles.postHover}>
        <p className={styles.postText}>
          {text?.length > 20 ? `${text?.slice(0, 20)}...` : text}
        </p>
        <div className={styles.postStats}>
          <span>{likes || 0} ❤️</span>
          <span>{comments?.length || 0} 💬</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
