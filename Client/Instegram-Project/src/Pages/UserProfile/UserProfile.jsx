import styles from "./UserProfile.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfilePhoto from "../../Components/UserComponents/ProfilePhoto.jsx";
import UserInfo from "../../Components/UserComponents/UserInfo.jsx";
import PostGrid from "../../Components/UserComponents/PostGrid.jsx";
import PostDetails from "../../Components/ComponentsPostDetails/PostDetails.jsx";
import { useSelector } from "react-redux";
import axios from "axios";

const UserProfile = () => {
  const params = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const globalUser = useSelector((state) => state.user.user);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const selectedPost = profileData?.userPosts?.find(
    (post) => post._id === selectedPostId
  );

  const getProfileData = async (id) => {
    try {
      const resaults = await axios.get(`http://localhost:3000/api/user/${id}`);
      setProfileData(resaults?.data.user);
    } catch (error) {
      console.log(`error in getProfileData: ${error}`);
    }
  };

  useEffect(() => {
    if (globalUser?._id && params.id === globalUser._id) {
      setIsCurrentUser(true);
      setProfileData(globalUser);
    } else {
      setIsCurrentUser(false);
      getProfileData(params.id);
    }
  }, [params, globalUser]);

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
      <PostGrid
        selectedPostId={selectedPostId}
        setSelectedPostId={setSelectedPostId}
        posts={profileData?.userPosts || []}
        onPostClick={() => {}}
      />
      {selectedPostId && selectedPost && (
        <PostDetails
          setSelectedPostId={setSelectedPostId}
          selectedPost={selectedPost}
          setAllPosts={setProfileData.userPosts}
          selectedPostId={selectedPostId}
        />
      )}
    </div>
  );
};

export default UserProfile;
