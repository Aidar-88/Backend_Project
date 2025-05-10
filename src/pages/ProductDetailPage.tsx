import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductDetailPage.module.css";
import { products } from "../data/products";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import ProductCard from "../components/productCard/ProductCard";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === Number(id));
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [liked, setLiked] = useState<boolean>(false);
    const { addToCart } = useCart();

    if (!product) {
        return <div className={styles.notFound}>Товар не найден.</div>;
    }

    const formatPrice = (price: number | string): string => {
        const numericPrice = typeof price === 'string' 
            ? parseFloat(price.replace(/[^0-9.-]+/g, ''))
            : price;
        return new Intl.NumberFormat('ru-RU').format(numericPrice);
    };

    const basePrice = typeof product.price === 'string' 
        ? parseFloat(product.price.replace(/[^0-9.-]+/g, ''))
        : product.price;

    const discountedPrice = product.discount
        ? Math.round(basePrice * (1 - product.discount / 100))
        : basePrice;

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (type: "inc" | "dec") => {
        setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
    };

    const toggleLike = () => {
        setLiked((prev) => !prev);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Пожалуйста, выберите размер");
            return;
        }

        addToCart({
            id: product.id.toString(),
            name: product.name,
            price: basePrice,
            size: selectedSize,
            color: selectedColor || product.color
        });

        navigate('/cart');
    };

    const similarProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

    return (
        <div className={styles.detailPage}>
            <div className={styles.topSection}>
                <div className={styles.imageSection}>
                    <img src={product.image} alt={product.name} className={styles.image} />
                    {product.discount && (
                        <div className={styles.discountBadge}>
                            -{product.discount}%
                        </div>
                    )}
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.headerRow}>
                        <div>
                            <h1 className={styles.name}>{product.name}</h1>
                            <div className={styles.brandCategory}>
                                <span className={styles.brand}>{product.brand}</span>
                                <span className={styles.category}>{product.category}</span>
                            </div>
                        </div>
                        <button className={styles.likeButton} onClick={toggleLike} aria-label="Добавить в избранное">
                            {liked ? <FaHeart size={24} color="red" /> : <FaRegHeart size={24} />}
                        </button>
                    </div>

                    <div className={styles.ratingBlock}>
                        <div className={styles.rating}>
                            <span className={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
                            <span className={styles.ratingNumber}>{product.rating}</span>
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
                            <span className={styles.newPrice}>{formatPrice(basePrice)} ₽</span>
                        )}
                    </div>

                    {product.color && (
                        <div className={styles.colorSelector}>
                            <div className={styles.colorLabel}>Цвет:</div>
                            <div className={styles.colors}>
                                <div
                                    className={`${styles.colorCircle} ${selectedColor === product.color ? styles.active : ""}`}
                                    onClick={() => handleColorSelect(product.color)}
                                    style={{ backgroundColor: product.color.toLowerCase() }}
                                ></div>
                            </div>
                        </div>
                    )}

                    <div className={styles.sizeSelector}>
                        <div className={styles.sizeLabel}>Размер:</div>
                        <div className={styles.sizes}>
                            {product.size.map((size) => (
                                <button
                                    key={size}
                                    className={`${styles.sizeButton} ${selectedSize === size ? styles.active : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.quantitySelector}>
                        <button onClick={() => handleQuantityChange("dec")} aria-label="Уменьшить количество">-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange("inc")} aria-label="Увеличить количество">+</button>
                    </div>

                    <div className={styles.deliveryInfo}>
                        {product.freeShipping && <p>✅ Бесплатная доставка</p>}
                        {product.returnAvailable && <p>♻️ Возврат в течение 30 дней</p>}
                    </div>

                    <button className={styles.buyButton} onClick={handleAddToCart}>
                        <FaShoppingCart style={{ marginRight: '8px' }} />
                        Купить сейчас
                    </button>
                </div>
            </div>

            <div className={styles.descriptionBlock}>
                <h3 className={styles.descriptionTitle}>Описание товара</h3>
                <p className={styles.descriptionText}>{product.description}</p>
            </div>

            <div className={styles.similarProducts}>
                <h2>Похожие товары</h2>
                <div className={styles.productsGrid}>
                    {similarProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
