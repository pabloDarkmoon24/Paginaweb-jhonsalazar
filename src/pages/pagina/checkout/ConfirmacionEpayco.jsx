// ConfirmacionEpayco.jsx - Página de respuesta tras el pago con ePayco
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Checkout.css';

// Calcula fecha estimada de entrega
function estimatedDeliveryDate(businessDays = 7) {
  const date = new Date();
  let added = 0;
  while (added < businessDays) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return date.toISOString().split('T')[0];
}

const ConfirmacionEpayco = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading'); // 'loading' | 'approved' | 'rejected' | 'pending'

  const response    = searchParams.get('x_response');
  const orderNumber = searchParams.get('x_extra1');
  const amount      = searchParams.get('x_amount');
  const email       = searchParams.get('x_customer_email') || '';
  const refPayco    = searchParams.get('x_ref_payco') || '';

  useEffect(() => {
    if (!response) {
      setStatus('pending');
      return;
    }
    if (response === 'Aceptada' || response === 'Accepted') {
      clearCart();
      setStatus('approved');
    } else if (response === 'Rechazada' || response === 'Rejected' || response === 'Failed') {
      setStatus('rejected');
    } else {
      setStatus('pending');
    }
  }, [response]);

  // Google Customer Reviews al aprobar
  useEffect(() => {
    if (status !== 'approved' || !orderNumber || !email) return;

    window.renderOptIn = function () {
      window.gapi.load('surveyoptin', function () {
        window.gapi.surveyoptin.render({
          merchant_id:             5760217929,
          order_id:                orderNumber,
          email,
          delivery_country:        'CO',
          estimated_delivery_date: estimatedDeliveryDate(7),
        });
      });
    };

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, [status, orderNumber, email]);

  if (status === 'loading') {
    return (
      <div className="checkout-success">
        <div className="checkout-success-card">
          <div className="checkout-loading">Verificando tu pago...</div>
        </div>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div className="checkout-success">
        <div className="checkout-success-card">
          <div className="checkout-success-icon">✅</div>
          <h2 className="checkout-success-title">¡Pago aprobado!</h2>
          <p className="checkout-success-sub">
            Tu pedido ha sido confirmado y está en proceso de alistamiento.
          </p>
          {orderNumber && (
            <div className="checkout-success-order">
              <span>Número de orden</span>
              <strong>{orderNumber}</strong>
            </div>
          )}
          {refPayco && (
            <div className="checkout-success-order" style={{ marginTop: '0.5rem' }}>
              <span>Referencia ePayco</span>
              <strong style={{ fontSize: '14px' }}>{refPayco}</strong>
            </div>
          )}
          <p className="checkout-success-whatsapp">
            📲 Te enviaremos actualizaciones de tu pedido. Si tienes dudas escríbenos al <strong>+57 311 3958098</strong>.
          </p>
          <Link to="/tienda" className="checkout-back-btn">
            Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="checkout-success">
        <div className="checkout-success-card">
          <div className="checkout-success-icon">❌</div>
          <h2 className="checkout-success-title">Pago rechazado</h2>
          <p className="checkout-success-sub">
            Tu pago no pudo ser procesado. No se realizó ningún cobro.
          </p>
          <p className="checkout-success-whatsapp">
            Por favor intenta de nuevo o elige otro método de pago. Si el problema persiste escríbenos al <strong>+57 311 3958098</strong>.
          </p>
          <Link to="/checkout" className="checkout-back-btn">
            Volver al pago
          </Link>
        </div>
      </div>
    );
  }

  // Pending
  return (
    <div className="checkout-success">
      <div className="checkout-success-card">
        <div className="checkout-success-icon">⏳</div>
        <h2 className="checkout-success-title">Pago pendiente</h2>
        <p className="checkout-success-sub">
          Tu transacción está siendo verificada. Te notificaremos cuando se confirme.
        </p>
        {orderNumber && (
          <div className="checkout-success-order">
            <span>Número de orden</span>
            <strong>{orderNumber}</strong>
          </div>
        )}
        <p className="checkout-success-whatsapp">
          📲 Si tienes dudas escríbenos al <strong>+57 311 3958098</strong>.
        </p>
        <Link to="/tienda" className="checkout-back-btn">
          Ir a la tienda
        </Link>
      </div>
    </div>
  );
};

export default ConfirmacionEpayco;
