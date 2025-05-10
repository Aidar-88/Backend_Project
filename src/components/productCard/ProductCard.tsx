import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaTruck, FaTag } from 'react-icons/fa';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';
import { useFavorites } from "../../context/FavoritesContext";
import { Product } from '../../types/Product';

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
    const isLiked = isFavorite(product.id);

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLiked) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        const price = typeof product.price === 'string' 
            ? parseFloat(product.price.replace(/[^0-9.-]+/g, ''))
            : product.price;

        addToCart({
            id: product.id.toString(),
            name: product.name,
            price: price,
            color: product.color,
            size: product.size[0] // По умолчанию берем первый размер
        });
    };

    const formatPrice = (price: number | string): string => {
        const numericPrice = typeof price === 'string' 
            ? parseFloat(price.replace(/[^0-9.-]+/g, ''))
            : price;
        return new Intl.NumberFormat('ru-RU').format(numericPrice);
    };

    const getDiscountedPrice = (): number => {
        if (!product.discount) return 0;
        const basePrice = typeof product.price === 'string' 
            ? parseFloat(product.price.replace(/[^0-9.-]+/g, ''))
            : product.price;
        return Math.round(basePrice * (1 - product.discount / 100));
    };

    const basePrice = typeof product.price === 'string' 
        ? parseFloat(product.price.replace(/[^0-9.-]+/g, ''))
        : product.price;
    const discountedPrice = getDiscountedPrice();

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <button className={styles.likeButton} onClick={handleLikeClick}>
                {isLiked ? <FaHeart className={styles.likedIcon} /> : <FaRegHeart />}
            </button>
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} className={styles.image} />
                {product.discount && (
                    <div className={styles.discountBadge}>
                        -{product.discount}%
                    </div>
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.brand}>{product.brand}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.category}>{product.category}</div>
                <div className={styles.ratingBlock}>
                    <div className={styles.rating}>
                        <FaStar className={styles.starIcon} />
                        <span>{product.rating}</span>
                    </div>
                    <span className={styles.reviews}>({product.reviews} отзывов)</span>
                </div>
                <div className={styles.priceBlock}>
                    {product.discount ? (
                        <>
                            <span className={styles.oldPrice}>{formatPrice(basePrice)} ₽</span>
                            <span className={styles.newPrice}>{formatPrice(discountedPrice)} ₽</span>
                        </>
                    ) : (
                        <>
                            <span className={styles.oldPrice}></span>
                            <span className={styles.newPrice}>{formatPrice(basePrice)} ₽</span>
                        </>
                    )}
                </div>
                <div className={styles.badges}>
                    {product.freeShipping && (
                        <div className={styles.badge}>
                            <FaTruck className={styles.badgeIcon} />
                            Бесплатная доставка
                        </div>
                    )}
                    {product.returnAvailable && (
                        <div className={styles.badge}>
                            <FaTag className={styles.badgeIcon} />
                            Возврат 30 дней
                        </div>
                    )}
                </div>
                <button className={styles.addToCartButton} onClick={handleAddToCart}>
                    В корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
