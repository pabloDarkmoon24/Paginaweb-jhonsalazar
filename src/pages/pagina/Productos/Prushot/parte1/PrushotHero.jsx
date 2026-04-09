// PrushotHero.jsx
import { Link } from 'react-router-dom';
import './PrushotHero.css';
import heroBg       from '../../../../../assets/Prushot/Banner-BG.png'; // ← tu fondo
import descriptionBox from '../../../../../assets/Prushot/Descripcion-prushot-banner.png';
import btnComprar   from '../../../../../assets/Prushot/Comprar-ahora.png';
import iconEnergia from '../../../../../assets/Prushot/Icon-energia-real.png';
import iconRendimiento from '../../../../../assets/Prushot/Icon-rendimiento-sin-quimicos.png';
import iconDeseo from '../../../../../assets/Prushot/Icon-deseo-natural.png';

const PrushotHero = () => {
return (
  <div
    className="prushot-hero-wrapper"
    style={{ '--prushot-bg': `url(${heroBg})` }}
  >
    <section className="prushot-hero">
      <div className="prushot-hero-container">
        <div className="prushot-hero-content">
          <img src={descriptionBox} alt="PRUSHOT — Energía, Deseo y Vitalidad Natural" className="prushot-description-box" />
          <Link to="/tienda" className="prushot-btn-comprar">
            <img src={btnComprar} alt="Comprar ahora" className="prushot-btn-img" />
          </Link>
        </div>
      </div>
    </section>
    {/* ── Barra de beneficios ── */}
      <div className="prushot-benefits">
        <div className="prushot-benefit-item">
          <img src={iconEnergia} alt="Energía real" />
        </div>
        <div className="prushot-benefit-item">
          <img src={iconRendimiento} alt="Rendimiento sin químicos" />
        </div>
        <div className="prushot-benefit-item">
          <img src={iconDeseo} alt="Deseo natural" />
        </div>
      </div>
  </div>
);
};

export default PrushotHero;