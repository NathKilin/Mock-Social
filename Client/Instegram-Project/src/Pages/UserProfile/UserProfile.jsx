import React, { useState } from "react";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import ProfilePhoto from "../../Components/UserComponents/ProfilePhoto.jsx";
import UserInfo from "../../Components/UserComponents/UserInfo.jsx";
import PostGrid from "../../Components/UserComponents/PostGrid.jsx";
import styles from "./UserProfile.module.css";

const UserProfile = ({ user, posts }) => {
    const [selectedPost, setSelectedPost] = useState(null);

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
