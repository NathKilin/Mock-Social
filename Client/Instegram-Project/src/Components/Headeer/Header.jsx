import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "../../assets/notification.png";
import LogOutIcon from "../../assets/logout.png";
import Logo from "../../assets/PENN.png";

const Header = ({ setIsLogIn }) => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <img
        onClick={() => navigate("/")}
        src={Logo}
        alt="Logo"
        className={styles.logo}
        style={{ width: "80px", height: "auto" }}
      />
      <div className={styles.icons}>
        <button>
          <img
            src={NotificationIcon}
            alt="Create Post"
            style={{ width: "30px", height: "30px" }}
          />
        </button>
        <button className={styles.logoutButton}>
          <img
            src={LogOutIcon}
            alt="Log Out"
            style={{ width: "30px", height: "30px" }}
            onClick={() => {
              document.cookie =
                "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
