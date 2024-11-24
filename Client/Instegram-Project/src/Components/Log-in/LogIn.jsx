import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LogIn.module.css";

const logInApi = async (fullName, email) => {
  console.log("Logging in with:", fullName, email);
  return { fullName, email };
};

const LogIn = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await logInApi(fullName, email);
      console.log("User data:", userData);
    } catch (error) {
      console.log("Error during login:", error);
    }
    setFullName("");
    setEmail("");
  };

  return (
    <div className={styles.logInContainer}>
      <h1 className={styles.logInTitle}>Log In</h1>
      <form className={styles.logInForm} onSubmit={handleSubmit}>
        <input
          className={styles.logInInput}
          placeholder="Full Name..."
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
