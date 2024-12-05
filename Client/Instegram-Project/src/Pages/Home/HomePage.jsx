import styles from "./HomePage.module.css";
import OnePost from "../../Components/OnePost/OnePost";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import PostDetails from "../../Components/ComponentsPostDetails/PostDetails.jsx";

const getAllPostApi = async () => {
  try {
    const posts = await axios.get("http://localhost:3000/api/posts/all");
    if (!posts) {
      console.log("Post couldn't be found");
    } else {
      return posts.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const HomePage = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const selectedPost = allPosts.find((post) => post._id === selectedPostId);

  const shufflePosts = (posts) => {
    return posts.sort(() => Math.random() - 0.5);
  };

  const posts = async () => {
    try {
      const getAllPosts = await getAllPostApi();
      setAllPosts((prevPosts) => {
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
          allPosts.map((post, index) => {
            return (
              <OnePost
                key={post._id}
                post={post}
                setSelectedPostId={setSelectedPostId}
              />
            );
          })}
      </main>
      {selectedPost && (
        <PostDetails
          setSelectedPostId={setSelectedPostId}
          selectedPost={selectedPost}
          setAllPosts={setAllPosts}
          selectedPostId={selectedPostId}
        />
      )}
    </div>
  );
};

export default HomePage;
