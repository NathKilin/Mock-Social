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
import Follow from "../Follow/Follow.jsx";

const UserProfile = () => {
  const params = useParams();
  const [profileData, setProfileData] = useState({});
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
  const [iFollow, setIFollow] = useState(false);

  const counter = (friends) => +friends?.length || 0;

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
      setYourFollowers(counter(globalUser.friends));
      setPostNumbs(counter(globalUser.userPosts));
    } else {
      setIsCurrentUser(false);
      getProfileData(params.id);
    }
  }, [params, globalUser, makeToCheck]);

  useEffect(() => {
    if (profileData) {
      setYourFollowers(counter(profileData.friends || []));
      setPostNumbs(counter(profileData.userPosts || []));
    }
  }, [profileData]);

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

        <div>
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
                <button className={styles.settingsButton}>
                  <Follow
                    friendId={params.id}
                    iFollow={iFollow}
                    setIFollow={setIFollow}
                  />
                </button>
              )}
              <div className={styles.followersPostsContainer}>
                <li>
                  <span>POSTS</span>
                  {postNumbs}
                </li>
                <li>
                  <span>FOLLOWERS</span>
                  {yourFollowers}
                </li>
              </div>
            </div>
          </div>
        </div>
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
