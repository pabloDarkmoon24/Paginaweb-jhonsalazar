// Dashboard.jsx
import { useState, useEffect } from 'react';
import { LuClipboardList, LuCreditCard, LuPackage, LuUsers } from 'react-icons/lu';
import { getAllOrders } from '../../../services/ordersService';
import { getAllLeads } from '../../../services/leadsService';
import { formatPrice, formatDate } from '../../../utils/formatters';
import './Dashboard.css';

const STATUS_LABELS = {
  pending: 'Pendiente', paid: 'Pagado', shipped: 'Enviado',
  completed: 'Completado', cancelled: 'Cancelado', rejected: 'Rechazado',
};

const METHOD_LABEL = {
  epayco:        'ePayco',
  wompi:         'Wompi',
  contra_entrega: 'Contra entrega',
};

const Dashboard = () => {
  const [stats, setStats]             = useState({ totalOrders: 0, onlineRevenue: 0, pendingCOD: 0, totalLeads: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    Promise.all([getAllOrders(), getAllLeads()])
      .then(([orders, leads]) => {
        // Ingresos en línea = ePayco pagados + wompi pagados
        const onlineRevenue = orders
          .filter(o => ['epayco', 'wompi'].includes(o.paymentMethod) && ['paid', 'completed'].includes(o.status))
          .reduce((s, o) => s + (o.total || 0), 0);

        setStats({
          totalOrders:  orders.length,
          onlineRevenue,
          pendingCOD:   orders.filter(o => o.paymentMethod === 'contra_entrega' && o.status === 'pending').length,
          totalLeads:   leads.length,
        });
        setRecentOrders(orders.slice(0, 8));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-loading">Cargando datos…</div>;

  const METRICS = [
    { label: 'Órdenes totales',           value: stats.totalOrders,              Icon: LuClipboardList, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Ingresos en línea',         value: formatPrice(stats.onlineRevenue), Icon: LuCreditCard,  color: '#059669', bg: '#ecfdf5' },
    { label: 'Contra entrega pendientes', value: stats.pendingCOD,               Icon: LuPackage,       color: '#d97706', bg: '#fffbeb' },
    { label: 'Leads registrados',         value: stats.totalLeads,               Icon: LuUsers,         color: '#7c3aed', bg: '#f5f3ff' },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="dashboard-metrics">
        {METRICS.map((m, i) => (
          <div key={i} className="dashboard-metric-card">
            <div className="dashboard-metric-icon" style={{ background: m.bg, color: m.color }}>
              <m.Icon size={20} />
            </div>
            <div className="dashboard-metric-info">
              <span className="dashboard-metric-value">{m.value}</span>
              <span className="dashboard-metric-label">{m.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-recent">
        <p className="dashboard-section-title">Órdenes recientes</p>
        {recentOrders.length === 0 ? (
          <p className="admin-empty">No hay órdenes registradas aún.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Método</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td><code>{order.orderNumber}</code></td>
                    <td>{order.customer?.name}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${order.paymentMethod === 'contra_entrega' ? 'cod' : 'online'}`}>
                        {METHOD_LABEL[order.paymentMethod] || order.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge--status-${order.status}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
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

export default Dashboard;
