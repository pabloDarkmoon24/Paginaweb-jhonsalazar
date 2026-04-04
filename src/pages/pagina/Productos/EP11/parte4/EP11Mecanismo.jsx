// EP11Mecanismo.jsx
import './EP11Mecanismo.css';

import bg2             from '../../../../../assets/EP11/BG2.png';
import imgEstimulacion from '../../../../../assets/EP11/Estimulacion-energetica.png';
import imgNeuro        from '../../../../../assets/EP11/Efecto-neurocognitivo.png';
import imgRegeneracion from '../../../../../assets/EP11/Regeneracion-tisular.png';

const EP11Mecanismo = () => {
  return (
    <section
      className="ep11-mecanismo"
      style={{ '--ep11-mec-bg': `url(${bg2})` }}
    >
      {/* Fondo borroso en los lados — viene del ::before */}

      {/* Banner nítido centrado */}
      <div className="ep11-mecanismo-inner">
        <div className="ep11-mecanismo-container">

          {/* Izquierda — espacio para la figura del fondo */}
          <div className="ep11-mecanismo-left" />

          {/* Derecha — tarjetas */}
          <div className="ep11-mecanismo-cards">
            <img src={imgEstimulacion} alt="Estimulación energética" className="ep11-mecanismo-card" />
            <img src={imgNeuro}        alt="Efecto neurocognitivo"    className="ep11-mecanismo-card" />
            <img src={imgRegeneracion} alt="Regeneración tisular"     className="ep11-mecanismo-card" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default EP11Mecanismo;