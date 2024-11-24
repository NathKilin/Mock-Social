import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";

const signUpApi = async (userData) => {
  console.log("Signing up with:", userData);
  return userData;
};

const SignUp = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
  };

  return (
    <div className={styles.containerSignUp}>
      <h1 className={styles.signUpTitle}>Sign Up</h1>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
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
          placeholder="Phone number..."
          type="tel"
          id="phoneNumber"
          pattern="[0-9]{10}"
          value={userData.phoneNumber}
          onChange={handleChange}
          required
        />
        <hr className={styles.signUpHr} />
        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
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
