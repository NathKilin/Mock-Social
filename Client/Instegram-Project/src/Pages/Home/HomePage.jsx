import styles from "./HomePage.module.css";
import OnePost from "../../Components/OnePost/OnePost";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import PostDetails from "../../Components/ComponentsPostDetails/PostDetails.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const getAllPostApi = async (navigate) => {
  try {
    const posts = await axios.get("http://localhost:3000/api/posts/all");
    console.log(posts);
    if (!posts) {
      console.log("Post couldn't be found");
      navigate("/Error");
    } else {
      return posts.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const shufflePosts = (posts) => {
  return [...posts].sort(() => Math.random() - 0.5);
};

const HomePage = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  const selectedPost = allPosts.find((post) => post._id === selectedPostId);

  const posts = async () => {
    try {
  const getAllPosts = await getAllPostApi(navigate);
      if (getAllPosts && getAllPosts.length > 0) {
        const sortedPosts = sortPostsByDate(getAllPosts);
        setAllPosts(sortedPosts);
      } else {
        console.log("No posts found");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    posts();
  }, []);

  if (allPosts.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
