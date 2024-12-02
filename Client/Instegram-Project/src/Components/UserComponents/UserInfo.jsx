import React from "react";
import styles from "./UserInfo.module.css";

const UserInfo = ({ username, postsCount, friendsCount}) => {
    return (
        <div className={styles.UserInfo}>
            <h2 className={styles.username}>{username}</h2>
            <div className={styles.stats}>
            <p>{postsCount}</p>
            <p>{friendsCount}</p>
            </div>
        </div>
    )
};

export default UserInfo;