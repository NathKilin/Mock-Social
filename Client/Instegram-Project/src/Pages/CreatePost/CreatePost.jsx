// import React, { useState } from "react";
// import styles from "./CreatePost.module.css";
// import axios from "axios";

// const creatPostApi = async (url, caption) => {
//   try {
//     const post = { url, caption, authorId: "6743986b0b73dc1a2e25e4b0" };
//     const res = await axios.post("http://localhost:3000/api/posts/add", post);
//     console.log(res);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };

// const CreatePost = () => {
//   const [url, setMediaUrl] = useState("");
//   const [caption, setCaption] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!url) {
//       alert("Media url are required.");
//       return;
//     }
//     try {
//       const newPost = creatPostApi(url, caption);
//       console.log("Post created:", newPost);
//       setMediaUrl("");
//       setCaption("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className={styles.createPost}>
//       <h2>Create Post</h2>
//       <form className={styles.formPost} onSubmit={handleSubmit}>
//         <div className={styles.containerMediaUrl}>
//           <label htmlFor="media-url">Image/Video URL:</label>
//           <input
//             type="url"
//             id="media-url"
//             value={url}
//             onChange={(e) => setMediaUrl(e.target.value)}
//             placeholder="Paste the image or video URL"
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
//       <div className={styles.postPreview}>
//         <h3>Preview</h3>
//         {url && (
//           <img src={url} alt="Media Preview" style={{ maxWidth: "100%" }} />
//         )}
//         {caption && <p>{caption}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreatePost;
import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import axios from "axios";

const creatPostApi = async (url, caption) => {
  try {
    const post = { url, caption, authorId: "6743986b0b73dc1a2e25e4b0" };
    const res = await axios.post("http://localhost:3000/api/posts/add", post);
    console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const CreatePost = () => {
  const [url, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      alert("Media URL is required.");
      return;
    }
    try {
      const newPost = await creatPostApi(url, caption);
      console.log("Post created:", newPost);
      setMediaUrl("");
      setCaption("");
    } catch (error) {
      console.error(error);
    }
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <form className={styles.formPost} onSubmit={handleSubmit}>
        <div className={styles.containerMediaUrl}>
          <label htmlFor="media-url">Image/Video URL:</label>
          <input
            type="url"
            id="media-url"
            value={url}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Paste the image or video URL"
            required
          />
        </div>
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
      {/* <div className={styles.postPreview}>
        <h3>Preview</h3>
        {url &&
          (isVideo(url) ? (
            <video autoPlay loop muted controls style={{ maxWidth: "100%" }}>
              <source src={url} type="video/mp4" />
            </video>
          ) : (
            <img src={url} alt="Media Preview" style={{ maxWidth: "100%" }} />
          ))}

        {caption && <p>{caption}</p>}
      </div> */}
    </div>
  );
};

export default CreatePost;
