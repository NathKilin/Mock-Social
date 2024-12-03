import axios from "axios";
import getAuthTokenFromCookie from "../auth/auth.js";

const saveCommentApi = async (comment) => {
  try {
    const token = getAuthTokenFromCookie();
    if (!token) {
      console.log("no token");
    }
    const save = await axios.post(
      "http://localhost:3000/api/comments/add",
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(save);
    return save;
  } catch (error) {
    console.error(error);
  }
};

export default { saveCommentApi };
