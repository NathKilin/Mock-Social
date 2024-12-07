import React from "react";
import Post from "./Post";
import styles from "./PostGrid.module.css";

const PostGrid = ({ posts, onPostClick }) => {
  console.log(posts);

  return (
    <section className={styles.postsGrid}>
      {posts.map((post) => (
        <Post
          key={post._id}
          image={post.url}
          text={post.caption}
          likes={post.likes}
          comments={post.comments}
          onClick={() => onPostClick(post)}
        />
      ))}
    </section>
  );
};

export default PostGrid;
