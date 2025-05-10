import { useCart } from "../context/CartContext";
import styles from "./CartPage.module.css";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const CartPage: FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum: number, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Корзина пуста");
      return;
    }
    
    clearCart();
    alert("Заказ успешно оформлен!");
    navigate('/');
  };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.title}>Корзина</h1>
      
      {cart.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                </div>
                
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.total}>
              <span>Итого:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Оформить заказ
            </button>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <p>Ваша корзина пуста</p>
          <p>Добавьте товары из каталога</p>
        </div>
      )}
    </div>
  );
};

export default CartPage; 