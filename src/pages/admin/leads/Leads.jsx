// Leads.jsx
import { useState, useEffect } from 'react';
import { LuEye, LuUsers, LuMail, LuCalendar, LuClock } from 'react-icons/lu';
import { getAllLeads, updateLeadStatus } from '../../../services/leadsService';
import { getAllVisits } from '../../../services/visitsService';
import { formatDate } from '../../../utils/formatters';
import '../dashboard/Dashboard.css';
import './Leads.css';

const STATUS_OPTIONS = [
  { value: 'pending',   label: 'Pendiente' },
  { value: 'contacted', label: 'Contactado' },
  { value: 'scheduled', label: 'Agendado' },
  { value: 'completed', label: 'Completado' },
  { value: 'cancelled', label: 'Cancelado' },
];

const STATS_CONFIG = [
  { key: 'visits',    label: 'Visitas totales',           Icon: LuEye,      color: '#2563eb', bg: '#eff6ff' },
  { key: 'leads',     label: 'Personas que interactuaron',Icon: LuUsers,    color: '#7c3aed', bg: '#f5f3ff' },
  { key: 'contacts',  label: 'Contactos',                 Icon: LuMail,     color: '#059669', bg: '#ecfdf5' },
  { key: 'appts',     label: 'Solicitudes de cita',       Icon: LuCalendar, color: '#0891b2', bg: '#ecfeff' },
  { key: 'pending',   label: 'Sin atender',               Icon: LuClock,    color: '#d97706', bg: '#fffbeb' },
];

const Leads = () => {
  const [leads, setLeads]   = useState([]);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('leads');

  useEffect(() => {
    Promise.all([getAllLeads(), getAllVisits()])
      .then(([l, v]) => { setLeads(l); setVisits(v); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdating(leadId);
    try {
      await updateLeadStatus(leadId, newStatus);
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch { alert('Error actualizando estado'); }
    finally { setUpdating(null); }
  };

  const filtered = leads.filter(l => {
    if (typeFilter !== 'all' && l.type !== typeFilter) return false;
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    return true;
  });

  const visitsByPage = visits.reduce((acc, v) => {
    acc[v.page] = (acc[v.page] || 0) + 1;
    return acc;
  }, {});
  const visitsByPageList = Object.entries(visitsByPage)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count);

  const statValues = {
    visits:   visits.length,
    leads:    leads.length,
    contacts: leads.filter(l => l.type === 'contact').length,
    appts:    leads.filter(l => l.type === 'appointment').length,
    pending:  leads.filter(l => l.status === 'pending').length,
  };

  if (loading) return <div className="admin-loading">Cargando datos…</div>;

  return (
    <div>
      <h1 className="admin-page-title">Leads / Citas</h1>

      {/* Stats */}
      <div className="leads-stats">
        {STATS_CONFIG.map(({ key, label, Icon, color, bg }) => (
          <div key={key} className="leads-stat-card">
            <div className="leads-stat-icon-box" style={{ background: bg, color }}>
              <Icon size={17} />
            </div>
            <div className="leads-stat-body">
              <span className="leads-stat-num">{statValues[key]}</span>
              <span className="leads-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="leads-tabs">
        <button className={`leads-tab-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
          <LuUsers size={14} /> Leads y Citas
        </button>
        <button className={`leads-tab-btn ${activeTab === 'visits' ? 'active' : ''}`} onClick={() => setActiveTab('visits')}>
          <LuEye size={14} /> Visitas por página
        </button>
      </div>

      {/* Tab: Visitas */}
      {activeTab === 'visits' ? (
        <div>
          {visitsByPageList.length === 0 ? (
            <p className="admin-empty">No hay visitas registradas aún.</p>
          ) : (
            <>
              <div className="visits-bars">
                {visitsByPageList.map(({ page, count }) => (
                  <div key={page} className="visits-bar-row">
                    <span className="visits-bar-label">{page}</span>
                    <div className="visits-bar-track">
                      <div className="visits-bar-fill" style={{ width: `${(count / visitsByPageList[0].count) * 100}%` }} />
                    </div>
                    <span className="visits-bar-count">{count}</span>
                  </div>
                ))}
              </div>

              <p className="leads-section-subtitle">Últimas 50 visitas</p>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>Página</th><th>Referencia</th><th>Fecha</th></tr></thead>
                  <tbody>
                    {visits.slice(0, 50).map(v => (
                      <tr key={v.id}>
                        <td><span className="admin-badge leads-badge-contact">{v.page}</span></td>
                        <td>{v.referrer || 'Directo'}</td>
                        <td>{v.createdAt ? formatDate(v.createdAt) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="leads-filters">
            <div className="admin-filters">
              <span className="leads-filter-label">Tipo</span>
              {[
                { value: 'all',         label: 'Todos' },
                { value: 'contact',     label: 'Contacto' },
                { value: 'appointment', label: 'Cita' },
              ].map(f => (
                <button key={f.value} className={`admin-filter-btn ${typeFilter === f.value ? 'active' : ''}`} onClick={() => setTypeFilter(f.value)}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="admin-filters">
              <span className="leads-filter-label">Estado</span>
              <button className={`admin-filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>Todos</button>
              {STATUS_OPTIONS.map(s => (
                <button key={s.value} className={`admin-filter-btn ${statusFilter === s.value ? 'active' : ''}`} onClick={() => setStatusFilter(s.value)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <p className="admin-empty">No hay registros con estos filtros.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tipo</th><th>Nombre</th><th>Email</th><th>Teléfono</th>
                    <th>Asunto</th><th>Estado</th><th>Fecha</th><th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(lead => (
                    <tr key={lead.id}>
                      <td>
                        <span className={`admin-badge ${lead.type === 'appointment' ? 'leads-badge-appt' : 'leads-badge-contact'}`}>
                          {lead.type === 'appointment' ? 'Cita' : 'Contacto'}
                        </span>
                      </td>
                      <td>{lead.name}</td>
                      <td><a href={`mailto:${lead.email}`} className="leads-email-link">{lead.email}</a></td>
                      <td><a href={`tel:${lead.phone}`} className="leads-phone-link">{lead.phone}</a></td>
                      <td className="leads-message-cell">{lead.subject || lead.message || '—'}</td>
                      <td>
                        <span className={`admin-badge admin-badge--${lead.status}`}>
                          {STATUS_OPTIONS.find(s => s.value === lead.status)?.label || lead.status}
                        </span>
                      </td>
                      <td>{lead.createdAt ? formatDate(lead.createdAt) : '—'}</td>
                      <td>
                        <select className="admin-status-select" value={lead.status} disabled={updating === lead.id}
                          onChange={e => handleStatusChange(lead.id, e.target.value)}>
                          {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leads;
