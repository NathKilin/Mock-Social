// import React, { useState } from "react";
// import styles from "./PostDetails.module.css";
// import commentApi from "../../api/commentApi.js";
// import PostComments from "./Comments/Comments.jsx";
// import PostImage from "./PostImage/PostImage.jsx";

// const PostDetails = ({ selectedPost, setSelectedPostId, setAllPosts }) => {
//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = async () => {
//     if (newComment.trim() === "") return;

//     try {
//       const newCommentObj = { postId: selectedPost._id, text: newComment };
//       const saveComment = await commentApi.saveCommentApi(newCommentObj);

//       if (saveComment?.data?.data) {
//         const newCommentData = saveComment.data.data;

//         setAllPosts((prev) =>
//           prev.map((post) =>
//             post._id === selectedPost._id
//               ? { ...post, comments: [...post.comments, newCommentData] }
//               : post
//           )
//         );
//         setNewComment("");
//       } else {
//         console.error("שמירת התגובה נכשלה");
//       }
//     } catch (error) {
//       console.error("שגיאה בהוספת תגובה:", error);
//     }
//   };

//   return (
//     <div
//       className={styles.modalBackdrop}
//       onClick={() => setSelectedPostId(null)}
//     >
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <div className={styles.dialogContainer}>
//           <PostImage imageUrl={selectedPost.url} />
//           <div className={styles.contentSection}>
//             <h3 className={styles.caption}>{selectedPost.caption}</h3>{" "}
//             <PostComments
//               comments={selectedPost.comments}
//               newComment={newComment}
//               setNewComment={setNewComment}
//               handleAddComment={handleAddComment}
//             />{" "}
//           </div>
//         </div>
//         <button
//           className={styles.closeButton}
//           onClick={() => setSelectedPostId(null)}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;
import React, { useState } from "react";
import styles from "./PostDetails.module.css";
import commentApi from "../../api/commentApi.js";
import PostComments from "./Comments/Comments.jsx";
import PostImage from "./PostImage/PostImage.jsx";

const PostDetails = ({ selectedPost, setSelectedPostId, setAllPosts }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const newCommentObj = { postId: selectedPost._id, text: newComment };
      const saveComment = await commentApi.saveCommentApi(newCommentObj);

      if (saveComment?.data?.data) {
        const newCommentData = saveComment.data.data;

        setAllPosts((prev) =>
          prev.map((post) =>
            post._id === selectedPost._id
              ? { ...post, comments: [...post.comments, newCommentData] }
              : post
          )
        );
        setNewComment("");
      } else {
        console.error("Failed to save comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div
      className={styles.modalBackdrop}
      onClick={() => setSelectedPostId(null)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.dialogContainer}>
          <PostImage imageUrl={selectedPost.url} />
          <div className={styles.contentSection}>
            <h3 className={styles.caption}>{selectedPost.caption}</h3>
            <PostComments
              comments={selectedPost.comments}
              newComment={newComment}
              setNewComment={setNewComment}
              handleAddComment={handleAddComment}
            />
          </div>
        </div>
        <button
          className={styles.closeButton}
          onClick={() => setSelectedPostId(null)}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default PostDetails;