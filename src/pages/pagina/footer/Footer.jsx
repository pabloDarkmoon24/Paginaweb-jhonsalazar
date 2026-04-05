// Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';
import logoFooter from '../../../assets/Home/Logo-footer.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={logoFooter} alt="Dr. John Salazar" className="footer-logo" />
        <div className="footer-links">
          <Link to="/politica-devoluciones" className="footer-link">
            Política de Devoluciones
          </Link>
          <Link to="/contacto" className="footer-link">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;