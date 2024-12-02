import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = ({ setIsAccordionOpen }) => {
  const toggleSearchAccotdion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const setFalseSearchAccotdion = () => {
    setIsAccordionOpen((prev) => {
      return (prev = false);
    });
  };

  return (
    <div className={styles.Footer}>
      <footer className={styles.footer}>
        <Link to="/">
          <button onClick={setFalseSearchAccotdion}>🏠</button>
        </Link>
        <button onClick={toggleSearchAccotdion}>🔍</button>
        <Link to="/createPost">
          <button onClick={setFalseSearchAccotdion}>➕</button>
        </Link>
        <button onClick={setFalseSearchAccotdion}>🎥</button>
        <Link to="/userProfile">
          <button onClick={setFalseSearchAccotdion}>👤</button>
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
