import React from "react";
import Post from "./Post";
import styles from "./PostGrid.module.css";

const PostGrid = ({ posts }) => {
  return (
    <section className={styles.postsGrid}>
      {posts.map((post) => (
        <Post
          key={post._id}
          image={post.url}
          text={post.caption}
          likes={post.likes}
          comments={post.comments}
          // onclick={(e) => {e.target}}
        />
      ))}
    </section>
  );
};

export default PostGrid;
