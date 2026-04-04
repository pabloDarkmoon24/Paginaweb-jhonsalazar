// EP11Info.jsx
import './EP11Info.css';

import imgProducto from '../../../../../assets/EP11/EP11-1.png';
import iconCheck   from '../../../../../assets/EP11/Icon-check.png';

const EP11Info = () => {
  return (
    <section className="ep11-info">
       <h2 className="ep11-info-title">
            ¿Qué es <span>EP11?</span>
          </h2>
     
      <div className="ep11-info-container">
        

        {/* Imagen izquierda */}
        <div className="ep11-info-img-wrapper">
          <img src={imgProducto} alt="EP11 producto" className="ep11-info-img" />
        </div>

        {/* Contenido derecha */}
        <div className="ep11-info-content">

          

          <p className="ep11-info-desc">
            EP11 es un suplemento líquido funcional de uso diario que actúa sobre:
          </p>

          <p className="ep11-info-highlight">
            Energía celular, sistema nervioso, función cognitiva y regeneración corporal
          </p>

          <p className="ep11-info-desc">Ideal para personas con:</p>

          <div className="ep11-info-grid">
            {[
              'Jornadas exigentes',
              'Estrés mental',
              'Desgaste físico',
              'Necesidad de enfoque y vitalidad',
            ].map((item) => (
              <div className="ep11-info-check" key={item}>
                <img src={iconCheck} alt="check" />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default EP11Info;