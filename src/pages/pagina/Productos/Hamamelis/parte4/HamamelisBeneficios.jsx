// HamamelisBeneficios.jsx
import { useState, useEffect } from 'react';
import './HamamelisBeneficios.css';

import bgBeneficios from '../../../../../assets/Hamamelis/BG-beneficios-clinicos.png';
import b1 from '../../../../../assets/Hamamelis/Beneficio-1.png';
import b2 from '../../../../../assets/Hamamelis/Beneficio-2.png';
import b3 from '../../../../../assets/Hamamelis/Beneficio-3.png';
import b4 from '../../../../../assets/Hamamelis/Beneficio-4.png';
import b5 from '../../../../../assets/Hamamelis/Beneficio-5.png';
import b6 from '../../../../../assets/Hamamelis/Beneficio-6.png';

const slides = [
  [b1, b2, b3],
  [b4, b5, b6],
];

const HamamelisBeneficios = () => {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(null);

  const goTo = (nextIndex, direction) => {
    setSliding(direction);
    setTimeout(() => {
      setCurrent(nextIndex);
      setSliding(null);
    }, 400);
  };

  const prev = () => goTo(current === 0 ? slides.length - 1 : current - 1, 'right');
  const next = () => goTo(current === slides.length - 1 ? 0 : current + 1, 'left');

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section
      className="hbeneficios"
      style={{ '--hben-bg': `url(${bgBeneficios})` }}
    >
      {/* Header blanco */}
      <div className="hbeneficios-header">
        <h2 className="hbeneficios-title">BENEFICIOS CLÍNICOS</h2>
        <p className="hbeneficios-subtitle">Y TÉCNICOS</p>
      </div>

      {/* Área con fondo verde */}
      <div className="hbeneficios-dark">
        <div className="hbeneficios-carousel">

          <button className="hbeneficios-btn" onClick={prev}>&#8249;</button>

          <div className="hbeneficios-track">
            <div
              key={current}
              className={`hbeneficios-slide ${
                sliding === 'left'  ? 'hben-out-left'  :
                sliding === 'right' ? 'hben-out-right' : 'hben-in'
              }`}
            >
              {slides[current].map((img, i) => (
                <img key={i} src={img} alt={`Beneficio ${current * 2 + i + 1}`} className="hbeneficios-card" />
              ))}
            </div>
          </div>

          <button className="hbeneficios-btn" onClick={next}>&#8250;</button>

        </div>

        {/* Dots */}
        <div className="hbeneficios-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hbeneficios-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'left' : 'right')}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default HamamelisBeneficios;