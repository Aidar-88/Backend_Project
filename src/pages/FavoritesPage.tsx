import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/productCard/ProductCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.title}>Избранное</h1>
      {favorites.length > 0 ? (
        <div className={styles.productsGrid}>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>У вас пока нет избранных товаров</p>
          <p>Добавляйте товары в избранное, нажимая на сердечко</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;