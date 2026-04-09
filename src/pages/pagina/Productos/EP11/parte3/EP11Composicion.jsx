// EP11Composicion.jsx
import { useState, useEffect } from 'react';
import './EP11Composicion.css';

import imgStevia     from '../../../../../assets/EP11/Ingrediente-stevia.png';
import imgMaca       from '../../../../../assets/EP11/Ingrediente-maca.png';
import imgChontaduro from '../../../../../assets/EP11/Ingrediente-chontaduro.png';
import imgColageno   from '../../../../../assets/EP11/Ingrediente-colageno.png';
import imgVitaminas  from '../../../../../assets/EP11/Ingrediente-vitaminas.png';

const cards = [
  { src: imgStevia,      alt: 'Stevia — edulcorante natural sin calorías, apto para diabéticos' },
  { src: imgMaca,        alt: 'Maca — adaptógeno que mejora la energía y la función cognitiva' },
  { src: imgChontaduro,  alt: 'Chontaduro — fuente de proteínas, vitaminas y energía sostenida' },
  { src: imgColageno,    alt: 'Colágeno hidrolizado — fortalece piel, cabello, uñas y articulaciones' },
  { src: imgVitaminas,   alt: 'Complejo vitamínico — soporte inmunológico y energía celular' },
];

const EP11Composicion = () => {
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
    <section className="ep11-composicion">

      {/* Header blanco */}
      <div className="ep11-composicion-header">
        <h2 className="ep11-composicion-title">COMPOSICIÓN FUNCIONAL</h2>
        <p className="ep11-composicion-subtitle">Principales activos:</p>
      </div>

      {/* Área oscura del carrusel */}
      <div className="ep11-composicion-dark">
        <div className="ep11-carousel">
          <button className="ep11-carousel-btn" onClick={prev}>&#8249;</button>

          <div className="ep11-carousel-track">
            <img
              key={current}
              src={cards[current].src}
              alt={cards[current].alt}
              className={`ep11-carousel-card ${
                sliding === 'left'  ? 'slide-out-left'  :
                sliding === 'right' ? 'slide-out-right' : 'slide-in'
              }`}
            />
          </div>

          <button className="ep11-carousel-btn" onClick={next}>&#8250;</button>
        </div>

        {/* Dots */}
        <div className="ep11-carousel-dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`ep11-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'left' : 'right')}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default EP11Composicion;