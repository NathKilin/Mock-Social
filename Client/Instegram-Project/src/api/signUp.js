import axios from "axios";

const signUpApi = async (userData, setFailedText) => {
  try {
    const res = await axios.post("http://localhost:3000/api/user", userData);
    console.log("User registered successfully:", res.data);
    return res.data;
  } catch (error) {
    setFailedText("Please note that you are filling in unique details.");
    console.error(
      "Error during sign-up:",
      error.response?.data || error.message
    );
  }
};

export default { signUpApi };
