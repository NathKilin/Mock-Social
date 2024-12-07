import React, { useState, useEffect } from "react";
// Importing navigation hook
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import styles from "./SearchAccordion.module.css";

const SearchAccordion = ({ isAccordionOpen, setIsAccordionOpen }) => {
  // Controls the accordion visibility
  const [hiddenVisibleToggle, setHiddenVisibleToggle] = useState(
    styles.accordionHidden
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for users
  const [users, setUsers] = useState([
    {
      userName: "Bob Bonson",
      _id: "67508bf0a29a70d328be3e68",
      profilePhoto: "https://via.placeholder.com/50",
    },
    {
      userName: "Alice Smith",
      _id: "67508bf0a29a70d328be3e68",
      // Example with a real image
      profilePhoto: "https://via.placeholder.com/50",
    },
    {
      userName: "John Doe",
      _id: "67508bf0a29a70d328be3e68",
      profilePhoto: "https://via.placeholder.com/50",
    },
  ]);

  // // State for filtered users
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Hook for navigation
  const navigate = useNavigate();

  // Controls visibility of the accordion based on `isAccordionOpen`
  useEffect(() => {
    setHiddenVisibleToggle(
      isAccordionOpen ? styles.accordionVisible : styles.accordionHidden
    );
  }, [isAccordionOpen]);

  // Filters users based on the search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = users
      .filter((user) => user.userName.toLowerCase().includes(lowerCaseQuery))
      .slice(0, 10); // Limit results to 10
    setFilteredUsers(results);
  }, [searchQuery, users]);

  return (
    <div className={hiddenVisibleToggle}>
      <Typography variant="h6">Search Users</Typography>
      <TextField
        fullWidth
        label="Search for users"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          marginTop: "10px",
          marginLeft: "10px",
          marginRight: "10px",
          "& .MuiInputLabel-root": { paddingTop: "5px" },
        }}
      />
      <div className={styles.userList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setIsAccordionOpen((prev) => !prev);
                navigate(`/userProfile/${user._id}`);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: "10px 0",
              }}
            >
              <img
                src={user.profilePhoto || "https://via.placeholder.com/50"}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />

              <Typography>{user.userName}</Typography>
            </div>
          ))
        ) : (
          <Typography sx={{ marginLeft: "10px" }}>No users found.</Typography>
        )}
      </div>
    </div>
  );
};

export default SearchAccordion;
