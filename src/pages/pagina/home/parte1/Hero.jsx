// Hero.jsx - Sección principal del Home
import { Link } from 'react-router-dom';
import './Hero.css';
import doctorImage from '../../../../assets/Home/Foto-Dr-John-Salazar.png'; 
import btn1 from '../../../../assets/Home/Boton-ver-productos.png'; 
import btn2 from '../../../../assets/Home/Boton-agendar-cita.png'; 
import { FiArrowUpRight } from 'react-icons/fi';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Contenido de texto - Izquierda */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-primary">Ciencia Natural</span>
            <span className="hero-title-secondary"> aplicada al:</span>
            <br />
            <span className="hero-title-main">Bienestar Humano.</span>
          </h1>

          <p className="hero-description">
            <strong>Restauramos</strong> tu energía vital y{' '}
            <strong>promovemos</strong> el equilibrio integral de tu cuerpo a través de{' '}
            <strong>la medicina biológica</strong>
          </p>

          {/* Botones CTA */}
          <div className="hero-buttons">
            <Link to="/tienda" className="hero-btn hero-btn-primary">
              <img src={btn1} alt="Ver productos" />
            </Link>
            <Link to="/contacto" className="hero-btn hero-btn-secondary">
              <img src={btn2} alt="Agendar cita" />
            </Link>
          </div>
        </div>

        {/* Imagen del doctor - Derecha */}
        <div className="hero-image-wrapper">
          <div className="hero-image-background"></div>
          <img 
            src={doctorImage} 
            alt="Dr. John Salazar - Especialista en Medicina Biológica y Flebología"
            className="hero-image"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;