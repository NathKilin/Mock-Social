import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./DarkModeToggle.module.css";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={styles.toggleContainer} onClick={toggleDarkMode}>
      <div
        className={`${styles.toggleBall} ${
          isDarkMode ? styles.dark : styles.light
        }`}
      >
        {isDarkMode ? (
          <FaMoon className={styles.icon} />
        ) : (
          <FaSun className={styles.icon} />
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
