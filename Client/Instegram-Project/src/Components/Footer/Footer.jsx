import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.Footer}>
      <footer className={styles.footer}>
        <button>🏠</button>
        <button>🔍</button>
        <button>➕</button>
        <button>🎥</button>
        <button>👤</button>
      </footer>
    </div>
  );
};

export default Footer;
