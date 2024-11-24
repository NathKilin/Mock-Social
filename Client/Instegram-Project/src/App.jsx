import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";

//import components
import SignUp from "./Pages/Sign-up/SignUp.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import LogIn from "./Pages/Log-in/LogIn.jsx";

function App() {
  const [isLogIn, setIsLogIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage isLogIn={isLogIn} setIsLogIn={setIsLogIn} />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
