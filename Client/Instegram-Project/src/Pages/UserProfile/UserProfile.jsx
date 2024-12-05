import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Get ID from URL
import Header from "../../Components/Headeer/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import ProfilePhoto from "../../Components/UserComponents/ProfilePhoto.jsx";
import UserInfo from "../../Components/UserComponents/UserInfo.jsx";
import PostGrid from "../../Components/UserComponents/PostGrid.jsx";
import styles from "./UserProfile.module.css";
import { useSelector } from "react-redux"; // Access logged-in user from Redux

const UserProfile = () => {
  // const [searchParams, setSearchParams] = useSearchParams('id') 
  const params =  useParams()
  console.log(params.id);
    
  const [profileUser, setProfileUser] = useState(null); // Profile data of the user being viewed
  const [isCurrentUser, setIsCurrentUser] = useState(false); // Whether the logged-in user is viewing their own profile

  // Dummy data for testing
  const dummyUsers = [
    {
      id: "1234",
      userName: "Bob Bonson",
      profilePhoto: "https://via.placeholder.com/80",
      posts: [{ id: "1", content: "Post 1" }, { id: "2", content: "Post 2" }],
    },
    {
      id: "5678",
      userName: "Alice Smith",
      profilePhoto: "https://via.placeholder.com/80",
      posts: [{ id: "3", content: "Post 3" }],
    },
    {
      id: "9101",
      userName: "John Doe",
      profilePhoto: "https://via.placeholder.com/80",
      posts: [],
    },
  ];

  // Get the logged-in user's data from Redux
  const globalUser = useSelector((state) => state.user || { id: "1234" }); // Default to dummy logged-in user

  useEffect(() => {
    // Use dummy data to find the user being viewed
    const user = dummyUsers.find((u) => u.id === params.id);

    if (user) {
      setProfileUser(user); // Set the profile data for the user being viewed
    }

    // Check if the logged-in user matches the profile being viewed
    setIsCurrentUser(globalUser.id === params.id);
  }, [params.id, globalUser]);

  // Handle loading state
  if (!profileUser) return <div>Loading...</div>;

  return (
    <div className={styles.userProfile}>
      <Header />

      <section className={styles.userHeader}>
        {/* Display user profile photo */}
        <ProfilePhoto
          src={profileUser.profilePhoto || "https://via.placeholder.com/80"}
          alt="Profile"
        />
        {/* Display user info (username, post count, etc.) */}
        <UserInfo username={profileUser.userName} />

        {/* Conditionally render "Settings" or "Add Friend" button */}
        {isCurrentUser ? (
          <button
            className={styles.settingsButton}
            onClick={() => alert("Open settings!")}
          >
            Settings
          </button>
        ) : (
          <button
            className={styles.addFriendButton}
            onClick={() => alert("Friend request sent!")}
          >
            Add Friend
          </button>
        )}
      </section>

      {/* Display user's posts */}
      <PostGrid posts={profileUser.posts || []} onPostClick={() => {}} />

      <Footer />
    </div>
  );
};

export default UserProfile;
