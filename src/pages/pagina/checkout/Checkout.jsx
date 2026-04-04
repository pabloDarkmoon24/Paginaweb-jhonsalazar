// Checkout.jsx - Página de pago contra entrega
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { createOrder } from '../../../services/ordersService';
import { formatPrice } from '../../../utils/formatters';
import './Checkout.css';

const Checkout = () => {
  const { items, total, clearCart, isEmpty } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Requerido';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) newErrors.phone = 'Teléfono inválido (10 dígitos)';
    if (!form.address.trim()) newErrors.address = 'Requerido';
    if (!form.city.trim()) newErrors.city = 'Requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pago contra entrega
  const handleContraEntrega = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const order = await createOrder({
        customer: form,
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        total,
        paymentMethod: 'contra_entrega',
      });
      clearCart();
      setOrderNumber(order.orderNumber);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Error enviando la solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Estado de éxito
  if (success) {
    return (
      <div className="checkout-success">
        <div className="checkout-success-card">
          <div className="checkout-success-icon">📦</div>
          <h2 className="checkout-success-title">¡Solicitud enviada!</h2>
          <p className="checkout-success-sub">
            Recibirás tu pedido y pagarás al momento de la entrega.
          </p>
          <div className="checkout-success-order">
            <span>Número de orden</span>
            <strong>{orderNumber}</strong>
          </div>
          <p className="checkout-success-whatsapp">
            📲 Nos estaremos comunicando contigo por WhatsApp para confirmar el pedido y enviarte el producto. Si lo necesitas, también puedes escribirnos al <strong>+57 311 3958098</strong>.
          </p>
          <Link to="/tienda" className="checkout-back-btn">
            Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="checkout-empty">
        <p>Tu carrito está vacío.</p>
        <Link to="/tienda" className="checkout-back-btn">Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Finalizar Compra</h1>

        <div className="checkout-layout">
          {/* Formulario */}
          <div className="checkout-form-section">
            <h2 className="checkout-section-title">Datos de envío</h2>
            <div className="checkout-form">
              {[
                { name: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Juan Pérez' },
                { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'correo@ejemplo.com' },
                { name: 'phone', label: 'Teléfono (10 dígitos)', type: 'tel', placeholder: '3001234567' },
                { name: 'address', label: 'Dirección', type: 'text', placeholder: 'Calle 123 #45-67' },
                { name: 'city', label: 'Ciudad', type: 'text', placeholder: 'Bogotá' },
              ].map(field => (
                <div key={field.name} className="checkout-field">
                  <label className="checkout-label">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`checkout-input ${errors[field.name] ? 'checkout-input--error' : ''}`}
                  />
                  {errors[field.name] && (
                    <span className="checkout-error">{errors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resumen + Pago */}
          <div className="checkout-summary-section">
            <h2 className="checkout-section-title">Resumen del pedido</h2>
            <div className="checkout-items">
              {items.map(item => (
                <div key={item.id} className="checkout-item-row">
                  <span className="checkout-item-name">
                    {item.name} <em>x{item.quantity}</em>
                  </span>
                  <span className="checkout-item-subtotal">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="checkout-total-row">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            {/* Métodos de pago */}
            <h2 className="checkout-section-title" style={{ marginTop: '2rem' }}>Método de pago</h2>

            <div className="checkout-payment-methods">
              {/* Wompi desactivado temporalmente */}
              {/* <button
                className="checkout-pay-btn checkout-pay-wompi"
                onClick={handleWompi}
                disabled={loading || !wompiReady}
              >
                <span className="checkout-pay-icon">💳</span>
                <div>
                  <strong>Pagar con Wompi</strong>
                  <small>Tarjeta, PSE, Nequi, Bancolombia</small>
                </div>
              </button> */}

              {/* Contra entrega */}
              <button
                className="checkout-pay-btn checkout-pay-cod"
                onClick={handleContraEntrega}
                disabled={loading}
              >
                <span className="checkout-pay-icon">📦</span>
                <div>
                  <strong>Contra entrega</strong>
                  <small>Paga cuando recibas tu pedido</small>
                </div>
              </button>
            </div>

            {loading && (
              <div className="checkout-loading">Procesando...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
