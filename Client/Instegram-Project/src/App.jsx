import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import components
import LogIn from "./Components/Log-in/LogIn.jsx";
import SignUp from "./Components/Sign-up/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
