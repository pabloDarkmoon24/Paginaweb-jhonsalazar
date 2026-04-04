// PrushotInfo.jsx
import { Link } from 'react-router-dom';
import './PrushotInfo.css';

import productImg from '../../../../../assets/Prushot/Prushot_2.png';
import iconCheck from '../../../../../assets/Prushot/Icon-check.png';

const PrushotInfo = () => {
  return (
    <section className="prushot-info">
      <h2 className="prushot-info-title">
            ¿Qué es <span>PRUSHOT?</span>
          </h2>
      <div className="prushot-info-container">
        

        {/* Imagen izquierda */}
        <div className="prushot-info-img-wrapper">
          <img src={productImg} alt="Prushot producto" className="prushot-info-img" />
        </div>

        {/* Contenido derecha */}
        <div className="prushot-info-content">
          

          <p className="prushot-info-desc">
            PRUSHOT combina <span>extractos naturales y micronutrientes bioactivos</span> que actúan
            como activadores metabólicos y reguladores hormonales suaves, sin efectos
            adversos ni dependencia.
          </p>

          <ul className="prushot-info-list">
            <li>
              <img src={iconCheck} alt="check" />
              <span>Efecto progresivo y fisiológico</span>
            </li>
            <li>
              <img src={iconCheck} alt="check" />
              <span>Aumenta energía, deseo sexual y bienestar emocional</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default PrushotInfo;