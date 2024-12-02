import React, { useState, useEffect } from "react";
// importing components from mui
import { TextField, Typography } from "@mui/material";
import styles from "./SearchAccordion.module.css";

const SearchAccordion = ({ isAccordionOpen }) => {
  const users = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie White",
    "Diana Prince",
    "Clark Kent",
    "Bruce Wayne",
    "Peter Parker",
    "Tony Stark",
    "Natasha Romanoff",
    "Steve Rogers",
    "Wanda Maximoff",
    "Stephen Strange",
    "Scott Lang",
  ];
  const [className, setClassName] = useState(styles.accordionHidden);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const [filteredUsers, setFilteredUsers] = useState(users); // Filtered users to display

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

  // Filter and sort users whenever the search query changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase(); // Convert to lowercase for case-insensitive matching
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
        value={searchQuery} // Controlled input
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on input
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
              style={{ cursor: "pointer"}}
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
