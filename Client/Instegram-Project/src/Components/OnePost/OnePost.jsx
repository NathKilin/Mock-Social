import styles from "./OnePost.module.css";
import Likes from "../Likes/Likes.jsx";
import CommentIcon from "../../assets/comment1.png";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
import { colors } from "@mui/material";
import { Variable } from "lucide-react";

const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

const OnePost = ({ post, setSelectedPostId }) => {
  const createdAtDate = new Date(post.createdAt);
  const currentDate = new Date();
  const differenceInMs = currentDate - createdAtDate;
  const differenceInHours = differenceInMs / (1000 * 60 * 60);
  const timePosted = Math.floor(differenceInHours);

  console.log(post);
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
              • {timePosted}h
            </span>
          </p>
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
            style={{ borderRadius: "16px" }}
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
        <div className={styles.captionContainer}>
          <p className={styles.caption}>{post.caption}</p>
        </div>
      </section>
    </div>
  );
};

export default OnePost;
