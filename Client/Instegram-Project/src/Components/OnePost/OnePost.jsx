import styles from "./OnePost.module.css";
import Likes from "../Likes/Likes.jsx";
import TextsmsIcon from "@mui/icons-material/Textsms";

const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const OnePost = ({ post, setSelectedPostId }) => {
  return (
    <div
      onClick={() => setSelectedPostId(post._id)}
      key={post._id}
      className={styles.post}
    >
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
      <div className={styles.containerCommentLike}>
        <button
          style={{}}
          onClick={() => {
            setSelectedPostId(post._id);
          }}
        >
          <TextsmsIcon />
        </button>
        <div onClick={(event) => event.stopPropagation()}>
          <Likes postId={post._id} />
        </div>
      </div>
    </div>
  );
};

export default OnePost;
