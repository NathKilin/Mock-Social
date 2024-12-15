import styles from "./OnePost.module.css";
import Likes from "../Likes/Likes.jsx";
import CommentIcon from "../../assets/comment1.png";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { colors } from "@mui/material";
import { Variable } from "lucide-react";
import { Margin } from "@mui/icons-material";

const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const OnePost = ({ post, setSelectedPostId }) => {
  const createdAtDate = new Date(post.createdAt);
  const currentDate = new Date();
  const differenceInMs = currentDate - createdAtDate;

  const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHours / 24);

  let timePosted;

  if (differenceInMinutes < 60) {
    timePosted = `${differenceInMinutes}m ago`;
  } else if (differenceInHours < 24) {
    timePosted = `${differenceInHours}h ago`;
  } else {
    timePosted = `${differenceInDays} days ago`;
  }
  console.log(timePosted);

  return (
    <div
      onClick={() => setSelectedPostId(post._id)}
      key={post._id}
      className={styles.post}
    >
      <section className={styles.postTop}>
        <div className={styles.topBar}>
          <Avatar>
            <AvatarImage
              style={{ objectFit: "cover" }}
              src={post.authorId?.profileImage}
              alt="profile-picture"
            />
            <AvatarFallback>
              {post.authorId?.userName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <p className={styles.userNameAndDateContainer}>
            {post.authorId?.userName}
            <span style={{ color: "var(--columbia-blue)" }}>
              {" "}
              • {timePosted}
            </span>
          </p>
        </div>
        <div className={styles.captionContainer}>
          <p className={styles.caption}>{post.caption}</p>
        </div>

        {isVideo(post.url) ? (
          <video
            className={styles.postImage}
            src={post.url}
            controls
            autoPlay
            loop
            muted
          ></video>
        ) : (
          <img
            className={styles.postImage}
            src={post.url}
            alt="photo or image"
          />
        )}
      </section>
      <section className={styles.postBottom}>
        <div className={styles.commentAndLikeIconsContainer}>
          <button
            className={styles.commentButtonContainer}
            onClick={() => {
              setSelectedPostId(post._id);
            }}
          >
            <img
              className={styles.commentIconImg}
              src={CommentIcon}
              alt="Comment Icon"
            />
            <p className={styles.commentsCount}>{post.commentsCount}</p>
          </button>
          <div onClick={(event) => event.stopPropagation()}>
            <Likes postId={post._id} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnePost;
