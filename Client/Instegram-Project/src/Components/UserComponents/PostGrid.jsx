import React, { useState } from "react";
import Post from "./Post";
import styles from "./PostGrid.module.css";

const PostGrid = ({
  posts,
  onPostClick,
  selectedPostId,
  setSelectedPostId,
}) => {
  console.log(posts);
  selectedPostId && console.log(selectedPostId);

  return (
    <section className={styles.postsGrid}>
      {posts.map((post) => (
        <Post
          key={post._id}
          postId={post._id}
          image={post.url}
          text={post.caption}
          likes={post.likes}
          comments={post.comments}
          onClick={() => setSelectedPostId(post?._id)}
          setSelectedPostId={setSelectedPostId}
        />
      ))}
    </section>
  );
};

export default PostGrid;
