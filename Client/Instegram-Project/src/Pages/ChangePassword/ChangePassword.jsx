import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import getAuthTokenFromCookie from "../../auth/auth.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const verifyAuthPassword = async (password) => {
  const token = getAuthTokenFromCookie();
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/verify_token",
      { password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.valid;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
};
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.user._id);
  const navigate = useNavigate();
  const handleCurrentPasswordSubmit = async () => {
    if (!currentPassword) {
      setErrorMessage("Please enter your current password.");
      return;
    }
    const apiRes = await verifyAuthPassword(currentPassword);
    if (apiRes) {
      setIsPasswordCorrect(true);
      setErrorMessage("");
    } else {
      setErrorMessage("The current password is incorrect.");
    }
  };
  const updatePassword = async (password) => {
    const token = getAuthTokenFromCookie();
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.patch(
        `http://localhost:3000/api/user/${userId}`,
        { password },
        { headers }
      );
      setLoading(false);
      console.log(res.data);
      return res.data;
    } catch (error) {
      setLoading(false);
      console.error("Error updating password:", error);
      setErrorMessage("Failed to update password. Please try again.");
      return null;
    }
  };
  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields must be filled out.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("The new passwords do not match.");
      return;
    }
    setErrorMessage("");
    const apiRes = await updatePassword(newPassword);
    if (apiRes.message === "updated successfully") {
      console.log("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordCorrect(false);
      navigate(`/userProfile/${userId}`);
    }
  };
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <h2>Change Password</h2>
        {!isPasswordCorrect ? (
          <div className={styles.formGroup}>
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <div className={styles.dialogActions}>
              <button
                onClick={handleCurrentPasswordSubmit}
                className={styles.saveButton}
                disabled={loading}
              >
                Submit
              </button>
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>
        ) : (
          <>
            <div className={styles.formGroup}>
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.dialogActions}>
              <button
                onClick={handleSubmit}
                className={styles.saveButton}
                disabled={loading}
              >
                Save
              </button>
            </div>
          </>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};
export default ChangePassword;