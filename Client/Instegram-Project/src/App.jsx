import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

//import components
import SignUp from "./Pages/Sign-up/SignUp.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import LogIn from "./Pages/Log-in/LogIn.jsx";
import Article from "./Pages/Article/Article.jsx";
import CreatePost from "./Pages/CreatePost/CreatePost.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Article isLogIn={isLogIn} setIsLogIn={setIsLogIn} />,
      children: [
        {
          path: "/",
          element: <HomePage isLogIn={isLogIn} setIsLogIn={setIsLogIn} />,
        },
        {
          path: "/createPost",
          element: <CreatePost />,
        },
        {
          path: "/userProfile",
          element: <UserProfile />,
        },
      ],
    },
    {
      path: "/login",
      element: <LogIn isLogIn={isLogIn} setIsLogIn={setIsLogIn} />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
