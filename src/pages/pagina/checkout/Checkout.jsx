// Checkout.jsx - Página de pago
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { createOrder } from '../../../services/ordersService';
import { formatPrice } from '../../../utils/formatters';
import './Checkout.css';

// Calcula fecha estimada de entrega (N días hábiles desde hoy)
function estimatedDeliveryDate(businessDays = 7) {
  const date = new Date();
  let added = 0;
  while (added < businessDays) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

const Checkout = () => {
  const { items, total, clearCart, isEmpty } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [epaycoReady, setEpaycoReady] = useState(false);
  const epaycoHandlerRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const [errors, setErrors] = useState({});

  // Meta Pixel — InitiateCheckout al abrir el checkout
  useEffect(() => {
    if (isEmpty) return;
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        value:       total,
        currency:    'COP',
        num_items:   items.reduce((s, i) => s + i.quantity, 0),
        content_ids: items.map(i => i.id),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cargar script de ePayco
  useEffect(() => {
    if (document.getElementById('epayco-script')) {
      setEpaycoReady(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'epayco-script';
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.onload = () => setEpaycoReady(true);
    document.body.appendChild(script);
  }, []);

  // Configurar handler de ePayco cuando el script esté listo
  useEffect(() => {
    if (!epaycoReady || !window.ePayco) return;
    epaycoHandlerRef.current = window.ePayco.checkout.configure({
      key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
      test: false,
    });
  }, [epaycoReady]);

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

  // Pago con ePayco
  const handleEpayco = async () => {
    if (!validate()) return;
    if (!epaycoHandlerRef.current) {
      alert('El sistema de pago aún está cargando. Intenta de nuevo en un momento.');
      return;
    }
    setLoading(true);
    try {
      const order = await createOrder({
        customer: form,
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        total,
        paymentMethod: 'epayco',
      });

      const description = items.map(i => `${i.name} x${i.quantity}`).join(', ');

      epaycoHandlerRef.current.open({
        name: 'Dr. John Salazar — Productos Naturales',
        description,
        invoice: order.orderNumber,
        currency: 'cop',
        amount: String(total),
        tax_base: String(total),
        tax: '0',
        country: 'co',
        lang: 'es',
        external: 'true',
        response: 'https://drjohnsalazar.com.co/checkout/confirmacion',
        confirmation: 'https://epaycowebhook-i3szq2fqna-uc.a.run.app',
        email_billing: form.email,
        name_billing: form.name,
        address_billing: form.address,
        phone_billing: form.phone,
        extra1: order.orderNumber,
        extra2: form.city,
      });
    } catch (err) {
      console.error(err);
      alert('Error iniciando el pago. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
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

      // Meta Pixel — Purchase (contra entrega)
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Purchase', {
          value:       total,
          currency:    'COP',
          content_ids: items.map(i => i.id),
          content_type: 'product',
          order_id:    order.orderNumber,
        });
      }

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

  // Google Customer Reviews — se activa al confirmar el pedido (contra entrega)
  useEffect(() => {
    if (!success) return;

    window.renderOptIn = function () {
      window.gapi.load('surveyoptin', function () {
        window.gapi.surveyoptin.render({
          merchant_id:            5760217929,
          order_id:               orderNumber,
          email:                  form.email,
          delivery_country:       'CO',
          estimated_delivery_date: estimatedDeliveryDate(7),
        });
      });
    };

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [success, orderNumber, form.email]);

  // Estado de éxito (contra entrega)
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
                  <label htmlFor={field.name} className="checkout-label">{field.label}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`checkout-input ${errors[field.name] ? 'checkout-input--error' : ''}`}
                    autoComplete={field.name === 'email' ? 'email' : field.name === 'name' ? 'name' : field.name === 'phone' ? 'tel' : 'on'}
                  />
                  {errors[field.name] && (
                    <span className="checkout-error" role="alert">{errors[field.name]}</span>
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

            {/* Señales de confianza */}
            <div className="checkout-trust-bar">
              <span>🚚 Envío gratis a toda Colombia</span>
              <span>🔒 Pago 100% seguro</span>
              <span>↩️ 15 días de devolución</span>
            </div>

            {/* Métodos de pago */}
            <h2 className="checkout-section-title" style={{ marginTop: '2rem' }}>Método de pago</h2>

            <div className="checkout-payment-methods">
              {/* ePayco — tarjeta, PSE, Nequi, etc. */}
              <button
                className="checkout-pay-btn checkout-pay-epayco"
                onClick={handleEpayco}
                disabled={loading || !epaycoReady}
              >
                <span className="checkout-pay-icon">💳</span>
                <div>
                  <strong>Pagar en línea</strong>
                  <small>Tarjeta, PSE, Nequi, Bancolombia y más</small>
                </div>
              </button>

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
