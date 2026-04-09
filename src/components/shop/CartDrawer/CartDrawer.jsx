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

  const handleVerProductos = () => {
    onClose();
    navigate('/tienda');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Tu Carrito</h2>
          <div className="cart-drawer-header-right">
            {itemCount > 0 && (
              <button
                type="button"
                className="cart-clear-btn"
                onClick={clearCart}
                aria-label="Vaciar todos los productos del carrito"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              className="cart-close-btn"
              onClick={onClose}
              aria-label="Cerrar carrito"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty" role="status">
              <span className="cart-empty-icon" aria-hidden="true">🛒</span>
              <p>Tu carrito está vacío</p>
              <button type="button" className="cart-shop-btn" onClick={handleVerProductos}>
                Ver productos
              </button>
            </div>
          ) : (
            <ul className="cart-items-list" role="list">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-img-wrapper">
                    <img
                      src={item.image || item.imageUrl}
                      alt={item.name}
                      className="cart-item-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>

                    <div className="cart-item-qty" role="group" aria-label={`Cantidad de ${item.name}`}>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Reducir cantidad de ${item.name}`}
                      >
                        −
                      </button>
                      <span className="cart-qty-num" aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Eliminar ${item.name} del carrito`}
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
            <div className="cart-trust-row">
              <span className="cart-trust-item">🚚 Envío gratis</span>
              <span className="cart-trust-item">🔒 Pago seguro</span>
              <span className="cart-trust-item">↩️ 15 días devolución</span>
            </div>
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value">{formatPrice(total)}</span>
            </div>
            <button type="button" className="cart-checkout-btn" onClick={handleCheckout}>
              Proceder al pago →
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
