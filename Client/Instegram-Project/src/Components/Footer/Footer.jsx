import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

//todo route to other buttons

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <footer className={styles.footer}>
        <Link to="/">
          <button>🏠</button>
        </Link>
        {/* <Link to="/search"> */}
        <button>🔍</button>
        {/* </Link> */}
        <Link to="/createPost">
          <button>➕</button>
        </Link>
        {/* <Link to="/movies"> */}
        <button>🎥</button>
        {/* </Link> */}
        {/* <Link to="/profile"> */}
        <button>👤</button>
        {/* </Link> */}
      </footer>
    </div>
  );
};

export default Footer;
