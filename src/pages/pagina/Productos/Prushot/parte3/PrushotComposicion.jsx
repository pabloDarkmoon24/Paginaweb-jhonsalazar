// PrushotComposicion.jsx
import { useState,useEffect ,useRef  } from 'react';
import './PrushotComposicion.css';

import imgBorojo from '../../../../../assets/Prushot/Ingrediente-1-borojo.png';
import imgChontaduro from '../../../../../assets/Prushot/Ingrediente-2-chontaduro.png';
import imgGuarana from '../../../../../assets/Prushot/Ingrediente-3-guarana.png';
import imgTomate from '../../../../../assets/Prushot/Ingrediente-4-tomate.png';
import imgTeVerde from '../../../../../assets/Prushot/Ingrediente-5-te-verde.png';
import imgVitaminas from '../../../../../assets/Prushot/Ingrediente-6-vitaminas.png';


const cards = [
  imgBorojo,
  imgChontaduro,
  imgGuarana,
  imgTomate,
  imgTeVerde,
  imgVitaminas,
];

const PrushotComposicion = () => {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(null); // 'left' | 'right'

  const goTo = (nextIndex, direction) => {
    setSliding(direction);
    setTimeout(() => {
      setCurrent(nextIndex);
      setSliding(null);
    }, 400);
  };

  const prev = () => {
    const nextIndex = current === 0 ? cards.length - 1 : current - 1;
    goTo(nextIndex, 'right');
  };

  const next = () => {
    const nextIndex = current === cards.length - 1 ? 0 : current + 1;
    goTo(nextIndex, 'left');
  };

  useEffect(() => {
    const timer = setInterval(() => next(), 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="prushot-composicion">
      <div className="prushot-composicion-header">
        <h2 className="prushot-composicion-title">COMPOSICIÓN FUNCIONAL</h2>
        <p className="prushot-composicion-subtitle">Principales activos:</p>
      </div>

      <div className="prushot-composicion-dark">
        <div className="prushot-carousel">
          <button className="prushot-carousel-btn left" onClick={prev}>&#8249;</button>

          <div className="prushot-carousel-track">
            <img
              key={current}
              src={cards[current]}
              alt={`Ingrediente ${current + 1}`}
              className={`prushot-carousel-card ${sliding === 'left' ? 'slide-out-left' : ''} ${sliding === 'right' ? 'slide-out-right' : ''} ${!sliding ? 'slide-in' : ''}`}
            />
          </div>

          <button className="prushot-carousel-btn right" onClick={next}>&#8250;</button>
        </div>

        <div className="prushot-carousel-dots">
          {cards.map((_, i) => (
            <button key={i} className={`prushot-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i, i > current ? 'left' : 'right')} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrushotComposicion;