// HamameliSeguridad.jsx
import { Link } from 'react-router-dom';
import './HamameliSeguridad.css';

import imgProducto  from '../../../../../assets/Hamamelis/Hamamelis-castaño-de-indias.png';
import imgModoUso   from '../../../../../assets/Hamamelis/Modo-de-uso.png';
import imgSeguridad from '../../../../../assets/Hamamelis/Seguridad.png';
import btnComprar   from '../../../../../assets/Hamamelis/1.png';
import btnDoctor    from '../../../../../assets/Hamamelis/2.png';

const HamameliSeguridad = () => {
  return (
    <section className="hamseg">

      <h2 className="hamseg-title">SEGURIDAD Y MODO DE USO</h2>

      {/* Fila 1 — modo de uso + producto */}
      <div className="hamseg-row1">
        <img src={imgModoUso} alt="Modo de uso" className="hamseg-card" />
        <div className="hamseg-img-wrapper">
          <img src={imgProducto} alt="Hamamelis producto" className="hamseg-img" />
        </div>
      </div>

      {/* Fila 2 — seguridad */}
      <div className="hamseg-row2">
        <img src={imgSeguridad} alt="Seguridad" className="hamseg-card2" />
      </div>

      {/* Botones */}
      <div className="hamseg-btns">
        <Link to="/tienda" className="hamseg-btn">
          <img src={btnComprar} alt="Comprar ahora" className="hamseg-btn-img" />
        </Link>
        <Link to="/contacto" className="prushot-seguridad-btn-comprar">
          <img src={btnDoctor} alt="Comunicarme con el Doctor" className="hamseg-btn-img" />
         </Link>

      </div>

    </section>
  );
};

export default HamameliSeguridad;