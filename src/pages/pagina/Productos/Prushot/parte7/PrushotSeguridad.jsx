// PrushotSeguridad.jsx
import { Link } from 'react-router-dom';
import './PrushotSeguridad.css';

import imgProducto   from '../../../../../assets/Prushot/Prushot_3.png';
import imgModoUso    from '../../../../../assets/Prushot/Modo-de-uso.png';
import imgSeguridad  from '../../../../../assets/Prushot/Seguridad.png';
import btnComprar    from '../../../../../assets/Prushot/Comprar-ahoradc.png';
import btndc    from '../../../../../assets/Prushot/boton dr.png';

const PrushotSeguridad = () => {
  return (
    <section className="prushot-seguridad">

      {/* Título */}
      <h2 className="prushot-seguridad-title">SEGURIDAD Y MODO DE USO</h2>

      <div className="prushot-seguridad-container">

        {/* Columna izquierda — tarjetas */}
        <div className="prushot-seguridad-cards">
          <img src={imgModoUso}   alt="Modo de uso"  className="prushot-seguridad-card" />
          <img src={imgSeguridad} alt="Seguridad"    className="prushot-seguridad-card" />
        </div>

        {/* Columna derecha — producto */}
        <div className="prushot-seguridad-img-wrapper">
          <img src={imgProducto} alt="Prushot producto" className="prushot-seguridad-img" />
        </div>

      </div>

      {/* Botones */}
      <div className="prushot-seguridad-btns">
        <Link to="/tienda" className="prushot-seguridad-btn-comprar">
          <img src={btnComprar} alt="Comprar ahora" className="prushot-seguridad-btn-img" />
        </Link>
        <Link to="/contacto" className="prushot-seguridad-btn-comprar">
          <img src={btndc} alt="Comprar ahora" className="prushot-seguridad-btn-img" />
        </Link>
      </div>

    </section>
  );
};

export default PrushotSeguridad;