// Footer.jsx
import './Footer.css';
import logoFooter from '../../../assets/Home/Logo-footer.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={logoFooter} alt="Dr. John Salazar" className="footer-logo" />
      </div>
    </footer>
  );
};

export default Footer;