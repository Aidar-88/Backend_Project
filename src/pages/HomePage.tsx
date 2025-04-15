import styles from "./HomePage.module.css";
import Header from "../components/header/Header";

const HomePage = () => {

  return (
    <div>
      <Header />
      <div className={styles.container}>
      <main className={styles.main}>
        <p>Simplicity in design, clarity in purpose, impact in experience.</p>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 JSON Statham</p>
      </footer>
    </div>
    </div>
    
  );
};

export default HomePage;
