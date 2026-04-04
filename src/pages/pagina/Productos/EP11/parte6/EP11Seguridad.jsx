// EP11Seguridad.jsx
import { Link } from 'react-router-dom';
import './EP11Seguridad.css';

import imgProducto  from '../../../../../assets/EP11/EP11-2.png';
import imgModoUso   from '../../../../../assets/EP11/Modo-de-uso.png';
import imgSeguridad from '../../../../../assets/EP11/Seguridad.png';
import btnComprar   from '../../../../../assets/EP11/1.png';
import btnDoctor    from '../../../../../assets/EP11/2.png';

const EP11Seguridad = () => {
  return (
    <section className="ep11-seguridad">

  <h2 className="ep11-seguridad-title">SEGURIDAD Y MODO DE USO</h2>

  {/* Fila 1 — dos columnas: modo de uso + producto */}
  <div className="ep11-seguridad-row1">
    <img src={imgModoUso}   alt="Modo de uso"  className="ep11-seguridad-card" />
    <div className="ep11-seguridad-img-wrapper">
      <img src={imgProducto} alt="EP11 producto" className="ep11-seguridad-img" />
    </div>
  </div>

  {/* Fila 2 — una columna: seguridad */}
  <div className="ep11-seguridad-row2">
    <img src={imgSeguridad} alt="Seguridad" className="ep11-seguridad-card2" />
  </div>

  {/* Botones */}
  <div className="ep11-seguridad-btns">
    <Link to="/tienda" className="ep11-seguridad-btn">
      <img src={btnComprar} alt="Comprar ahora" className="ep11-seguridad-btn-img" />
    </Link>
    <Link to="/contacto" className="prushot-seguridad-btn-comprar">
          <img src={btnDoctor} alt="Comunicarme con el Doctor" className="ep11-seguridad-btn-img" />
    </Link>
  </div>

</section>
  );
};

export default EP11Seguridad;