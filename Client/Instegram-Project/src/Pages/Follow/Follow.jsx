import styles from "./Follow.module.css";
import { useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import axios from "axios";
import getAuthTokenFromCookie from "../../auth/auth.js";

const Follow = ({ setIFollow, iFollow, friendId }) => {
  const [loading, setLoading] = useState(false);
  const token = getAuthTokenFromCookie();

  const addFollow = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/friend/add",
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "friend added successfully") {
        setIFollow(true);
      }
    } catch (error) {
      error.response.data.message === "You already friends"
        ? setIFollow(true)
        : console.error("Error adding friend:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFollow = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/friend/remove",
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.messege);

      if (response.data.messege === "yey! you are enemis!") {
        setIFollow(false);
      }
    } catch (error) {
      error.response.data.messege === "you'r already enemies!"
        ? setIFollow(false)
        : console.error("Error removing friend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {iFollow ? (
        <BookmarkRemoveIcon onClick={removeFollow} />
      ) : (
        <BookmarkAddIcon onClick={addFollow} />
      )}
    </div>
  );
};

export default Follow;
