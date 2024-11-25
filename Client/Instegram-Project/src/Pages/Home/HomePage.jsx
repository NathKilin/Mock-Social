import { Navigate } from "react-router-dom";
import styles from "./HomePage.module.css";

function generatePosts(numberOfPosts) {
  const posts = [];
  for (let i = 0; i < numberOfPosts; i++) {
    posts.push({
      id: i + 1,
      imagePlaceholder: `Image Placeholder ${i + 1}`,
      caption: `Post text ${i + 1}`,
    });
  }
  return posts;
}

const HomePage = ({ isLogIn }) => {
  console.log(isLogIn);

  if (!isLogIn) {
    return <Navigate to="/login" replace />;
  }

  const posts = generatePosts(20);

  return (
    <div className="home-page">
      <main className={styles.feed}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <div className={styles.imagePlaceholder}>
              {post.imagePlaceholder}
            </div>
            <p className={styles.caption}>{post.caption}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
