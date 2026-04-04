// PrushotMecanismo.jsx
import './PrushotMecanismo.css';

import bg2 from '../../../../../assets/Prushot/BG2.png';
import imgEstimulacion from '../../../../../assets/Prushot/Estimulacion-metabolica.png';
import imgActivacion from '../../../../../assets/Prushot/Activacion-circulatoria.png';
import imgRegula from '../../../../../assets/Prushot/Regula-de-forma-natural.png';

const PrushotMecanismo = () => {
  return (
    <section
      className="prushot-mecanismo"
      style={{ '--mecanismo-bg': `url(${bg2})` }}
    >
      <div className="prushot-mecanismo-container">

        {/* Lado izquierdo — imagen del cuerpo (viene del fondo) */}
        <div className="prushot-mecanismo-left" />

        {/* Lado derecho — tarjetas */}
        <div className="prushot-mecanismo-cards">
          <img src={imgEstimulacion} alt="Estimulación metabólica" className="prushot-mecanismo-card" />
          <img src={imgActivacion}   alt="Activación circulatoria"  className="prushot-mecanismo-card" />
          <img src={imgRegula}       alt="Regula de forma natural"   className="prushot-mecanismo-card" />
        </div>

      </div>
    </section>
  );
};

export default PrushotMecanismo;