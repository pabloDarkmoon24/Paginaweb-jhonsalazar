// GraciasVarices.jsx — Página de confirmación post-contacto para Google Ads
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const WA_NUMBER = '573136497534';
const WA_MSG    = encodeURIComponent('¡Hola Dr. John Salazar! Quiero agendar mi consulta para el tratamiento de várices.');
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export default function GraciasVarices() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.gtag) {
      window.gtag('event', 'conversion', { event_category: 'varices', event_label: 'gracias_varices' });
    }
    if (window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'Gracias Varices', content_category: 'varices' });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Solicitud recibida — Dr. John Salazar</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        background: '#f9f9f9',
      }}>
        <div style={{
          maxWidth: 520,
          textAlign: 'center',
          background: '#fff',
          borderRadius: 12,
          padding: '48px 40px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}>

          {/* Icono check */}
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: '#c9a84c', margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#324149', marginBottom: 12 }}>
            ¡Gracias por contactarnos!
          </h1>
          <p style={{ color: '#66747f', lineHeight: 1.7, marginBottom: 32, fontSize: '1rem' }}>
            Hemos recibido tu solicitud. El equipo del Dr. John Salazar te contactará
            a la brevedad para confirmar tu cita.
          </p>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25d366', color: '#fff',
              fontWeight: 700, fontSize: '1rem',
              padding: '14px 28px', borderRadius: 6,
              textDecoration: 'none', marginBottom: 20,
            }}
          >
            <svg viewBox="0 0 32 32" fill="white" width="18" height="18">
              <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.469-2.003A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.28 21.426c-.4-.2-2.364-1.165-2.729-1.299-.366-.133-.633-.2-.9.2-.266.4-1.032 1.299-1.265 1.565-.234.267-.467.3-.867.1-.4-.2-1.688-.622-3.215-1.982-1.188-1.059-1.99-2.367-2.222-2.767-.234-.4-.025-.617.175-.816.181-.179.4-.466.6-.699.2-.233.267-.4.4-.667.133-.266.067-.5-.033-.699-.1-.2-.9-2.167-1.232-2.966-.325-.78-.655-.674-.9-.686l-.767-.013c-.266 0-.699.1-1.065.5-.366.4-1.399 1.367-1.399 3.333s1.432 3.867 1.632 4.133c.2.267 2.82 4.3 6.832 6.033.955.412 1.7.658 2.28.843.958.305 1.83.262 2.52.159.768-.115 2.364-.967 2.697-1.9.333-.933.333-1.733.233-1.9-.099-.166-.366-.266-.766-.466z"/>
            </svg>
            Escribir por WhatsApp
          </a>

          <br />
          <Link to="/varices" style={{ color: '#c9a84c', fontSize: '0.9rem', textDecoration: 'none' }}>
            ← Volver a la página de várices
          </Link>
        </div>
      </main>
    </>
  );
}
