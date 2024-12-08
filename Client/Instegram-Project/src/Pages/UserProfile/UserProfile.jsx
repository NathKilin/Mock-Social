import styles from "./UserProfile.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfilePhoto from "../../Components/UserComponents/ProfilePhoto.jsx";
import UserInfo from "../../Components/UserComponents/UserInfo.jsx";
import PostGrid from "../../Components/UserComponents/PostGrid.jsx";
import PostDetails from "../../Components/ComponentsPostDetails/PostDetails.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import EditProfileDialog from "../../Components/UserComponents/EditProfileDialog.jsx"; // ייבוא של הדיאלוג

const UserProfile = () => {
  const params = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const globalUser = useSelector((state) => state.user.user);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [makeToCheck, setmakeToCheck] = useState(false);
  const [yourFollowers, setYourFollowers] = useState(0);
  const [postNumbs, setPostNumbs] = useState(0);
  const selectedPost = profileData?.userPosts?.find(
    (post) => post._id === selectedPostId
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log(globalUser);

  const counter = (friends) => +friends.length;

  const getProfileData = async (id) => {
    try {
      const results = await axios.get(`http://localhost:3000/api/user/${id}`);
      setProfileData(results?.data.user);
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
    setYourFollowers(counter(globalUser.friends));
    setPostNumbs(counter(globalUser.userPosts));
    console.log(yourFollowers);
    console.log(postNumbs);
  }, [params, globalUser, makeToCheck]);

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className={styles.userProfile}>
      <section className={styles.userHeader}>
        <ProfilePhoto
          src={
            profileData.profileImage ||
            "https://files.oaiusercontent.com/file-JUQ2DU1tkmMTvkyd5j54Xt?se=2024-12-08T08%3A41%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D53f18caf-b073-499a-aaf6-a2c4fb5bec85.webp&sig=Vpv7emoXfuQxrDMoh4wjkJbaea4qhLMovda4wDRK95E%3D"
          }
          alt="Profile"
        />

        <all>
          <div className={styles.allInfoContainer}>
            <UserInfo username={profileData.userName} />

            <div className={styles.containerButtomsAndFollower}>
              {isCurrentUser ? (
                <button
                  className={styles.settingsButton}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Settings
                </button>
              ) : (
                <button
                  className={styles.settingsButton}
                  onClick={() => alert("Friend request sent!")}
                >
                  Add Friend
                </button>
              )}
              <div className={styles.followersPostsContainer}>
                <li>
                  <span>POST</span>
                  {yourFollowers}
                </li>
                <li>
                  <span>FOLLOWER</span>
                  {postNumbs}
                </li>
              </div>
            </div>
          </div>
        </all>
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
          setAllPosts={(callback) => {
            setProfileData((prev) => ({
              ...prev,
              userPosts: callback(prev.userPosts),
            }));
          }}
          selectedPostId={selectedPostId}
        />
      )}
      {isDialogOpen && (
        <EditProfileDialog
          userProfile={profileData}
          onClose={() => setIsDialogOpen(false)}
          setmakeToCheck={setmakeToCheck}
        />
      )}
    </div>
  );
};

export default UserProfile;
