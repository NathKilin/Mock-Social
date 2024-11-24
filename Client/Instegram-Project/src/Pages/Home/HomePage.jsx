import { Navigate } from "react-router-dom";

const HomePage = ({ isLogIn }) => {
  console.log(isLogIn);

  if (!isLogIn) {
    return <Navigate to="/login" replace />;
  }

  return <div>Home Page</div>;
};

export default HomePage;
