// VaricesSection.jsx — Sección de venas várices en el Home
import { Link } from 'react-router-dom';
import './VaricesSection.css';

const tratamientos = [
  'Ecodoppler Vascular',
  'Escleroterapia',
  'Espuma Ecoguiada',
  'Láser Endovascular',
];

const VaricesSection = () => (
  <section className="vs">
    <div className="vs__inner">

      {/* ── Contenido izquierda ── */}
      <div className="vs__content">
        <p className="vs__label">Especialidad clínica · Pereira, Eje Cafetero</p>
        <h2 className="vs__title">
          ¿Sufres de <em>venas várices?</em>
        </h2>
        <p className="vs__desc">
          El Dr. John Salazar trata las várices con técnicas modernas y mínimamente invasivas.
          Sin cirugías abiertas, con diagnóstico Ecodoppler y resultados visibles desde la primera sesión.
        </p>
        <ul className="vs__list">
          {tratamientos.map((t, i) => (
            <li key={i} className="vs__list-item">
              <span className="vs__dot" />
              {t}
            </li>
          ))}
        </ul>
        <Link to="/varices" className="vs__cta">
          Ver tratamientos
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>

      {/* ── Foto derecha ── */}
      <div className="vs__photo-wrap">
        <img
          src="/Foto doc.jpg"
          alt="Dr. John Salazar — Especialista en Flebología, Pereira"
          className="vs__photo"
          loading="lazy"
        />
        <div className="vs__badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#c9a84c">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          5 estrellas en Google
        </div>
      </div>

    </div>
  </section>
);

export default VaricesSection;
