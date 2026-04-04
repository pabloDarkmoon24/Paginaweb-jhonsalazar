// Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import CartDrawer from '../../../components/shop/CartDrawer/CartDrawer';
import './Navbar.css';
import logo from '../../../assets/Home/Logo-Header.png';

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  const closeMenu = () => {
    setMenuOpen(false);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="Dr. John Salazar" className="navbar-logo-image" />
        </Link>

        {/* Hamburguesa (solo móvil) */}
        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-menu ${menuOpen ? 'navbar-menu--open' : ''}`}>
          <li className="navbar-item">
            <Link
              to="/"
              className={`navbar-link1 ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Inicio
            </Link>
          </li>

          {/* PRODUCTOS CON DROPDOWN */}
          <li
            className="navbar-item navbar-dropdown"
            onMouseEnter={() => !menuOpen && setShowDropdown(true)}
            onMouseLeave={() => !menuOpen && setShowDropdown(false)}
          >
            <span
              className={`navbar-link ${location.pathname.includes('/productos') ? 'active' : ''}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Productos
              <span className={`navbar-arrow ${showDropdown ? 'navbar-arrow--up' : ''}`}>▾</span>
            </span>

            {showDropdown && (
              <ul className="navbar-dropdown-menu">
                <li className="navbar-dropdown-item">
                  <Link to="/productos/prushot" className="navbar-dropdown-link" onClick={closeMenu}>
                    PRUSHOT
                  </Link>
                </li>
                <li className="navbar-dropdown-item">
                  <Link to="/productos/hamamelis" className="navbar-dropdown-link" onClick={closeMenu}>
                    Hamamelis + Castaño
                  </Link>
                </li>
                <li className="navbar-dropdown-item">
                  <Link to="/productos/ep11" className="navbar-dropdown-link" onClick={closeMenu}>
                    EP11
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="navbar-item">
            <Link
              to="/tienda"
              className={`navbar-link navbar-link-tienda ${location.pathname === '/tienda' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Tienda
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              to="/contacto"
              className={`navbar-link3 navbar-link ${location.pathname === '/contacto' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </li>
        </ul>

        {/* Botón carrito */}
        <button className="navbar-cart-btn" onClick={() => setCartOpen(true)} aria-label="Carrito">
          🛒
          {itemCount > 0 && <span className="navbar-cart-count">{itemCount}</span>}
        </button>
      </div>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;