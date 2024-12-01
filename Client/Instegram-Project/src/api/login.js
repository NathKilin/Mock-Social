import axios from "axios";
//  add id dinamy
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
      "http://localhost:3000/api/user/sign/674791e67667e1ddd0117cc6",
      { userName, password },
      { withCredentials: true }
    );
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
export { handleLogInSabmit };
