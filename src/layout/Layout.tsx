import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import styles from "./Layout.module.css";

const Layout: FC = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main} role="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;