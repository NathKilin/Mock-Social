import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../Components/Headeer/Header";
import Footer from "../../Components/Footer/Footer";
import SearchAccordion from "../../Components/searchAccordion/SearchAccordion.jsx";

const Article = ({ setIsLogIn }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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
