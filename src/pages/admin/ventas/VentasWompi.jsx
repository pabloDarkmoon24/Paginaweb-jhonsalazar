// VentasEpayco.jsx — Ventas en línea (ePayco)
import { useState, useEffect, Fragment } from 'react';
import { LuDollarSign, LuReceipt, LuCircleCheck, LuCircleX, LuClock, LuTruck } from 'react-icons/lu';
import { getOrdersByPaymentMethod, updateOrderStatus } from '../../../services/ordersService';
import { formatPrice, formatDate } from '../../../utils/formatters';
import '../dashboard/Dashboard.css';
import './VentasWompi.css';

// Estados de envío — solo aplican cuando el pago fue confirmado
const SHIPPING_OPTIONS = [
  { value: 'paid',      label: 'Pendiente de envío' },
  { value: 'shipped',   label: 'Enviado'             },
  { value: 'completed', label: 'Entregado'           },
];

const EPAYCO_RESPONSE_LABEL = {
  Aceptada:  'Aceptada',
  Accepted:  'Aceptada',
  Rechazada: 'Rechazada',
  Rejected:  'Rechazada',
  Failed:    'Fallida',
  Pendiente: 'Pendiente',
  Pending:   'Pendiente',
};

// Badge de pago: color según respuesta de ePayco
const paymentBadgeClass = (response) => {
  if (!response) return 'pending';
  if (['Aceptada','Accepted'].includes(response))          return 'paid';
  if (['Rechazada','Rejected','Failed'].includes(response)) return 'rejected';
  return 'pending';
};

// Badge de envío: solo para órdenes con pago confirmado
const shippingBadgeClass = (status) => {
  if (status === 'shipped')   return 'admin-badge--status-shipped';
  if (status === 'completed') return 'admin-badge--status-completed';
  return 'admin-badge--status-pending';  // paid = pendiente de envío
};

const shippingLabel = (status) => {
  if (status === 'shipped')   return 'Enviado';
  if (status === 'completed') return 'Entregado';
  return 'Pendiente de envío';
};

const VentasWompi = () => {
  const [orders, setOrders]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [updating, setUpdating]       = useState(null);
  const [dateFilter, setDateFilter]   = useState('all');
  const [tabFilter, setTabFilter]     = useState('all');  // all | pendiente-envio | shipped | rejected | pending
  const [expanded, setExpanded]       = useState(null);

  useEffect(() => {
    getOrdersByPaymentMethod('epayco')
      .then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleShippingChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch { alert('Error actualizando estado'); }
    finally { setUpdating(null); }
  };

  // Aplicar filtro de período
  const byDate = (() => {
    if (dateFilter === 'all') return orders;
    const cutoff = new Date();
    if (dateFilter === '7d')  cutoff.setDate(cutoff.getDate() - 7);
    if (dateFilter === '30d') cutoff.setDate(cutoff.getDate() - 30);
    if (dateFilter === '90d') cutoff.setDate(cutoff.getDate() - 90);
    return orders.filter(o => {
      if (!o.createdAt) return false;
      const d = o.createdAt.toDate ? o.createdAt.toDate() : new Date(o.createdAt);
      return d >= cutoff;
    });
  })();

  // Grupos para conteos (sobre byDate)
  const pendienteEnvio = byDate.filter(o => o.status === 'paid');
  const enviados       = byDate.filter(o => o.status === 'shipped');
  const entregados     = byDate.filter(o => o.status === 'completed');
  const rechazados     = byDate.filter(o => o.status === 'rejected');
  const sinConfirmar   = byDate.filter(o => o.status === 'pending');
  const cobrados       = [...pendienteEnvio, ...enviados, ...entregados];

  // Aplicar filtro de pestaña
  const filtered = (() => {
    if (tabFilter === 'pendiente-envio') return pendienteEnvio;
    if (tabFilter === 'shipped')         return enviados;
    if (tabFilter === 'completed')       return entregados;
    if (tabFilter === 'rejected')        return rechazados;
    if (tabFilter === 'pending')         return sinConfirmar;
    return byDate;
  })();

  const revenue  = cobrados.reduce((s, o) => s + (o.total || 0), 0);

  const METRICS = [
    { label: 'Ingresos cobrados',     value: formatPrice(revenue),    Icon: LuDollarSign,  color: '#059669', bg: '#ecfdf5' },
    { label: 'Pagos confirmados',     value: cobrados.length,         Icon: LuCircleCheck, color: '#059669', bg: '#ecfdf5' },
    { label: 'Pendientes de envío',   value: pendienteEnvio.length,   Icon: LuClock,       color: '#d97706', bg: '#fffbeb' },
    { label: 'Enviados',              value: enviados.length,         Icon: LuTruck,       color: '#2563eb', bg: '#eff6ff' },
    { label: 'Sin confirmar pago',    value: sinConfirmar.length,     Icon: LuReceipt,     color: '#9ca3af', bg: '#f9fafb' },
    { label: 'Rechazados',            value: rechazados.length,       Icon: LuCircleX,     color: '#dc2626', bg: '#fef2f2' },
  ];

  if (loading) return <div className="admin-loading">Cargando ventas…</div>;

  return (
    <div>
      <h1 className="admin-page-title">Ventas en Línea — ePayco</h1>

      {/* Métricas */}
      <div className="ventas-metrics" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {METRICS.map((m, i) => (
          <div key={i} className="ventas-metric-card">
            <div className="ventas-metric-icon" style={{ background: m.bg, color: m.color }}>
              <m.Icon size={20} />
            </div>
            <div className="ventas-metric-info">
              <span className="ventas-metric-value">{m.value}</span>
              <span className="ventas-metric-label">{m.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros período */}
      <div className="admin-filters">
        {[
          { value: 'all', label: 'Todo el tiempo' },
          { value: '7d',  label: 'Últimos 7 días'  },
          { value: '30d', label: 'Últimos 30 días'  },
          { value: '90d', label: 'Últimos 90 días'  },
        ].map(f => (
          <button key={f.value} className={`admin-filter-btn ${dateFilter === f.value ? 'active' : ''}`} onClick={() => setDateFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Pestañas de estado */}
      <div className="admin-filters" style={{ marginTop: '0.5rem' }}>
        {[
          { value: 'all',             label: `Todos (${byDate.length})`                    },
          { value: 'pendiente-envio', label: `Pendiente de envío (${pendienteEnvio.length})` },
          { value: 'shipped',         label: `Enviados (${enviados.length})`               },
          { value: 'completed',       label: `Entregados (${entregados.length})`            },
          { value: 'pending',         label: `Sin confirmar (${sinConfirmar.length})`       },
          { value: 'rejected',        label: `Rechazados (${rechazados.length})`           },
        ].map(f => (
          <button key={f.value} className={`admin-filter-btn ${tabFilter === f.value ? 'active' : ''}`} onClick={() => setTabFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="ventas-section" style={{ marginTop: '1rem' }}>
        {filtered.length === 0 ? (
          <p className="admin-empty">No hay órdenes en esta categoría.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Total</th>
                  <th>Pago ePayco</th>
                  <th>Envío</th>
                  <th>Cambiar envío</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => {
                  const isPaid = ['paid', 'shipped', 'completed'].includes(order.status);
                  return (
                    <Fragment key={order.id}>
                      <tr
                        className="ce-row"
                        onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td><code>{order.orderNumber}</code></td>
                        <td>{order.customer?.name}</td>
                        <td>{order.customer?.phone || '—'}</td>
                        <td><strong>{formatPrice(order.total)}</strong></td>

                        {/* Estado pago ePayco */}
                        <td>
                          <span className={`admin-badge admin-badge--status-${paymentBadgeClass(order.epaycoResponse)}`}>
                            {order.epaycoResponse
                              ? (EPAYCO_RESPONSE_LABEL[order.epaycoResponse] || order.epaycoResponse)
                              : 'Sin respuesta'}
                          </span>
                        </td>

                        {/* Estado envío */}
                        <td>
                          {isPaid ? (
                            <span className={`admin-badge ${shippingBadgeClass(order.status)}`}>
                              {shippingLabel(order.status)}
                            </span>
                          ) : (
                            <span style={{ color: '#9ca3af', fontSize: '13px' }}>—</span>
                          )}
                        </td>

                        {/* Selector cambiar envío */}
                        <td onClick={e => e.stopPropagation()}>
                          {isPaid ? (
                            <select
                              className="admin-status-select"
                              value={order.status}
                              disabled={updating === order.id}
                              onChange={e => handleShippingChange(order.id, e.target.value)}
                            >
                              {SHIPPING_OPTIONS.map(s => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                              ))}
                            </select>
                          ) : (
                            <span style={{ color: '#9ca3af', fontSize: '13px' }}>—</span>
                          )}
                        </td>

                        <td>{order.createdAt ? formatDate(order.createdAt) : '—'}</td>
                        <td style={{ color: '#9ca3af', fontSize: '16px' }}>
                          {expanded === order.id ? '▲' : '▼'}
                        </td>
                      </tr>

                      {/* Detalle expandible */}
                      {expanded === order.id && (
                        <tr>
                          <td colSpan={9} className="ce-detail">
                            <div className="ce-detail-grid">
                              <div className="ce-detail-item">
                                <span>Email</span>
                                <strong>{order.customer?.email || '—'}</strong>
                              </div>
                              <div className="ce-detail-item">
                                <span>Ciudad</span>
                                <strong>{order.customer?.city || '—'}</strong>
                              </div>
                              <div className="ce-detail-item">
                                <span>Dirección</span>
                                <strong>{order.customer?.address || '—'}</strong>
                              </div>
                              <div className="ce-detail-item">
                                <span>Referencia ePayco</span>
                                <strong style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                  {order.epaycoRefPayco || '—'}
                                </strong>
                              </div>
                              <div className="ce-detail-item">
                                <span>ID Transacción</span>
                                <strong style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                                  {order.epaycoTransactionId || '—'}
                                </strong>
                              </div>
                              <div className="ce-detail-item">
                                <span>Respuesta ePayco</span>
                                <strong>{order.epaycoResponse || '—'}</strong>
                              </div>
                            </div>

                            <div className="ce-detail-products">
                              <p className="ce-detail-products-title">Productos</p>
                              {(order.items || []).map((item, i) => (
                                <div key={i} className="ce-detail-product-row">
                                  <span>{item.name} × {item.quantity}</span>
                                  <span>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VentasWompi;
