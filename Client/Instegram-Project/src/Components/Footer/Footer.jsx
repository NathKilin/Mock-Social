import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePostIcon from "../../assets/create1.png";
import HomeIcon from "../../assets/home1.png";
import SearchIcon from "../../assets/search1.png";
import ProfileIcon from "../../assets/profile1.png";

const Footer = ({ setIsAccordionOpen }) => {
  const toggleSearchAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const setFalseSearchAccordion = () => {
    setIsAccordionOpen((prev) => {
      return (prev = false);
    });
  };

  const globalUserID = useSelector((state) => state.user?.user?._id);

  return (
    <div className={styles.Footer}>
      <footer className={styles.footer}>
        <Link to="/">
          <button onClick={setFalseSearchAccordion}>
            <img
              src={HomeIcon}
              alt="Home"
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        </Link>
        <button onClick={toggleSearchAccordion}>
          <img
            src={SearchIcon}
            alt="Search"
            style={{ width: "30px", height: "30px" }}
          />
        </button>
        <Link to="/createPost">
          <button onClick={setFalseSearchAccordion}>
            <img
              src={CreatePostIcon}
              alt="Create Post"
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        </Link>
        <Link to={`/userProfile/${globalUserID}`}>
          <button onClick={setFalseSearchAccordion}>
            <img
              src={ProfileIcon}
              alt="Create Post"
              style={{ width: "30px", height: "30px" }}
            />
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
