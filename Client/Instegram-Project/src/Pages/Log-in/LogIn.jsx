import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";
import { handleLogInSabmit, verifyAuth } from "../../api/login.js";
import getAuthTokenFromCookie from "../../auth/auth.js";

const LogIn = ({ setIsLogIn, isLogIn }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogText, setFailedLogText] = useState("");

  const checkAuth = async () => {
    try {
      const token = getAuthTokenFromCookie();
      if (token) {
        const isAuthValid = await verifyAuth(token);
        if (isAuthValid) {
          setIsLogIn(true);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  return (
    <div className={styles.logInContainer}>
      <h1 className={styles.logInTitle}>Log In</h1>
      <form
        className={styles.logInForm}
        onSubmit={(e) =>
          handleLogInSabmit(
            e,
            setFailedLogText,
            setUserName,
            setPassword,
            password,
            userName,
            navigate,
            setIsLogIn
          )
        }
      >
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
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <hr className={styles.logInHr} />
        <button type="submit" className={styles.logInButton}>
          Log In
        </button>
        <div className={styles.errorMassege}>{failedLogText}</div>
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
