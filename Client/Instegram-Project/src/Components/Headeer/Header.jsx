import { FaSignOutAlt } from "react-icons/fa";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsLogIn }) => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mock Social</div>
      <div className={styles.icons}>
        <button>❤️</button>
        <button>✉️</button>
        <button className={styles.logoutButton}>
          <FaSignOutAlt
            onClick={() => {
              setIsLogIn(false);
              navigate("/");
            }}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
