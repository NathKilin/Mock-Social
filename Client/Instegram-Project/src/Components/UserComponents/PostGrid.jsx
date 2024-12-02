import React from "react";
import Post from "./Post";
import styles from "./PostGrid.module.css";

const PostGrid = ({ posts, onPostClick }) => {
  return (
    <section className={styles.postsGrid}>
      {posts.map((post, index) => (
        <Post
          key={index}
          image={post.image}
          text={post.text}
          likes={post.likes}
          comments={post.comments}
          onClick={() => onPostClick(post)}
        />
      ))}
    </section>
  );
};

export default PostGrid;
