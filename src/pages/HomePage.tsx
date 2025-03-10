import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>A New Chapter is Loading…</h1>
                <button className={styles.button} onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <main className={styles.main}>
                <p>Simplicity in design, clarity in purpose, impact in experience.</p>
            </main>
            <footer className={styles.footer}>
                <p>&copy; 2025 JSON Statham</p>
            </footer>
        </div>
    );
};

export default HomePage;
