import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css"; // If you want to style the page
const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h1>Something Went Wrong</h1>
      <p>
        We're sorry, there was an issue. Please try refreshing the page or go
        back to the home page.
      </p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};
export default ErrorPage;
