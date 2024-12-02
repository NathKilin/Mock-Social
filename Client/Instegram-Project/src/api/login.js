import axios from "axios";

const handleLogInSabmit = async (
  e,
  setFailedLogText,
  setUserName,
  setPassword,
  password,
  userName,
  navigate,
  setIsLogIn
) => {
  e.preventDefault();
  setFailedLogText("Processing...");
  try {
    console.log("in controller before axios");
    const response = await axios.post(
      "http://localhost:3000/api/user/log_in",
      { userName, password },
      { withCredentials: true }
    );
    console.log(response);

    setFailedLogText("Logging you in...");
    setIsLogIn(true);
    navigate("/");
    console.log("in controller Response:", response.data);
    return response.data; // save in storage
  } catch (error) {
    console.log("w", error.response.data);
    console.error("Error during sign-in:", error);
    setFailedLogText("Invalid details, please try again.");
  }
  setUserName("");
  setPassword("");
};

const verifyAuth = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/user/verify_token",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to verify auth:", error);
    return false;
  }
};

export { handleLogInSabmit, verifyAuth };
