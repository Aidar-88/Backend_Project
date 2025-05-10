import { useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaSearch, FaShoppingCart, FaUserCircle, FaHeart, FaBars, FaTimes,
} from 'react-icons/fa';
import styles from './Header.module.css';

const Header: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>Json_Statham</Link>
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
            <Link to="/home" className={styles.link}>Home</Link>
            <Link to="/catalog" className={styles.link}>Catalog</Link>
            <Link to="/favorites" className={styles.link}>Favorites</Link>
            {user ? (
              <>
                <span className={styles.username}>{user}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <Link to="/login" className={styles.link}>Login</Link>
            )}
          </nav>
        </div>

        <div className={styles.center}>
          <div className={styles.search}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.right}>
          <Link to="/favorites" className={styles.icon}><FaHeart /></Link>
          <Link to="/cart" className={styles.icon}><FaShoppingCart /></Link>
          <Link to="/login" className={styles.icon}><FaUserCircle /></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
