// VentasWompi.jsx
import { useState, useEffect } from 'react';
import { LuDollarSign, LuReceipt, LuTrendingUp, LuPackage } from 'react-icons/lu';
import { getOrdersByPaymentMethod } from '../../../services/ordersService';
import { formatPrice, formatDate } from '../../../utils/formatters';
import '../dashboard/Dashboard.css';
import './VentasWompi.css';

const STATUS_LABELS = {
  pending: 'Pendiente', paid: 'Pagado', shipped: 'Enviado',
  completed: 'Completado', cancelled: 'Cancelado',
};

const VentasWompi = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    getOrdersByPaymentMethod('wompi')
      .then(setOrders).catch(console.error).finally(() => setLoading(false));
  }, []);

  const getFiltered = () => {
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
  };

  const filtered = getFiltered();
  const revenue  = filtered.filter(o => o.status === 'paid' || o.status === 'completed').reduce((s, o) => s + (o.total || 0), 0);
  const avgOrder = filtered.length > 0 ? revenue / filtered.length : 0;
  const totalUnits = filtered.reduce((s, o) => s + (o.items || []).reduce((ss, i) => ss + (i.quantity || 1), 0), 0);

  const productSales = {};
  filtered.forEach(o => (o.items || []).forEach(item => {
    if (!productSales[item.name]) productSales[item.name] = { qty: 0, revenue: 0 };
    productSales[item.name].qty     += item.quantity || 1;
    productSales[item.name].revenue += item.price * (item.quantity || 1);
  }));
  const productList = Object.entries(productSales)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  const METRICS = [
    { label: 'Ingresos totales',    value: formatPrice(revenue), Icon: LuDollarSign,  color: '#059669', bg: '#ecfdf5' },
    { label: 'Transacciones',       value: filtered.length,      Icon: LuReceipt,     color: '#2563eb', bg: '#eff6ff' },
    { label: 'Ticket promedio',     value: formatPrice(avgOrder), Icon: LuTrendingUp, color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Unidades vendidas',   value: totalUnits,            Icon: LuPackage,    color: '#d97706', bg: '#fffbeb' },
  ];

  if (loading) return <div className="admin-loading">Cargando ventas…</div>;

  return (
    <div>
      <h1 className="admin-page-title">Ventas Wompi</h1>

      <div className="admin-filters">
        {[
          { value: 'all', label: 'Todo el tiempo' },
          { value: '7d',  label: 'Últimos 7 días' },
          { value: '30d', label: 'Últimos 30 días' },
          { value: '90d', label: 'Últimos 90 días' },
        ].map(f => (
          <button key={f.value} className={`admin-filter-btn ${dateFilter === f.value ? 'active' : ''}`} onClick={() => setDateFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="ventas-metrics">
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

      {productList.length > 0 && (
        <div className="ventas-section">
          <p className="dashboard-section-title">Ventas por producto</p>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead><tr><th>Producto</th><th>Unidades</th><th>Ingresos</th></tr></thead>
              <tbody>
                {productList.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.qty}</td>
                    <td>{formatPrice(p.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="ventas-section">
        <p className="dashboard-section-title">Historial de transacciones</p>
        {filtered.length === 0 ? (
          <p className="admin-empty">No hay transacciones en este período.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Orden</th><th>Cliente</th><th>Email</th>
                  <th>Total</th><th>ID Wompi</th><th>Estado</th><th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id}>
                    <td><code>{order.orderNumber}</code></td>
                    <td>{order.customer?.name}</td>
                    <td>{order.customer?.email}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>{order.wompiTransactionId ? <code>{order.wompiTransactionId.slice(0, 14)}…</code> : '—'}</td>
                    <td><span className={`admin-badge admin-badge--status-${order.status}`}>{STATUS_LABELS[order.status] || order.status}</span></td>
                    <td>{order.createdAt ? formatDate(order.createdAt) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VentasWompi;
