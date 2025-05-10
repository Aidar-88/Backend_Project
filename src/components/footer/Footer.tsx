import { FC } from 'react';
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.logo}>JSON Statham</h2>
          <p className={styles.description}>Premium sneakers marketplace for style and comfort.</p>
          <div className={styles.social}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaInstagram />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaGithub />
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.title}>Navigation</h4>
          <ul className={styles.links}>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            <li><Link to="/catalog" className={styles.link}>Catalog</Link></li>
            <li><Link to="/favorites" className={styles.link}>Favorites</Link></li>
            <li><Link to="/cart" className={styles.link}>Cart</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4 className={styles.title}>Contact</h4>
          <div className={styles.contact}>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <span>support@jsonstatham.com</span>
            </div>
            <div className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <span>+7 (777) 777-77-77</span>
            </div>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span>Almaty, Kazakhstan</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.title}>Newsletter</h4>
          <p className={styles.newsletterText}>Subscribe to get updates on new arrivals and special offers.</p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={styles.newsletterInput}
              required 
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} JSON Statham. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link to="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link to="/terms" className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
