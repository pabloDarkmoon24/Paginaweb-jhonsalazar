// HamameliInfo.jsx
import './HamameliInfo.css';

import imgProducto from '../../../../../assets/Hamamelis/Hamamelis-castaño-de-indias.png';
import iconCheck   from '../../../../../assets/Hamamelis/Icon-check.png';

const HamameliInfo = () => {
  return (
    <section className="hamamelis-info">
        <h2 className="hamamelis-info-title">
            ¿Qué es <span>Hamamelis + Castaño de Indias?</span>
          </h2>
      <div className="hamamelis-info-container">

        {/* Imagen izquierda */}
        <div className="hamamelis-info-img-wrapper">
          <img src={imgProducto} alt="Hamamelis + Castaño de Indias" className="hamamelis-info-img" />
        </div>
        

        {/* Contenido derecha */}
        <div className="hamamelis-info-content">

          

          <p className="hamamelis-info-desc">
            Es un complejo natural enfocado en la salud circulatoria,{' '}
            <strong>ideal para personas con</strong> problemas de retorno venoso,
            pesadez en piernas, várices, inflamación o retención de líquidos.
          </p>

          <p className="hamamelis-info-subtitle">
            Actúa desde el interior del cuerpo para:
          </p>

          <div className="hamamelis-info-grid">
            {[
              'Mejorar la circulación',
              'Aliviar molestias',
              'Fortalecer las venas',
              'Ofreciendo una solución segura y progresiva.',
            ].map((item) => (
              <div className="hamamelis-info-check" key={item}>
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

export default HamameliInfo;