import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LogIn.module.css";
import { handleLogInSabmit, verifyAuth } from "../../api/login.js";
import getAuthTokenFromCookie from "../../auth/auth.js";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LogIn = ({ setIsLogIn }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [failedLogText, setFailedLogText] = useState("");
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            setIsLogIn,
            dispatch
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
        <div className={styles.passwordContainer}>
          <input
            className={`${styles.logInInput} ${styles.passwordInput}`}
            placeholder="Password..."
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
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
