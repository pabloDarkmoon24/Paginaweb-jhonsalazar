// HamameliResultados.jsx
import './HamameliResultados.css';
import imgResultados from '../../../../../assets/Hamamelis/Resultados-visibles.png';

const HamameliResultados = () => {
  return (
    <section className="hamamelis-resultados">
        <div className="hamamelis-divider" />

      <div
        className="hamamelis-resultados-wrapper"
        style={{ '--hres-bg': `url(${imgResultados})` }}
      >
        <div className="hamamelis-resultados-inner">
          <img
            src={imgResultados}
            alt="Resultados visibles Hamamelis"
            className="hamamelis-resultados-img"
          />
        </div>
      </div>

    </section>
  );
};

export default HamameliResultados;