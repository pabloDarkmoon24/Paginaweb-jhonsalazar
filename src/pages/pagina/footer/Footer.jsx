// Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';
import logoFooter from '../../../assets/Home/Logo-footer.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <img src={logoFooter} alt="Dr. John Salazar" className="footer-logo" />

        {/* Info del negocio */}
        <div className="footer-info">
          <p className="footer-info-text">
            Medicina Biológica · Flebología · Productos Naturales
          </p>
          <p className="footer-info-text">
            Pereira, Risaralda, Colombia
          </p>
          <a href="https://wa.me/573113958098" className="footer-whatsapp" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.557 4.126 1.526 5.859L.057 23.5l5.797-1.443A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 0 1-5.031-1.371l-.361-.214-3.741.981.999-3.648-.235-.374A9.86 9.86 0 0 1 2.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
            </svg>
            +57 311 3958098
          </a>
        </div>

        {/* Links */}
        <div className="footer-links">
          <Link to="/politica-devoluciones" className="footer-link">
            Política de Devoluciones
          </Link>
          <Link to="/contacto" className="footer-link">
            Contacto
          </Link>
          <Link to="/tienda" className="footer-link">
            Tienda
          </Link>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()} Dr. John Salazar — Todos los derechos reservados
        </p>

      </div>
    </footer>
  );
};

export default Footer;
