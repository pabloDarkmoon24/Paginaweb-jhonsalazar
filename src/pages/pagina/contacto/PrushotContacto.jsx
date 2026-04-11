// PrushotContacto.jsx
import { useState } from 'react';
import { createLead } from '../../../services/leadsService';
import SEO from '../../../components/common/SEO';
import './PrushotContacto.css';

import bgContacto from '../../../assets/Contacto/Bg-contacto.png';
import imgJohn    from '../../../assets/Contacto/John.png';

const PrushotContacto = () => {
  const [form, setForm] = useState({
    asunto: '', nombres: '', apellidos: '', correo: '', telefono: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await createLead(form);
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Formulario de contacto',
          content_category: 'consulta',
        });
      }
      setSent(true);
      setForm({ asunto: '', nombres: '', apellidos: '', correo: '', telefono: '' });
    } catch (err) {
      console.error(err);
      alert('Error enviando el mensaje. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <SEO
      title="Contacto — Agenda tu consulta con el Dr. John Salazar en Pereira"
      description="Contáctate con el Dr. John Salazar, especialista en Medicina Biológica y Flebología en Pereira. Agenda tu consulta para tratamiento de várices sin cirugía o resuelve tus dudas sobre nuestros productos naturales."
      path="/contacto"
    />
    <section
      className="prushot-contacto"
      style={{ '--contacto-bg': `url(${bgContacto})` }}
    >
      <div className="prushot-contacto-overlay" />

      <div className="prushot-contacto-inner">

        {/* Título y descripción */}
        <div className="prushot-contacto-header">
          <h2 className="prushot-contacto-title">HABLEMOS</h2>
          <p className="prushot-contacto-desc">
            Nuestro equipo está disponible para brindarte información clara y orientación
            personalizada sobre nuestros productos, modos de uso, combinaciones
            recomendadas y proceso de compra.
          </p>
        </div>

        {/* Wrapper grande: doctor + formulario */}
        <div className="prushot-contacto-body">

          {/* Bloque 1 — Doctor */}
          <div className="prushot-contacto-doctor-card">
            <img src={imgJohn} alt="Dr. John S." className="prushot-contacto-img" />
          </div>

          {/* Bloque 2 — Formulario */}
          
          <div className="prushot-contacto-form-card">
            <span><h1>Dr. John Salazar</h1></span>
            <form className="prushot-contacto-form" onSubmit={handleSubmit}>
              {[
                { name: 'asunto',    placeholder: 'Asunto:',             type: 'text'  },
                { name: 'nombres',   placeholder: 'Nombres:',            type: 'text'  },
                { name: 'apellidos', placeholder: 'Apellidos:',          type: 'text'  },
                { name: 'correo',    placeholder: 'Correo electrónico:', type: 'email' },
                { name: 'telefono',  placeholder: 'Número de contacto:', type: 'tel'   },
              ].map(({ name, placeholder, type }) => (
                <div className="prushot-input-group" key={name}>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    className="prushot-contacto-input"
                    required
                  />
                </div>
              ))}
              {sent && (
                <p style={{ color: '#27ae60', fontWeight: 600, textAlign: 'center' }}>
                  ¡Mensaje enviado! Te contactaremos pronto.
                </p>
              )}
              <button type="submit" className="prushot-contacto-btn" disabled={sending}>
                <span>{sending ? 'ENVIANDO...' : 'ENVIAR'}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>

    {/* Sección mapa */}
    <section className="contacto-mapa">
      <div className="contacto-mapa-inner">
        <h2 className="contacto-mapa-title">¿Dónde estamos?</h2>
        <p className="contacto-mapa-desc">Consultorio del Dr. John Salazar — Pereira, Risaralda, Colombia</p>
        <div className="contacto-mapa-wrapper">
          <iframe
            title="Ubicación Dr. John Salazar"
            src="https://maps.google.com/maps?q=4.8044055,-75.6902629&z=16&hl=es&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=4.8044055%2C-75.6902629"
          target="_blank"
          rel="noopener noreferrer"
          className="contacto-mapa-btn"
        >
          Cómo llegar
        </a>
      </div>
    </section>
    </>
  );
};

export default PrushotContacto;