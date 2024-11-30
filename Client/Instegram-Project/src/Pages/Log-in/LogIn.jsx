// import { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./LogIn.module.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../store/slices/userSlice.js";

// const LogIn = ({ setIsLogIn }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [failedLogText, setFailedLogText] = useState("");

//   const logInApi = async (userName, email) => {
//     try {
//       const user = { userName, email };
//       const res = await axios.post(
//         "http://localhost:3000/api/user/light_sign",
//         user
//       );
//       if (res?.data?.userId) {
//         console.log(res.data.userId);
//         dispatch(
//           setUser({
//             id: res.data.userId,
//             role: res.data.role ? res.data.role : "user",
//           })
//         );
//       }
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // const saveInCookie = (id) => {
//   //   document.cookie = `userId=${id}; path=/`;
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFailedLogText("Processing...");
//     try {
//       const userData = await logInApi(userName, email);
//       setFailedLogText("Logging you in...");
//       setTimeout(() => {
//         setIsLogIn(true);
//         navigate("/");
//         console.log("User data:", userData);
//       }, 2000);
//     } catch (error) {
//       console.log("Error during login:", error);
//       setFailedLogText("Invalid details, please try again.");
//     }
//     setUserName("");
//     setEmail("");
//   };

//   return (
//     <div className={styles.logInContainer}>
//       <h1 className={styles.logInTitle}>Log In</h1>
//       <form className={styles.logInForm} onSubmit={handleSubmit}>
//         <input
//           className={styles.logInInput}
//           placeholder="User Name..."
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           required
//         />
//         <hr className={styles.logInHr} />
//         <input
//           className={styles.logInInput}
//           placeholder="Email..."
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <hr className={styles.logInHr} />
//         <button type="submit" className={styles.logInButton}>
//           Log In
//         </button>
//         <div className={styles.errorMassege}>{failedLogText}</div>
//       </form>
//       <p className={styles.logInParagraph}>
//         Don't have an account?{" "}
//         <Link to="/signup" className={styles.logInLink}>
//           Sign Up
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default LogIn;

import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import { handleLogInSabmit } from "../../api/login.js";

const LogIn = ({ setIsLogIn }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogText, setFailedLogText] = useState("");

  return (
    <div className={styles.logInContainer}>
      <h1 className={styles.logInTitle}>Log In</h1>
      <form
        className={styles.logInForm}
        onSubmit={(e) =>
          handleLogInSabmit(
            e,
            setFailedLogText,
            setUserName,
            setPassword,
            password,
            userName,
            navigate,
            setIsLogIn
          )
        }
      >
        <input
          className={styles.logInInput}
          placeholder="User Name..."
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <hr className={styles.logInHr} />
        <input
          className={styles.logInInput}
          placeholder="Password..."
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <hr className={styles.logInHr} />
        <button type="submit" className={styles.logInButton}>
          Log In
        </button>
        <div className={styles.errorMassege}>{failedLogText}</div>
      </form>
      <p className={styles.logInParagraph}>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.logInLink}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};
export default LogIn;
