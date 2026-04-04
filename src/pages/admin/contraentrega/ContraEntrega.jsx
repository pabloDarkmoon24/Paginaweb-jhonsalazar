// ContraEntrega.jsx
import { useState, useEffect, Fragment } from 'react';
import { LuPackage, LuTruck, LuCircleCheck, LuCircleX, LuClock } from 'react-icons/lu';
import { getOrdersByPaymentMethod, updateOrderStatus } from '../../../services/ordersService';
import { formatPrice, formatDate } from '../../../utils/formatters';
import '../dashboard/Dashboard.css';
import './ContraEntrega.css';

const STATUS_OPTIONS = [
  { value: 'pending',   label: 'Pendiente' },
  { value: 'shipped',   label: 'Enviado' },
  { value: 'completed', label: 'Completado' },
  { value: 'cancelled', label: 'Cancelado' },
];

const STAT_CONFIG = [
  { value: 'pending',   label: 'Pendientes',   Icon: LuClock,       color: '#d97706', bg: '#fffbeb' },
  { value: 'shipped',   label: 'Enviados',      Icon: LuTruck,       color: '#2563eb', bg: '#eff6ff' },
  { value: 'completed', label: 'Completados',   Icon: LuCircleCheck, color: '#059669', bg: '#ecfdf5' },
  { value: 'cancelled', label: 'Cancelados',    Icon: LuCircleX,     color: '#dc2626', bg: '#fef2f2' },
];

const ContraEntrega = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try { setOrders(await getOrdersByPaymentMethod('contra_entrega')); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch { alert('Error actualizando estado'); }
    finally { setUpdating(null); }
  };

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  if (loading) return <div className="admin-loading">Cargando pedidos…</div>;

  return (
    <div>
      <h1 className="admin-page-title">Contra Entrega</h1>

      {/* Stats */}
      <div className="ce-stats">
        {STAT_CONFIG.map(({ value, label, Icon, color, bg }) => (
          <div key={value} className="ce-stat-card">
            <div className="ce-stat-icon" style={{ background: bg, color }}>
              <Icon size={18} />
            </div>
            <div className="ce-stat-body">
              <span className="ce-stat-num">{orders.filter(o => o.status === value).length}</span>
              <span className="ce-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <button className={`admin-filter-btn ${filterStatus === 'all' ? 'active' : ''}`} onClick={() => setFilterStatus('all')}>
          Todos ({orders.length})
        </button>
        {STATUS_OPTIONS.map(s => (
          <button
            key={s.value}
            className={`admin-filter-btn ${filterStatus === s.value ? 'active' : ''}`}
            onClick={() => setFilterStatus(s.value)}
          >
            {s.label} ({orders.filter(o => o.status === s.value).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="admin-empty">No hay pedidos con este estado.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Cliente</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Cambiar estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <Fragment key={order.id}>
                  <tr className="ce-row" onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                    <td><code>{order.orderNumber}</code></td>
                    <td>{order.customer?.name}</td>
                    <td>{order.customer?.phone}</td>
                    <td>{order.customer?.city}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className={`admin-badge admin-badge--status-${order.status}`}>
                        {STATUS_OPTIONS.find(s => s.value === order.status)?.label || order.status}
                      </span>
                    </td>
                    <td>{order.createdAt ? formatDate(order.createdAt) : '—'}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <select
                        className="admin-status-select"
                        value={order.status}
                        disabled={updating === order.id}
                        onChange={e => handleStatusChange(order.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                  </tr>

                  {expanded === order.id && (
                    <tr>
                      <td colSpan={8} className="ce-detail">
                        <div className="ce-detail-grid">
                          <div className="ce-detail-item">
                            <span>Dirección</span>
                            <strong>{order.customer?.address || '—'}</strong>
                          </div>
                          <div className="ce-detail-item">
                            <span>Email</span>
                            <strong>{order.customer?.email || '—'}</strong>
                          </div>
                          <div className="ce-detail-item">
                            <span>Ciudad</span>
                            <strong>{order.customer?.city || '—'}</strong>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContraEntrega;
