import { useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import axios from "axios";
import styles from "./Follow.module.css";
import getAuthTokenFromCookie from "../../auth/auth.js";

const Follow = ({ iFollow, setIFollow, friendId }) => {
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
      if (response.data.success) {
        setIFollow(true);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
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
      if (response.data.success) {
        setIFollow(false);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
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
