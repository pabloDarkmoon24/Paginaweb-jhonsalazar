// HamameliHero.jsx
import { Link } from 'react-router-dom';
import './HamameliHero.css';

import heroBg      from '../../../../../assets/Hamamelis/BG.png';
import imgInfo     from '../../../../../assets/Hamamelis/Info.png';
import btnComprar  from '../../../../../assets/Prushot/Comprar-ahora.png';
import itemActua   from '../../../../../assets/Hamamelis/Actua-de-forma-progresiva.png';
import itemFlujo   from '../../../../../assets/Hamamelis/Estimula-el-flujo-sanguineo.png';

const HamameliHero = () => {
  return (
    <div
      className="hamamelis-wrapper"
      style={{ '--hamamelis-bg': `url(${heroBg})` }}
    >
      {/* Fondo borroso en los lados */}
      <div className="hamamelis-wrapper-blur" />

      {/* Hero principal */}
      <section className="hamamelis-hero">
        <div className="hamamelis-hero-container">

          {/* Izquierda — cuadro de info */}
          <div className="hamamelis-hero-content">
            <img
              src={imgInfo}
              alt="Hamamelis + Castaño de Indias"
              className="hamamelis-desc-img"
            />
            <Link to="/tienda" className="hamamelis-btn-comprar">
              <img src={btnComprar} alt="Comprar ahora" className="hamamelis-btn-img" />
            </Link>
          </div>

          {/* Derecha — espacio para producto del fondo */}
          <div className="hamamelis-hero-right" />

        </div>
      </section>

      {/* Barra de beneficios */}
      <div className="hamamelis-benefits">
        <div className="hamamelis-benefit-item">
          <img src={itemActua} alt="Actúa de forma progresiva" />
        </div>
        <div className="hamamelis-benefit-item">
          <img src={itemFlujo} alt="Estimula el flujo sanguíneo" />
        </div>
      </div>

    </div>
  );
};

export default HamameliHero;