// Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';
import logoFooter  from '../../../assets/Home/Logo-footer.png';
import doctorPhoto from '../../../assets/Home/Foto-Dr-John-Salazar.png';

const Footer = () => {
  return (
    <footer className="footer">

      {/* ── Franja principal ─────────────────────────────────────────────── */}
      <div className="footer-main">
        <div className="footer-container">

          {/* Columna 1 — Doctor */}
          <div className="footer-col footer-col--brand">
            <img
                src="/Foto doc.jpg"
                alt="Dr. John Salazar — Especialista en Flebología"
                className="footer-doc-photo"
                loading="lazy"
              />
            <div className="footer-brand-info">
              <img src={logoFooter} alt="Dr. John Salazar" className="footer-logo" />
              <p className="footer-tagline">
                Medicina Biológica · Flebología · Productos Naturales
              </p>
              <p className="footer-location">Pereira, Risaralda, Colombia</p>
            </div>
          </div>

          {/* Separador */}
          <div className="footer-sep" />

          {/* Columna 2 — Contacto */}
          <div className="footer-col footer-col--contact">
            <h4 className="footer-col__title">Contacto</h4>

            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <span>MegaCentro Pinares, Cl. 18 #12-75</span>
                <span>Torre 3, Cons. 705 · Pereira, Risaralda</span>
              </div>
            </div>

            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 11.5 19.79 19.79 0 011.39 2.9 2 2 0 013.38 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.64a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <a
                href="https://wa.me/573136497534"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa-link"
                onClick={() => { if (typeof window.fbq === 'function') window.fbq('track', 'Contact'); }}
              >
                +57 313 649 7534
              </a>
            </div>

            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Lunes a Sábado · Previa cita</span>
            </div>
          </div>

          {/* Separador */}
          <div className="footer-sep" />

          {/* Columna 3 — Navegación */}
          <div className="footer-col footer-col--nav">
            <h4 className="footer-col__title">Navegación</h4>
            <nav className="footer-nav">
              <Link to="/politica-privacidad"   className="footer-nav-link">Política de Privacidad</Link>
              <Link to="/politica-devoluciones" className="footer-nav-link">Política de Devoluciones</Link>
              <Link to="/contacto"              className="footer-nav-link">Contacto</Link>
              <Link to="/tienda"                className="footer-nav-link">Tienda</Link>
              <Link to="/varices"               className="footer-nav-link">Tratamiento de Várices</Link>
            </nav>
          </div>

        </div>
      </div>

      {/* ── Barra de copyright ───────────────────────────────────────────── */}
      <div className="footer-copy-bar">
        <p>© {new Date().getFullYear()} Dr. John Salazar — Todos los derechos reservados</p>
      </div>

    </footer>
  );
};

export default Footer;
