import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mock Social</div>
      <div className={styles.icons}>
          <button>❤️</button>
          <button>✉️</button>
      </div>
    </header>
  );
};

export default Header;
