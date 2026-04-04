// HamameliComposicion.jsx
import { useState, useEffect } from 'react';
import './HamameliComposicion.css';

import imgHamamelis from '../../../../../assets/Hamamelis/Ingreediente-hamamelis-virginica.png';
import imgCastaño   from '../../../../../assets/Hamamelis/Ingrediente-castaño-de-indias.png';
import imgMagnesia  from '../../../../../assets/Hamamelis/Ingrediente-magnesia.png';
import imgOrtiga    from '../../../../../assets/Hamamelis/Ingrediente-ortiga.png';

const cards = [imgHamamelis, imgCastaño, imgMagnesia, imgOrtiga];

const HamameliComposicion = () => {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(null);

  const goTo = (nextIndex, direction) => {
    setSliding(direction);
    setTimeout(() => {
      setCurrent(nextIndex);
      setSliding(null);
    }, 400);
  };

  const prev = () => goTo(current === 0 ? cards.length - 1 : current - 1, 'right');
  const next = () => goTo(current === cards.length - 1 ? 0 : current + 1, 'left');

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="hamamelis-composicion">

      {/* Header blanco */}
      <div className="hamamelis-composicion-header">
        <h2 className="hamamelis-composicion-title">COMPOSICIÓN FUNCIONAL</h2>
        <p className="hamamelis-composicion-subtitle">Principales activos:</p>
      </div>

      {/* Área oscura del carrusel */}
      <div className="hamamelis-composicion-dark">
        <div className="hamamelis-carousel">
          <button className="hamamelis-carousel-btn" onClick={prev}>&#8249;</button>

          <div className="hamamelis-carousel-track">
            <img
              key={current}
              src={cards[current]}
              alt={`Ingrediente ${current + 1}`}
              className={`hamamelis-carousel-card ${
                sliding === 'left'  ? 'hslide-out-left'  :
                sliding === 'right' ? 'hslide-out-right' : 'hslide-in'
              }`}
            />
          </div>

          <button className="hamamelis-carousel-btn" onClick={next}>&#8250;</button>
        </div>

        {/* Dots */}
        <div className="hamamelis-carousel-dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`hamamelis-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'left' : 'right')}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default HamameliComposicion;



