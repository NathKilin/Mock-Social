import styles from "./OnePost.module.css";
import Likes from "../Likes/Likes.jsx";
import CommentIcon from "../../assets/comment1.png";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";

const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const OnePost = ({ post, setSelectedPostId }) => {
  console.log(post.authorId?.profileImage);
  console.log(post);

  return (
    <div
      onClick={() => setSelectedPostId(post._id)}
      key={post._id}
      className={styles.post}
    >
      <section className={styles.postTop}>
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
            style={{ borderRadius: "16px" }}
          />
        )}
      </section>
      <section className={styles.postBottom}>
        <div className={styles.containerCommentLike}>
          <button
            className={styles.commentIcon}
            onClick={() => {
              setSelectedPostId(post._id);
            }}
          >
            <img src={CommentIcon} alt="Comment Icon" />
            <p>count</p>
          </button>
          <div onClick={(event) => event.stopPropagation()}>
            <Likes postId={post._id} />
          </div>
        </div>
        <div className={styles.captionContainer}>
          <Avatar>
            <AvatarImage
              src={post.authorId?.profileImage}
              alt="profile-picture"
            />
            <AvatarFallback></AvatarFallback>
            {/* <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback> */}
          </Avatar>
          <p className={styles.caption}>{post.caption}</p>
        </div>
        <p style={{ padding: "12px" }}>
          view all <span>(add number)</span> comments
        </p>
      </section>
    </div>
  );
};

export default OnePost;
