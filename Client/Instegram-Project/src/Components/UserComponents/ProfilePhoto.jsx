import React from "react";
import styles from "./ProfilePhoto.module.css";

const ProfilePhoto = ({ src, alt }) => {
return (
    <img src={src} alt={alt} className={styles.profilePhoto} />
);
};

export default ProfilePhoto;
