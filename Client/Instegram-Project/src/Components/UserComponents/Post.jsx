import styles from "./Post.module.css";

const Post = ({
  postId,
  image,
  text,
  likes,
  comments,
  onclick,
  setSelectedPostId,
}) => {
  return (
    <div
      className={styles.postContainer}
      onClick={() => setSelectedPostId(postId)}
    >
      <img src={image} alt="Post" className={styles.postImage} />
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
