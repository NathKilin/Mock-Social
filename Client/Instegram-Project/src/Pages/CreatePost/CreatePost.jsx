// import React, { useState } from "react";
// import styles from "./CreatePost.module.css";
// import { postsCliant } from "../../api/axiosInstens.js";

// const creatPostApi = async (formData) => {
//   // console.log(FormData.entries());

//   try {
//     const res = await postsCliant.post("/add", formData, {});

//     console.log(res.data);

//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// const CreatePost = () => {
//   const [mediaFile, setMediaFile] = useState(null);
//   const [caption, setCaption] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!mediaFile) {
//       alert("Media file is required.");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("url", mediaFile);
//       formData.append("caption", caption);

//       console.log("FormData contents:");
//       for (const [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const newPost = await creatPostApi(formData);
//       console.log(newPost);

//       setMediaFile(null);
//       setCaption("");
//     } catch (error) {
//       alert("Failed to create post. Please try again.");
//     }
//   };

//   return (
//     <div className={styles.createPost}>
//       <h2>Create Post</h2>
//       <form className={styles.formPost} onSubmit={handleSubmit}>
//         <div className={styles.containerMediaUrl}>
//           <label htmlFor="media-file">Image/Video File:</label>
//           <input
//             className={styles.contaunerImg}
//             type="file"
//             id="media-file"
//             onChange={(e) => setMediaFile(e.target.files[0])} // קריאת הקובץ הנבחר
//             required
//           />
//         </div>
//         <div className={styles.containerCaption}>
//           <label htmlFor="caption">Caption:</label>
//           <input
//             type="text"
//             id="caption"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             placeholder="Enter a caption"
//             required
//           />
//         </div>
//         <button type="submit">Create Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

// import React, { useState } from "react";
// import styles from "./CreatePost.module.css";
// import { postsCliant } from "../../api/axiosInstens.js";

// const creatPostApi = async (formData) => {
//   try {
//     const res = await postsCliant.post("/add", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log(res.data);

//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

// const CreatePost = () => {
//   const [mediaFile, setMediaFile] = useState(null); // הקובץ
//   const [mediaPreview, setMediaPreview] = useState(null); // התצוגה המקדימה
//   const [caption, setCaption] = useState(""); // הכיתוב

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setMediaFile(file);

//     // יצירת URL זמני לתצוגה מקדימה
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setMediaPreview(fileURL);
//     } else {
//       setMediaPreview(null); // איפוס התצוגה אם אין קובץ
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!mediaFile) {
//       alert("Media file is required.");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("url", mediaFile);
//       formData.append("caption", caption);

//       console.log("FormData contents:");
//       for (const [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//       }

//       const newPost = await creatPostApi(formData);
//       console.log(newPost);

//       setMediaFile(null);
//       setMediaPreview(null);
//       setCaption("");
//     } catch (error) {
//       alert("Failed to create post. Please try again.");
//     }
//   };

//   return (
//     <div className={styles.createPost}>
//       <h2>Create Post</h2>
//       <form className={styles.formPost} onSubmit={handleSubmit}>
//         <div className={styles.containerMediaUrl}>
//           <label htmlFor="media-file">Image/Video File:</label>
//           <input
//             className={styles.contaunerImg}
//             type="file"
//             id="media-file"
//             accept="image/*,video/*" // רק תמונות או וידאו
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         {/* הצגת התצוגה המקדימה */}
//         {mediaPreview && (
//           <div className={styles.preview}>
//             {mediaFile.type.startsWith("image/") ? (
//               <img
//                 src={mediaPreview}
//                 alt="Preview"
//                 className={styles.previewImage}
//               />
//             ) : (
//               <video
//                 src={mediaPreview}
//                 controls
//                 className={styles.previewVideo}
//               />
//             )}
//           </div>
//         )}

//         <div className={styles.containerCaption}>
//           <label htmlFor="caption">Caption:</label>
//           <input
//             type="text"
//             id="caption"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             placeholder="Enter a caption"
//             required
//           />
//         </div>
//         <button type="submit">Create Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { postsCliant } from "../../api/axiosInstens.js";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

const CreatePost = () => {
  const [caption, setCaption] = useState(""); // Caption for the post
  const [imageUrl, setImageUrl] = useState(null); // Uploaded image URL preview

  const handleOpenWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url", "camera"], // Add other sources if needed
        folder: "Social_Media_Posts", // Optional folder
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("Upload result:", result.info);
          setImageUrl(result.info.secure_url); // Save the image URL
        } else if (error) {
          console.error("Upload error:", error);
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image.");
      return;
    }

    try {
      const formData = {
        url: imageUrl,
        caption,
      };

      const response = await postsCliant.post("/add", formData);
      console.log("Post created:", response.data);

      setImageUrl(null);
      setCaption("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <form className={styles.formPost} onSubmit={handleSubmit}>
        <button type="button" onClick={handleOpenWidget}>
          Upload Image/Video
        </button>

        {imageUrl && (
          <div className={styles.preview}>
            <img src={imageUrl} alt="Uploaded media" />
          </div>
        )}

        <div className={styles.containerCaption}>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter a caption"
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
