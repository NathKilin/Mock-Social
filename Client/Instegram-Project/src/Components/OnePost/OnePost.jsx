import styles from "./OnePost.module.css";

const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const OnePost = ({ post, setSelectedPostId }) => {
  return (
    <div key={post._id} className={styles.post}>
      {isVideo(post.url) ? (
        <video
          className={styles.imagePlaceholder}
          src={post.url}
          controls
          autoPlay
          loop
          muted
        ></video>
      ) : (
        <img
          className={styles.imagePlaceholder}
          src={post.url}
          alt="photo or image"
        />
      )}
      <p className={styles.caption}>{post.caption}</p>
      <button
        onClick={() => {
          setSelectedPostId(post._id);
        }}
      >
        Comment
      </button>
    </div>
  );
};

export default OnePost;
