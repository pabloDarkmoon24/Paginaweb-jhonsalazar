// WhatsAppButton.jsx — Botón flotante global de WhatsApp
import { useEffect, useState } from 'react';
import './WhatsAppButton.css';

const WA_NUMBER = '573136497534';

const MESSAGES = {
  default:  '¡Hola Dr. John Salazar! Me gustaría agendar una consulta.',
  varices:  '¡Hola Dr. John Salazar! Vi su página sobre tratamiento de várices y me gustaría agendar una consulta.',
  prushot:  '¡Hola! Me interesa información sobre PRUSHOT.',
  hamamelis:'¡Hola! Me interesa el tratamiento con Hamamelis para las várices.',
  ep11:     '¡Hola! Me interesa información sobre EP11.',
};

const WhatsAppButton = ({ context = 'default' }) => {
  const [visible, setVisible] = useState(false);
  const [pulse,   setPulse]   = useState(false);

  // Aparece después de 3 segundos
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 3000);
    // Pulsa cada 8 segundos para llamar la atención
    const t2 = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 8000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  const handleClick = () => {
    // Trackear en Meta Pixel como Lead
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'WhatsApp Click',
        content_category: context,
      });
    }
    // Trackear en Google Analytics
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: context,
      });
    }
    const msg = encodeURIComponent(MESSAGES[context] || MESSAGES.default);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className={`wa-btn ${pulse ? 'wa-btn--pulse' : ''}`}
      aria-label="Contactar por WhatsApp"
      title="Escríbenos por WhatsApp"
    >
      {/* Ícono WhatsApp SVG */}
      <svg viewBox="0 0 32 32" className="wa-btn__icon" fill="white">
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.469-2.003A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.853l-.485-.289-5.027 1.187 1.22-4.893-.317-.503A13.237 13.237 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.28-9.907c-.4-.2-2.364-1.165-2.729-1.299-.366-.133-.633-.2-.9.2-.266.4-1.032 1.299-1.265 1.565-.234.267-.467.3-.867.1-.4-.2-1.688-.622-3.215-1.982-1.188-1.059-1.99-2.367-2.222-2.767-.234-.4-.025-.617.175-.816.181-.179.4-.466.6-.699.2-.233.267-.4.4-.667.133-.266.067-.5-.033-.699-.1-.2-.9-2.167-1.232-2.966-.325-.78-.655-.674-.9-.686l-.767-.013c-.266 0-.699.1-1.065.5-.366.4-1.399 1.367-1.399 3.333s1.432 3.867 1.632 4.133c.2.267 2.82 4.3 6.832 6.033.955.412 1.7.658 2.28.843.958.305 1.83.262 2.52.159.768-.115 2.364-.967 2.697-1.9.333-.933.333-1.733.233-1.9-.099-.166-.366-.266-.766-.466z"/>
      </svg>
      <span className="wa-btn__text">¿Hablamos?</span>
    </button>
  );
};

export default WhatsAppButton;
