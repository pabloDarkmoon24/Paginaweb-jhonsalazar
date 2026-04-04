// CartDrawer.jsx - Panel lateral del carrito
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../utils/formatters';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();
  const navigate = useNavigate();

  // Bloquear scroll cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Tu Carrito</h2>
          <div className="cart-drawer-header-right">
            {itemCount > 0 && (
              <button className="cart-clear-btn" onClick={clearCart}>
                Vaciar
              </button>
            )}
            <button className="cart-close-btn" onClick={onClose} aria-label="Cerrar carrito">
              ✕
            </button>
          </div>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p>Tu carrito está vacío</p>
              <button className="cart-shop-btn" onClick={onClose}>
                Ver productos
              </button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-img-wrapper">
                    <img
                      src={item.image || item.imageUrl}
                      alt={item.name}
                      className="cart-item-img"
                    />
                  </div>

                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>

                    <div className="cart-item-qty">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="cart-qty-num">{item.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Eliminar"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value">{formatPrice(total)}</span>
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceder al pago →
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
