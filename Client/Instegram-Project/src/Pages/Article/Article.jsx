import { Outlet } from "react-router-dom";
import Header from "../../Components/Headeer/Header";
import Footer from "../../Components/Footer/Footer";

const Article = () => {
  return (
    <div className="article">
      <Header />
      <Footer />
      <Outlet />
    </div>
  );
};

export default Article;
