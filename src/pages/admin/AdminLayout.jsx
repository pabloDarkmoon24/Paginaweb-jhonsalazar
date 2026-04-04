// AdminLayout.jsx
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LuLayoutDashboard, LuPackage, LuCreditCard,
  LuUsers, LuShoppingBag, LuLogOut, LuActivity
} from 'react-icons/lu';
import './AdminLayout.css';

import logo from '../../assets/Home/logo.png'

const NAV_ITEMS = [
  { to: '/admin',                label: 'Dashboard',     Icon: LuLayoutDashboard, end: true },
  { to: '/admin/contra-entrega', label: 'Entregas',      Icon: LuPackage },
  { to: '/admin/ventas',         label: 'Ventas',        Icon: LuCreditCard },
  { to: '/admin/leads',          label: 'Leads',         Icon: LuUsers },
  { to: '/admin/productos',      label: 'Productos',     Icon: LuShoppingBag },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-layout">

      {/* ── Sidebar (desktop) ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img src={logo} alt="" />
          <div>
            <span className="admin-brand-title">Dr. John Salazar</span>
            <span className="admin-brand-sub">Panel de administración</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          <p className="admin-nav-section">Menú principal</p>
          {NAV_ITEMS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'admin-nav-link--active' : ''}`
              }
            >
              <Icon size={17} className="admin-nav-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          <LuLogOut size={16} />
          <span>Cerrar sesión</span>
        </button>
      </aside>

      {/* ── Contenido ── */}
      <main className="admin-main">
        <Outlet />
      </main>

      {/* ── Bottom nav (móvil) ── */}
      <nav className="admin-bottom-nav">
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `admin-bottom-link ${isActive ? 'admin-bottom-link--active' : ''}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

    </div>
  );
};

export default AdminLayout;
