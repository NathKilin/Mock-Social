import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditProfileDialog.module.css";
import axios from "axios";
import getAuthTokenFromCookie from "../../auth/auth";
import { setUser } from "../../store/slices/userSlice.js";
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
const updateUserProfile = async (userData, setFailedText, userId) => {
  try {
    const token = getAuthTokenFromCookie();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.patch(
      `http://localhost:3000/api/user/${userId}`,
      userData,
      { headers }
    );
    console.log("User profile updated successfully:", res.data);
    return res.data;
  } catch (error) {
    setFailedText(
      "There was an error updating your profile. Please try again."
    );
    console.error(
      "Error during profile update:",
      error.response?.data || error.message
    );
  }
};
const EditProfileDialog = ({ userProfile, onClose, setmakeToCheck }) => {
  const [userName, setUserName] = useState(userProfile?.userName || "");
  const [firstName, setFirstName] = useState(userProfile?.firstName || "");
  const [lastName, setLastName] = useState(userProfile?.lastName || "");
  const [email, setEmail] = useState(userProfile?.email || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [profileImage, setProfileImage] = useState(
    userProfile?.profileImage || ""
  );
  const [failedText, setFailedText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.user._id);
  const user = useSelector((state) => state.user.user);
  console.log(userId);
  console.log(user);
  const handleOpenWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url", "camera"],
        folder: "Social_Media_Posts",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setProfileImage(result.info.secure_url);
        } else if (error) {
          console.error("Upload error:", error);
        }
      }
    );
  };
  const handleSave = async () => {
    const updatedData = {};
    console.log(userProfile);
    if (userName !== userProfile.userName) {
      updatedData.userName = userName;
    }
    if (firstName !== userProfile.firstName) {
      updatedData.firstName = firstName;
    }
    if (lastName !== userProfile.lastName) {
      updatedData.lastName = lastName;
    }
    if (email !== userProfile.email) {
      updatedData.email = email;
    }
    if (phone !== userProfile.phone) {
      updatedData.phone = phone;
    }
    if (profileImage !== userProfile.profileImage) {
      updatedData.profileImage = profileImage;
    }
    if (Object.keys(updatedData).length === 0) {
      setFailedText("No changes made to your profile.");
      return;
    }
    const updatedProfile = await updateUserProfile(
      updatedData,
      setFailedText,
      userId
    );
    console.log(userProfile);
    const newUser = { ...userProfile, ...updatedData };
    if (updatedProfile) {
      onClose();
      dispatch(setUser(newUser));
      setmakeToCheck((prev) => !prev);
      console.log(user);
    }
  };
  const handleChangePassword = () => {
    navigate("/change-password");
  };
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <h2>Edit Profile</h2>
        {failedText && <p className={styles.errorText}>{failedText}</p>}
        <div className={styles.formGroup}>
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleOpenWidget}
          className={styles.uploadButton}
        >
          Upload Image/Video
        </button>
        <div className={styles.dialogActions}>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            className={styles.changePasswordButton}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditProfileDialog;