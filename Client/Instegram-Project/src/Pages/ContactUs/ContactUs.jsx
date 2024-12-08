import React from "react";
import styles from "./ContactUs.module.css";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const fakeContactData = {
    name: "PENN WEB",
    email: "Penn@example.com",
    message:
      "I need assistance with resetting my password. Can you guide me through the process?",
    timestamp: "2024-12-08T12:00:00Z",
  };

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.contactUsContainer}>
      <h2 className={styles.header}>Contact Us - Penn</h2>
      <div className={styles.contactDetails}>
        <p>
          <strong>Name:</strong> {fakeContactData.name}
        </p>
        <p>
          <strong>Email:</strong> {fakeContactData.email}
        </p>
        <p>
          <strong>Message:</strong> {fakeContactData.message}
        </p>
        <p>
          <strong>Sent on:</strong>{" "}
          {new Date(fakeContactData.timestamp).toLocaleString()}
        </p>
      </div>
      <div className={styles.footer}>
        <p>
          If you have any questions, feel free to reach out to us anytime. We
          are here to help!
        </p>
        <p>
          We promise to make your experience with Penn even better in the
          future.
        </p>
        <button onClick={handleGoHome} className={styles.homeButton}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
