// LeadershipSection.jsx - Sección de Liderazgo con imagen flotante
import './LeadershipSection.css';
import image1 from '../../../../assets/Home/Post-1.png';
import image2 from '../../../../assets/Home/Post-2.png';
import image3 from '../../../../assets/Home/Post-3.png';
import floatingImg from '../../../../assets/Home/Objeto-flotante-1.png'; // TU IMAGEN FLOTANTE

const LeadershipSection = () => {
  const images = [
    { id: 1, src: image1, alt: 'Di adiós a las várices' },
    { id: 2, src: image2, alt: 'Consulta con el Dr. John Salazar' },
    { id: 3, src: image3, alt: 'Tratamiento de várices' }
  ];

  return (
    <section className="leadership">
      {/* IMAGEN FLOTANTE DE FONDO */}
      <div className="leadership-floating">
        <img 
          src={floatingImg} 
          alt="" 
          className="leadership-floating-img"
        />
      </div>

      <div className="leadership-container">
        {/* Título */}
        <h2 className="leadership-title">
          Liderazgo en Flebología y Medicina Biológica.
        </h2>

        {/* Descripción */}
        <p className="leadership-description">
          Bajo la dirección del <strong>Dr. John Salazar</strong>, especialista en <strong>Medicina Biológica y Flebología</strong>,
          trabajamos con tecnología de punta y tratamientos multidisciplinarios para el manejo de
          venas várices <strong>sin cirugía</strong>, combinando la ciencia con el bienestar integral.
        </p>

        {/* Grid de 3 imágenes */}
        <div className="leadership-grid">
          {images.map((image) => (
            <div key={image.id} className="leadership-card">
              <img 
                src={image.src} 
                alt={image.alt}
                className="leadership-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;