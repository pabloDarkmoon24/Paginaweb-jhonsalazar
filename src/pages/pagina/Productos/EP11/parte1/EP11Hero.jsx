// EP11Hero.jsx
import { Link } from 'react-router-dom';
import './EP11Hero.css';

import heroBg      from '../../../../../assets/EP11/BG-EP11.png';
import btnComprar  from '../../../../../assets/EP11/Comprar-ahora.png';
import itemCansancio from '../../../../../assets/EP11/Combate-el-cansancio-fisico-y-mental.png';
import itemPiel      from '../../../../../assets/EP11/Fortalece-piel-cabello-y-unas.png';
import descEP11 from '../../../../../assets/EP11/Descripcion-EP11.png';


const EP11Hero = () => {
  return (
    <div
      className="ep11-wrapper"
      style={{ '--ep11-bg': `url(${heroBg})` }}
    >
      {/* Fondo borroso en los lados */}
      <div className="ep11-wrapper-blur" />

      {/* Hero principal */}
      <section className="ep11-hero">
        <div className="ep11-hero-container">

         {/* Columna izquierda */}
        <div className="ep11-hero-content">
          <img
            src={descEP11}
            alt="EP11: Energía, Memoria y Vitalidad"
            className="ep11-desc-img"
          />
          <Link to="/tienda" className="ep11-btn-comprar">
            <img src={btnComprar} alt="Comprar ahora" className="ep11-btn-img" />
          </Link>
        </div>

          {/* Derecha — espacio para producto del fondo */}
          <div className="ep11-hero-right" />

        </div>
      </section>

      {/* Barra de beneficios */}
      <div className="ep11-benefits">
        <div className="ep11-benefit-item">
          <img src={itemCansancio} alt="Combate el cansancio físico y mental" />
        </div>
        <div className="ep11-benefit-item">
          <img src={itemPiel} alt="Fortalece piel, cabello y uñas" />
        </div>
      </div>

    </div>
  );
};

export default EP11Hero;