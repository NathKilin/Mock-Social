import { Navigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import OnePost from "../../Components/OnePost/OnePost";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Comment from "../../Components/Comment/Comment.jsx";

const getAllPostApi = async () => {
  try {
    const posts = await axios.get("http://localhost:3000/api/posts/all");
    if (!posts) {
      console.log("Post couldn't be found");
    } else {
      console.log(posts.data);
      return posts.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const HomePage = ({ isLogIn }) => {
  if (!isLogIn) {
    return <Navigate to="/login" replace />;
  }
  const [selectedPost, setSelectedPost] = useState(null);
  const [allPosts, setallPosts] = useState([]);
  console.log(isLogIn);

  const shufflePosts = (posts) => {
    return posts.sort(() => Math.random() - 0.5);
  };

  const posts = async () => {
    try {
      const getAllPosts = await getAllPostApi();
      console.log(getAllPosts);
      setallPosts((prevPosts) => {
        return [...prevPosts, ...shufflePosts(getAllPosts)];
      });
      return getAllPosts;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    posts();
  }, []);

  return (
    <div className="home-page">
      <main className={styles.feed}>
        {allPosts &&
          allPosts.map((post) => {
            return (
              <OnePost
                setSelectedPost={setSelectedPost}
                key={post._id}
                post={post}
              />
            );
          })}
      </main>
      {selectedPost && (
        <Comment
          setSelectedPost={setSelectedPost}
          selectedPost={selectedPost}
        />
      )}{" "}
    </div>
  );
};

export default HomePage;
