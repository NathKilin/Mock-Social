import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LogIn.module.css";
import axios from "axios";

const logInApi = async (userName, email) => {
  const res = await axios.post("http://localhost:3000/users");
  return { userName, email };
};

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await logInApi(userName, email);
      console.log("User data:", userData);
    } catch (error) {
      console.log("Error during login:", error);
    }
    setUserName("");
    setEmail("");
  };

  return (
    <div className={styles.logInContainer}>
      <h1 className={styles.logInTitle}>Log In</h1>
      <form className={styles.logInForm} onSubmit={handleSubmit}>
        <input
          className={styles.logInInput}
          placeholder="User Name..."
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <hr className={styles.logInHr} />
        <input
          className={styles.logInInput}
          placeholder="Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <hr className={styles.logInHr} />
        <button type="submit" className={styles.logInButton}>
          Log In
        </button>
      </form>

      <p className={styles.logInParagraph}>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.logInLink}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LogIn;
