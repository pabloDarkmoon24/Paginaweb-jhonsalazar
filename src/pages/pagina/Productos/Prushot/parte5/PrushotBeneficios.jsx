// PrushotBeneficios.jsx
import './PrushotBeneficios.css';
import bannerBeneficios from '../../../../../assets/Prushot/Banner-beneficios-clinicios-y-tecnicos.png';



const PrushotBeneficios = () => {
  return (
    <section className="prushot-beneficios">

      {/* Header blanco */}
      <div className="prushot-beneficios-header">
        <h2 className="prushot-beneficios-title">
          BENEFICIOS CLÍNICOS
        </h2>
        <p className="prushot-beneficios-subtitle">Y TÉCNICOS</p>
      </div>

      {/* Banner imagen */}
      <div className="prushot-beneficios-banner">
        <img
          src={bannerBeneficios}
          alt="Beneficios clínicos y técnicos Prushot"
          className="prushot-beneficios-img"
        />

      </div>


    </section>
  );
};

export default PrushotBeneficios;