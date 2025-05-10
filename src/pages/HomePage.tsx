import { FC } from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Premium Sneakers</h1>
        <p className={styles.heroText}>Discover the latest collection of exclusive sneakers from top brands.</p>
        <Link to="/catalog" className={styles.heroButton}>Shop Now</Link>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <img 
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60"
            alt="Authentic Sneakers" 
            className={styles.featureImage}
          />
          <h2 className={styles.featureTitle}>Authentic</h2>
          <p className={styles.featureText}>100% authentic sneakers from official retailers and brands.</p>
        </div>

        <div className={styles.feature}>
          <img 
            src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60"
            alt="Fast Delivery" 
            className={styles.featureImage}
          />
          <h2 className={styles.featureTitle}>Fast Delivery</h2>
          <p className={styles.featureText}>Quick and reliable shipping to your doorstep worldwide.</p>
        </div>

        <div className={styles.feature}>
          <img 
            src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&auto=format&fit=crop&q=60"
            alt="Easy Returns" 
            className={styles.featureImage}
          />
          <h2 className={styles.featureTitle}>Easy Returns</h2>
          <p className={styles.featureText}>30-day return policy for your peace of mind.</p>
        </div>
      </section>

      <section className={styles.categories}>
        <h2 className={styles.categoriesTitle}>Popular Categories</h2>
        <div className={styles.categoriesGrid}>
          <Link to="/catalog?category=running" className={styles.categoryCard}>
            <img 
              src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=60"
              alt="Running" 
              className={styles.categoryImage} 
            />
            <span className={styles.categoryName}>Running</span>
          </Link>
          <Link to="/catalog?category=basketball" className={styles.categoryCard}>
            <img 
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=60"
              alt="Basketball" 
              className={styles.categoryImage} 
            />
            <span className={styles.categoryName}>Basketball</span>
          </Link>
          <Link to="/catalog?category=casual" className={styles.categoryCard}>
            <img 
              src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&auto=format&fit=crop&q=60"
              alt="Casual" 
              className={styles.categoryImage} 
            />
            <span className={styles.categoryName}>Casual</span>
          </Link>
          <Link to="/catalog?category=lifestyle" className={styles.categoryCard}>
            <img 
              src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60"
              alt="Lifestyle" 
              className={styles.categoryImage} 
            />
            <span className={styles.categoryName}>Lifestyle</span>
          </Link>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>New Arrivals</h2>
        <p className={styles.ctaText}>Check out our latest collection of premium sneakers.</p>
        <Link to="/catalog?sort=newest" className={styles.ctaButton}>View Collection</Link>
      </section>
    </div>
  );
};

export default HomePage;
