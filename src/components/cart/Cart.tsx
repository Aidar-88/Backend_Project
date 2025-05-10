import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import styles from './Cart.module.css';
import { CartItem } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to see them here</p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Shopping Cart</h2>
      <div className={styles.items}>
        {cart.map((item: CartItem) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <h3>{item.name}</h3>
              <p className={styles.price}>${item.price.toFixed(2)}</p>
            </div>
            <div className={styles.quantityControls}>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className={styles.quantityButton}
              >
                <FaMinus />
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className={styles.quantityButton}
              >
                <FaPlus />
              </button>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className={styles.removeButton}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cartFooter}>
        <div className={styles.total}>
          <span>Total:</span>
          <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutButton}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart; 