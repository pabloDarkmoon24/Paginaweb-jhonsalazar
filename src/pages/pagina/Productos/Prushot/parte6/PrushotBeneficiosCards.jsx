// PrushotBeneficiosCards.jsx

import imgBeneficios from '../../../../../assets/Prushot/Beneficios-clinicos-y-tecnicos.png';
import './PrushotBeneficiosCards.css';
const PrushotBeneficiosCards = () => {
  return (
    <section className="prushot-bcards2">
      <div
        className="prushot-bcards2-wrapper"
        style={{ '--pben-bg': `url(${imgBeneficios})` }}
      >
        <div className="prushot-bcards2-inner">
          <img
            src={imgBeneficios}
            alt="Beneficios clínicos y técnicos Prushot"
            className="prushot-bcards2-img"
          />
        </div>
      </div>
    </section>
  );
};

export default PrushotBeneficiosCards;