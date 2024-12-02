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
    const response = await axios.post(
      "http://localhost:3000/api/user/log_in",
      { userName, password },
      { withCredentials: true }
    );

    if (response.status === 200 && response.data.token) {
      setFailedLogText("Logging you in...");
      setIsLogIn(true);
      navigate("/");
    } else {
      throw new Error("Unexpected response format or missing token.");
    }
  } catch (error) {
    if (error.response?.status === 401) {
      setFailedLogText("Invalid username or password. Please try again.");
    } else {
      setFailedLogText("An error occurred. Please try again later.");
    }
  } finally {
    setUserName("");
    setPassword("");
  }
};

const verifyAuth = async (token) => {
  console.log(token);

  try {
    const response = await axios.get(
      "http://localhost:3000/api/user/verify_token",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export { handleLogInSabmit, verifyAuth };
