import React from "react";
import styles from "./Post.module.css";

const Post = ({ image, text, likes, comments, onclick}) => {
    return (
        <div className={styles.postContainer} onClick={onclick} >
            <img src={image} alt="Post" className={styles.postImage}/>
            <div className={styles.postHover}>
                <p className={styles.postText}>
                    {text.length > 20 ? `${text.slice(0, 20)}...` :text}
                </p>
                <div className={styles.postStats}>
                    <span>{likes} ❤️</span>
                    <span>{comments} 💬</span>
                </div>
            </div>
        </div>
    )
};

export default Post;