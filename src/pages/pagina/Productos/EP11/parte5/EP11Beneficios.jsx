// EP11Beneficios.jsx
import './EP11Beneficios.css';
import imgBeneficios from '../../../../../assets/EP11/Beneficios-clinicos-y-tecnicos.png';

const EP11Beneficios = () => {
  return (
    <section className="ep11-beneficios">

      <div className="ep11-beneficios-header">
        <h2 className="ep11-beneficios-title">BENEFICIOS CLÍNICOS</h2>
        <p className="ep11-beneficios-subtitle">Y TÉCNICOS</p>
      </div>

      <div
        className="ep11-beneficios-wrapper"
        style={{ '--ep11-ben-bg': `url(${imgBeneficios})` }}
      >
        <div className="ep11-beneficios-inner">
          <img
            src={imgBeneficios}
            alt="Beneficios clínicos y técnicos EP11"
            className="ep11-beneficios-img"
          />
        </div>
      </div>

    </section>
  );
};

export default EP11Beneficios;  // ← esta línea es la que falta