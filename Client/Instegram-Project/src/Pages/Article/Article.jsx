import { Outlet } from "react-router-dom";
import Header from "../../Components/Headeer/Header";
import Footer from "../../Components/Footer/Footer";

const Article = ({ setIsLogIn }) => {
  return (
    <div className="article">
      <Header setIsLogIn={setIsLogIn} />
      <Footer />
      <Outlet />
    </div>
  );
};

export default Article;
