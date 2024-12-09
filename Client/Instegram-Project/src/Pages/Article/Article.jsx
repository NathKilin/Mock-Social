import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../Components/Headeer/Header";
import Footer from "../../Components/Footer/Footer";
import SearchAccordion from "../../Components/searchAccordion/SearchAccordion.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice.js";
import axios from "axios";

const getUserApi = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/user/${userId}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const Article = ({ setIsLogIn, isLogIn }) => {
  const dispatch = useDispatch();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const globalUser = useSelector((state) => state.user);

  useEffect(() => {
    if (
      isLogIn &&
      Object.keys(globalUser).length === 0 &&
      globalUser.constructor === Object
    ) {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        getUserApi(userId).then((userData) => {
          dispatch(setUser(userData.user));
        });
      }
    }
  }, [isLogIn, globalUser, dispatch]);

  if (!isLogIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="article">
      <Header setIsLogIn={setIsLogIn} />
      <Outlet />
      {isAccordionOpen && (
        <SearchAccordion
          isAccordionOpen={isAccordionOpen}
          setIsAccordionOpen={setIsAccordionOpen}
        />
      )}
      <Footer setIsAccordionOpen={setIsAccordionOpen} />
    </div>
  );
};

export default Article;
