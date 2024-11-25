import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import axios from "axios";

const signUpApi = async (userData) => {
  try {
    const res = await axios.post("http://localhost:3000/api/user", userData);
    console.log("User registered successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error during sign-up:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const SignUp = () => {
  const [failedText, setFailedText] = useState("");
  const [userData, setUserData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUpApi(userData);
      console.log("User data:", response);
    } catch (error) {
      console.log("Error during sign up:", error);
    }
    setUserData({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  return (
    <div className={styles.containerSignUp}>
      <h1 className={styles.signUpTitle}>Sign Up</h1>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
        <input
          className={styles.signUpInput}
          placeholder="User name..."
          type="text"
          id="userName"
          value={userData.userName}
          onChange={handleChange}
          required
        />
        <hr className={styles.signUpHr} />
        <input
          className={styles.signUpInput}
          placeholder="First name..."
          type="text"
          id="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
        />
        <hr className={styles.signUpHr} />
        <input
          className={styles.signUpInput}
          placeholder="Last name..."
          type="text"
          id="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
        />
        <hr className={styles.signUpHr} />
        <input
          className={styles.signUpInput}
          placeholder="Email..."
          type="email"
          id="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <hr className={styles.signUpHr} />
        <input
          className={styles.signUpInput}
          placeholder="Password..."
          type="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <hr className={styles.signUpHr} />
        <input
          className={styles.signUpInput}
          placeholder="phone number..."
          type="tel"
          id="phone"
          pattern="[0-9]{10}"
          value={userData.phone}
          onChange={handleChange}
          required
        />
        <hr className={styles.signUpHr} />
        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
        <div>{failedText}</div>
      </form>

      <p className={styles.signUpParagraph}>
        Already have an account?{" "}
        <Link to="/" className={styles.signUpLink}>
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
