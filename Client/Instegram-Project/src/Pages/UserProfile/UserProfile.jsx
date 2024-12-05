import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Headeer/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import ProfilePhoto from "../../Components/UserComponents/ProfilePhoto.jsx";
import UserInfo from "../../Components/UserComponents/UserInfo.jsx";
import PostGrid from "../../Components/UserComponents/PostGrid.jsx";
import getAuthTokenFromCookie from "../../auth/auth.js";
import { usersCliant } from "../../api/axiosInstens.js";
import styles from "./UserProfile.module.css";
// importing global varient
import { useSelector } from "react-redux";

const UserProfile = () => {
  // catching user ID from the route
  const { id } = useParams();
  // storing user's data
  const [profileUser, setProfileUser] = useState(null);
  // indicates if the profile belongs to the logged-in user
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  // stores the currently selected post
  const [selectedPost, setSelectedPost] = useState(null);

  // accessing the global user variable
  const globalUser = useSelector((state) => state.user);

  // fetching user profile and verifying if the profile is the logged-in user's
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // if the user ID from the route matches the global user's ID,
        // use the global user data instead of fetching it again
        if (globalUser && globalUser.id === id) {
          setProfileUser(globalUser);
          setIsCurrentUser(true);
          return; // No need to fetch data from the server
        }

        // getting token
        const token = getAuthTokenFromCookie();

        // checking the logged-in user's ID with token
        const loggedUserResponse = await usersCliant.post(
          "/verify_token",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const loggedUserId = loggedUserResponse.data.userID;

        // checking if the logged user's ID matches the profile ID in the route
        setIsCurrentUser(loggedUserId === id);

        // fetching profile user data by ID
        const profileResponse = await usersCliant.get(`/${id}`);
        setProfileUser(profileResponse.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, globalUser]); // Add globalUser as a dependency to update if it changes

  if (!profileUser) return <div>Loading...</div>; // Handle loading state

  return (
    <div className={styles.userProfile}>
      <Header />

      {/* user profile header */}
      <section className={styles.userHeader}>
        <ProfilePhoto
          src={profileUser.profilePhoto || "https://via.placeholder.com/80"}
          alt="Profile"
        />
        <UserInfo
          username={profileUser.userName}
          // counters
          postsCount={profileUser.posts?.length || 0}
          friendsCount={profileUser.friendsCount || 0}
        />

        {/* showing settings button IF the profile is the one user that logged-in */}
        {isCurrentUser && (
          <button
            className={styles.settingsButton}
            onClick={() => alert("Open settings!")}
          >
            Settings
          </button>
        )}
      </section>

      {/* showing user's posts */}
      <PostGrid posts={profileUser.posts || []} onPostClick={setSelectedPost} />

      <Footer />
    </div>
  );
};

export default UserProfile;
