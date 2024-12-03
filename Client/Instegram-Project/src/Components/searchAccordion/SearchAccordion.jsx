import React, { useState, useEffect } from "react";
// Import axios for making HTTP requests
import axios from "axios";
import { TextField, Typography } from "@mui/material";
import styles from "./SearchAccordion.module.css";

const SearchAccordion = ({ isAccordionOpen }) => {
  const [className, setClassName] = useState(styles.accordionHidden);
  const [searchQuery, setSearchQuery] = useState("");
  // Stores the users fetched from the backend
  const [users, setUsers] = useState([]);
  // Stores the filtered users for display
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Update class based on the isAccordionOpen prop
  useEffect(() => {
    if (isAccordionOpen) {
      // styles for visible
      setClassName(styles.accordionVisible);
    } else {
      // styles for hidden
      setClassName(styles.accordionHidden);
    }
  }, [isAccordionOpen]);

  // Fetch users from backend when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/all");
        // Transform the response to combine firstName and lastName
        const formattedUsers = response.data.map(
          (user) => `${user.firstName} ${user.lastName}`
        );
        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter and sort users whenever the search query changes
  useEffect(() => {
    // Convert to lowercase for case-insensitive matching
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = users
      .filter((user) => user.toLowerCase().includes(lowerCaseQuery)) // Filter users that match the query
      .sort((a, b) => {
        // Sort users by the position of the match (lower index = higher rank)
        const indexA = a.toLowerCase().indexOf(lowerCaseQuery);
        const indexB = b.toLowerCase().indexOf(lowerCaseQuery);

        if (indexA === indexB) {
          // If indices are equal, sort alphabetically
          return a.localeCompare(b);
        }
        return indexA - indexB; // Lower index first
      });

    setFilteredUsers(results);
  }, [searchQuery, users]);

  // Render the search and results
  return (
    <div className={className}>
      <Typography variant="h6" />
      <TextField
        fullWidth
        label="Search for users 🕵🏼"
        variant="outlined"
        value={searchQuery}
        // Update the search query on input
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
          filteredUsers.map((user, index) => (
            <Typography
              style={{ cursor: "pointer" }}
              key={index}
              sx={{ marginLeft: "10px" }}
            >
              {user}
            </Typography>
          ))
        ) : (
          <Typography sx={{ marginLeft: "10px" }}>No users found.</Typography>
        )}
      </div>
    </div>
  );
};

export default SearchAccordion;
