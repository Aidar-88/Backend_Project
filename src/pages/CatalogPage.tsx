import { FC, useState, useMemo } from 'react';
import { products } from "../data/products";
import ProductCard from "../components/productCard/ProductCard";
import styles from "./CatalogPage.module.css";

const ITEMS_PER_PAGE = 12;

interface FilterState {
  minPrice: number;
  maxPrice: number;
  color: string;
  rating: number;
  brand: string;
  category: string;
  hasDiscount: boolean;
  freeShipping: boolean;
}

const CatalogPage: FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 0,
    color: '',
    rating: 0,
    brand: '',
    category: '',
    hasDiscount: false,
    freeShipping: false
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (key: keyof FilterState, value: number | string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const price = typeof product.price === 'string' 
        ? parseFloat(product.price.replace(/[^0-9.-]+/g, ''))
        : product.price;

      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;
      if (filters.color && product.color.toLowerCase() !== filters.color.toLowerCase()) return false;
      if (filters.rating && product.rating < filters.rating) return false;
      if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
      if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      if (filters.hasDiscount && !product.discount) return false;
      if (filters.freeShipping && !product.freeShipping) return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const uniqueBrands = useMemo(() => 
    Array.from(new Set(products.map(p => p.brand))),
    []
  );

  const uniqueCategories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );

  const uniqueColors = useMemo(() => 
    Array.from(new Set(products.map(p => p.color))),
    []
  );

  return (
    <div className={styles.catalog}>
      <h1 className={styles.title}>Каталог кроссовок</h1>
      
      <div className={styles.content}>
        <aside className={styles.filters}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Цена</h3>
            <input
              type="number"
              className={styles.filterInput}
              placeholder="От"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
            />
            <input
              type="number"
              className={styles.filterInput}
              placeholder="До"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
            />
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Бренд</h3>
            <select
              className={styles.filterSelect}
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">Все бренды</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Категория</h3>
            <select
              className={styles.filterSelect}
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Все категории</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Цвет</h3>
            <select
              className={styles.filterSelect}
              value={filters.color}
              onChange={(e) => handleFilterChange('color', e.target.value)}
            >
              <option value="">Все цвета</option>
              {uniqueColors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Рейтинг</h3>
            <select
              className={styles.filterSelect}
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
            >
              <option value="0">Все рейтинги</option>
              <option value="3">3+ звезд</option>
              <option value="4">4+ звезд</option>
              <option value="5">5 звезд</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Дополнительно</h3>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.hasDiscount}
                onChange={(e) => handleFilterChange('hasDiscount', e.target.checked)}
              />
              Только со скидкой
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={filters.freeShipping}
                onChange={(e) => handleFilterChange('freeShipping', e.target.checked)}
              />
              Бесплатная доставка
            </label>
          </div>
        </aside>

        <main>
          <div className={styles.products}>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className={styles.noProducts}>Товары не найдены</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Назад
              </button>
              <span>Страница {currentPage} из {totalPages}</span>
              <button
                className={styles.paginationButton}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Вперед
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
