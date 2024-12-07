import styles from "./UserProfile.module.css";
import React, { useState, useEffect } from "react";

// react router dom
import { useParams } from "react-router-dom"; // Get ID from URL

// components
import ProfilePhoto from "../../Components/UserComponents/ProfilePhoto.jsx";
import UserInfo from "../../Components/UserComponents/UserInfo.jsx";
import PostGrid from "../../Components/UserComponents/PostGrid.jsx";

// redux
import { useSelector } from "react-redux"; // Access logged-in user from Redux

// axios
import axios from "axios";

const UserProfile = () => {
  const params = useParams();

  const [profileData, setProfileData] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const globalUser = useSelector((state) => state.user.user);
  console.log(profileData);

  const getProfileData = async (id) => {
    try {
      const resaults = await axios.get(`http://localhost:3000/api/user/${id}`);
      console.log(`"get user by id" resaults: ${resaults?.data.user}`);
      console.log(resaults);

      setProfileData(resaults?.data.user);
    } catch (error) {
      console.log(`error in getProfileData: ${error}`);
    }
  };

  useEffect(() => {
    if (params.id === globalUser._id) {
      console.log("current user");
      setIsCurrentUser(true);
      setProfileData(globalUser);
    } else {
      console.log(`isCurrentUser: ${isCurrentUser}`);
      console.log(`other user `);
      setIsCurrentUser(false);
      console.log(params.id);

      getProfileData(params.id);
    }
  }, [params]);

  // Handle loading state
  if (!profileData) return <div>Loading...</div>;

  return (
    <div className={styles.userProfile}>
      <section className={styles.userHeader}>
        <ProfilePhoto
          src={profileData.profileImage || "https://via.placeholder.com/80"}
          alt="Profile"
        />
        <UserInfo username={profileData.userName} />
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

      <PostGrid posts={profileData.userPosts || []} onPostClick={() => {}} />
    </div>
  );
};

export default UserProfile;
