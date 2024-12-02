import React, { useState } from "react";
import Header from "../../Components/Headeer/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import ProfilePhoto from "../../Components/UserComponents/ProfilePhoto.jsx";
import UserInfo from "../../Components/UserComponents/UserInfo.jsx";
import PostGrid from "../../Components/UserComponents/PostGrid.jsx";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const user = {
    username: "John Doe",
    profilePhoto: "https://via.placeholder.com/80", // Placeholder image
    postsCount: 20,
    friendsCount: 15,
  };
  const posts = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    // Placeholder for images
    image: `https://via.placeholder.com/150?text=Post+${index + 1}`,
    text: `This is the description of post ${index + 1}`,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
  }));

  const handlePostClick = (post) => {
    setSelectedPost(post);
    console.log("Post clicado:", post);
  };

  return (
    <div className={styles.userProfile}>
      <Header />

      <section className={styles.userHeader}>
        <ProfilePhoto src={user.profilePhoto} alt="Profile" />
        <UserInfo
          username={user.username}
          postsCount={user.postsCount}
          friendsCount={user.friendsCount}
        />
      </section>

      <PostGrid posts={posts} onPostClick={handlePostClick} />

      <Footer />
    </div>
  );
};

export default UserProfile;
