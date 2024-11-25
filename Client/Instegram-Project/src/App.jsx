import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Children, useState } from "react";

//import components
import SignUp from "./Pages/Sign-up/SignUp.jsx";
import HomePage from "./Pages/Home/HomePage.jsx";
import LogIn from "./Pages/Log-in/LogIn.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Headeer/Header.jsx";
import Article from "./Pages/Article/Article.jsx";

function App() {
  const [isLogIn, setIsLogIn] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Article />,
      children: [
        {
          path: "/",
          element: <HomePage isLogIn={isLogIn} setIsLogIn={setIsLogIn} />,
        },
      ],
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
