import styles from "./SearchAccordion.module.css";
import React, { useState, useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom";

// MUI
import { Switch, TextField, Typography } from "@mui/material";

import { usersCliant } from "../../api/axiosInstens.js";

const SearchAccordion = ({ isAccordionOpen, setIsAccordionOpen }) => {
  const [hiddenVisibleToggle, setHiddenVisibleToggle] = useState(
    styles.accordionHidden
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Hook for navigation
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isContain, setIsContain] = useState(false);
  const getRandomUsers = async () => {
    try {
      const result = await usersCliant.post("/search", { number: 30 });
      console.log(result);
      setUsers(result.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchedUsers = async () => {
    try {
      if (searchQuery.length === 1) {
        console.log(`isContain: ${isContain}`);
        console.log(`serchQuery: ${searchQuery}`);
        console.log(`users.length: ${users.length}`);

        const result = await usersCliant.post("/search", {
          number: 30,
          letters: searchQuery,
          contain: isContain,
        });
        setUsers((prev) => result.data.users);
        return;
      } else if (users.length < 15) {
        const result = await usersCliant.post("/search", {
          number: 30,
          letters: searchQuery,
          contain: isContain,
        });
        setUsers((prev) => result.data.users);
      }
    } catch (error) {
      console.log("in search user error");
      error.status === 404 ? setUsers((prev) => []) : console.log(error);
    }
  };

  console.log(`users state: ${users}`);
  console.log(users);

  // Controls visibility of the accordion based on `isAccordionOpen`
  useEffect(() => {
    setHiddenVisibleToggle(
      isAccordionOpen ? styles.accordionVisible : styles.accordionHidden
    );
    getRandomUsers();
    console.log(users);
  }, [isAccordionOpen]);

  useEffect(() => {
    getSearchedUsers();
  }, [searchQuery]);

  return (
    <div className={hiddenVisibleToggle}>
      <Typography variant="h6">
        <div class={"flex justify-between ps-9 pe-9 "}>
          <span> Search Users</span>
          <div>
            <span>
              <Switch
                onChange={() => {
                  setIsContain((prev) => !prev);
                }}
              />
              more
            </span>
          </div>
        </div>
      </Typography>
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
        {users.length > 0 ? (
          users.map((user) => (
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
