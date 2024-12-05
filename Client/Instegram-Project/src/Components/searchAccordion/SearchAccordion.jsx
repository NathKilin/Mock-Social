import React, { useState, useEffect } from "react";
// using navigation???
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { TextField, Typography } from "@mui/material";
import styles from "./SearchAccordion.module.css";

const SearchAccordion = ({ isAccordionOpen }) => {
  // visibility of the accordion
  const [className, setClassName] = useState(styles.accordionHidden); 
  // stores the user's search query
  const [searchQuery, setSearchQuery] = useState(""); 
  // list of all users fetched from the backend
  const [users, setUsers] = useState([]); 
  // filtered list based on search 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  // pulling navigation hook
  const navigate = useNavigate(); 

  // toggle visibility of the accordion based on the `isAccordionOpen` PROP
  useEffect(() => {
    if (isAccordionOpen) {
      setClassName(styles.accordionVisible);
    } else {
      setClassName(styles.accordionHidden);
    }
  }, [isAccordionOpen]);

  // fetching all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/all");
        // saving fetched users to the state
        setUsers(response.data); 
        // Initialize filtered users???
        setFilteredUsers(response.data); 
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  // filter for search querry
  useEffect(() => {
    //to lowercase the searched string 
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = users
      .filter(
        (user) =>
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowerCaseQuery)
      )
      .sort((a, b) => {
        // organizing according to the abc
        const indexA = `${a.firstName} ${a.lastName}`
          .toLowerCase()
          .indexOf(lowerCaseQuery);
        const indexB = `${b.firstName} ${b.lastName}`
          .toLowerCase()
          .indexOf(lowerCaseQuery);

        if (indexA === indexB) {
          return `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          );
        }
        return indexA - indexB;
      });

    setFilteredUsers(results);
  }, [searchQuery, users]);

  return (
    <div className={className}>
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
        {/* cheching if ther´s any filtered results to display */}
        {filteredUsers.length > 0 ? (
          // if there are filtered results, map over the list to render each user
          filteredUsers.map((user) => (
            <Typography
              key={user._id}
              // using navigate to get to the user's profile
              onClick={() => navigate(`/user/${user._id}`)} 
              style={{ cursor: "pointer" }}
              sx={{ marginLeft: "10px" }}
            >
              {/* display the user's first name and last name */}
              {user.firstName} {user.lastName}
            </Typography>
          ))
        ) : (
              // if no users match the search, display not found message
          <Typography sx={{ marginLeft: "10px" }}>No users found.</Typography>
        )}
      </div>
    </div>
  );
};

export default SearchAccordion;
