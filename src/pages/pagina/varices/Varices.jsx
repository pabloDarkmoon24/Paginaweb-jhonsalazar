// Varices.jsx — Landing page SEO + conversión para Pereira y Eje Cafetero
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import bgHome       from '../../../assets/Home/BG-Home.png';
import doctorCutout from '../../../assets/Home/Foto-Dr-John-Salazar.png';
import logoHeader   from '../../../assets/Home/Logo-Header.png';
import hamamelisProd from '../../../assets/Hamamelis/Hamamelis-castaño-de-indias.png';
import iconCheck    from '../../../assets/Hamamelis/Icon-check.png';
import './Varices.css';

const WA_NUMBER = '573136497534';
const WA_MSG    = encodeURIComponent('¡Hola Dr. John Salazar! Vi su página sobre tratamiento de várices y quisiera agendar una consulta.');
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const varicosSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalClinic',
      '@id': 'https://drjohnsalazar.com.co/#consultorio',
      name: 'Consultorio Dr. John Salazar — Flebología Pereira',
      description: 'Especialistas en tratamiento de várices e insuficiencia venosa en Pereira, Risaralda.',
      url: 'https://drjohnsalazar.com.co/varices',
      telephone: '+573136497534',
      priceRange: '$$',
      medicalSpecialty: ['Flebología', 'Angiología', 'Medicina Vascular'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', bestRating: '5', ratingCount: '5' },
      address: { '@type': 'PostalAddress', addressLocality: 'Pereira', addressRegion: 'Risaralda', addressCountry: 'CO' },
      geo: { '@type': 'GeoCoordinates', latitude: 4.8044055, longitude: -75.6902629 },
      areaServed: [
        'Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Marsella',
        'Manizales', 'Chinchiná', 'Villamaría', 'Palestina', 'Neira', 'Anserma', 'Riosucio', 'Salamina',
        'Armenia', 'Calarcá', 'Montenegro', 'Quimbaya', 'La Tebaida', 'Circasia', 'Filandia',
        'Cartago', 'Eje Cafetero', 'Risaralda', 'Caldas', 'Quindío',
      ],
    },
    {
      '@type': 'Physician',
      name: 'Dr. John Salazar Salazar',
      medicalSpecialty: ['Flebología', 'Medicina Biológica', 'Angiología'],
      url: 'https://drjohnsalazar.com.co',
      telephone: '+573136497534',
      address: { '@type': 'PostalAddress', addressLocality: 'Pereira', addressRegion: 'Risaralda', addressCountry: 'CO' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '¿Cuánto cuesta el tratamiento de várices en Pereira?', acceptedAnswer: { '@type': 'Answer', text: 'El costo varía según el tipo y extensión. Realizamos primero una evaluación con Ecodoppler para diseñar tu plan personalizado.' } },
        { '@type': 'Question', name: '¿El tratamiento de várices duele?', acceptedAnswer: { '@type': 'Answer', text: 'Los tratamientos son mínimamente invasivos y no requieren cirugía. Se usa anestesia local cuando es necesario y la mayoría de pacientes retoman actividades el mismo día.' } },
        { '@type': 'Question', name: '¿Atienden pacientes de Manizales, Armenia y Cartago?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. El consultorio está en Pereira y atendemos pacientes de todo el Eje Cafetero. La mayoría solo necesita 2 a 3 visitas.' } },
        { '@type': 'Question', name: '¿Cuántas sesiones necesito?', acceptedAnswer: { '@type': 'Answer', text: 'Depende del caso. Várices leves: 1 a 3 sesiones de escleroterapia. Casos complejos se definen en la evaluación inicial.' } },
        { '@type': 'Question', name: '¿Atienden pacientes de Manizales para tratamiento de várices?', acceptedAnswer: { '@type': 'Answer', text: 'La consulta es únicamente en Pereira. Sin embargo, muchos pacientes de Manizales viajan al consultorio del Dr. John Salazar (aprox. 55 minutos) y generalmente solo necesitan 2 o 3 visitas.' } },
        { '@type': 'Question', name: '¿Dónde puedo tratar mis várices en Armenia?', acceptedAnswer: { '@type': 'Answer', text: 'El Dr. John Salazar atiende exclusivamente en su consultorio de Pereira. Pacientes de Armenia, Calarcá, Montenegro y el Quindío viajan hasta Pereira, accesible fácilmente por la autopista del Café.' } },
        { '@type': 'Question', name: '¿Hay tratamiento de várices cerca de Cartago?', acceptedAnswer: { '@type': 'Answer', text: 'La atención es solo en Pereira. Cartago está a unos 40 minutos del consultorio del Dr. John Salazar. Recibimos pacientes del norte del Valle del Cauca que viajan hasta Pereira.' } },
      ],
    },
  ],
};

// ── Botón WhatsApp ───────────────────────────────────────────────────────────
const CtaWa = ({ text = 'Agendar consulta por WhatsApp', size = 'md' }) => {
  const handleClick = () => {
    if (window.fbq) window.fbq('track', 'Lead', { content_name: 'WhatsApp CTA Varices', content_category: 'varices' });
    if (window.gtag) window.gtag('event', 'whatsapp_click', { event_category: 'varices_landing', event_label: text });
    window.open(WA_LINK, '_blank');
  };
  return (
    <button onClick={handleClick} className={`va-btn-wa va-btn-wa--${size}`}>
      <svg viewBox="0 0 32 32" fill="white" width={size === 'lg' ? 21 : 17} height={size === 'lg' ? 21 : 17} style={{ flexShrink: 0 }}>
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.773L0 32l8.469-2.003A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.28 21.426c-.4-.2-2.364-1.165-2.729-1.299-.366-.133-.633-.2-.9.2-.266.4-1.032 1.299-1.265 1.565-.234.267-.467.3-.867.1-.4-.2-1.688-.622-3.215-1.982-1.188-1.059-1.99-2.367-2.222-2.767-.234-.4-.025-.617.175-.816.181-.179.4-.466.6-.699.2-.233.267-.4.4-.667.133-.266.067-.5-.033-.699-.1-.2-.9-2.167-1.232-2.966-.325-.78-.655-.674-.9-.686l-.767-.013c-.266 0-.699.1-1.065.5-.366.4-1.399 1.367-1.399 3.333s1.432 3.867 1.632 4.133c.2.267 2.82 4.3 6.832 6.033.955.412 1.7.658 2.28.843.958.305 1.83.262 2.52.159.768-.115 2.364-.967 2.697-1.9.333-.933.333-1.733.233-1.9-.099-.166-.366-.266-.766-.466z"/>
      </svg>
      {text}
    </button>
  );
};

// ── Componente principal ─────────────────────────────────────────────────────
function Varices() {
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Landing Varices Pereira',
        content_category: 'servicio-medico',
        content_ids: ['varices-pereira'],
      });
    }
    window.scrollTo(0, 0);
  }, []);

  const sintomas = [
    'Piernas pesadas o cansadas al final del día',
    'Venas azules o moradas visibles en piernas',
    'Ardor, picazón o sensación de calor en las venas',
    'Hinchazón de tobillos o pies',
    'Calambres nocturnos frecuentes',
    'Manchas oscuras o heridas que no cicatrizan',
  ];

  const tratamientos = [
    { num: '01', nombre: 'Diagnóstico de Alta Precisión', desc: 'Evaluamos tu sistema venoso con tecnología de imagen avanzada para diseñar el plan de tratamiento exacto que necesitas.' },
    { num: '02', nombre: 'Láser Vascular de Última Generación', desc: 'Tratamos las venas varicosas con láser vascular de punta. Sin cortes, sin cicatrices, retorno a actividades en 24–48 h.' },
    { num: '03', nombre: 'Tratamiento Multidisciplinario', desc: 'Combinamos diferentes tecnologías y enfoques para abordar cada caso de forma integral. Un plan personalizado para cada paciente.' },
    { num: '04', nombre: 'Sin Cirugía · Sin Hospitalización', desc: 'Todos nuestros tratamientos son ambulatorios. No requieren internación ni cirugía abierta. Máxima eficacia con mínima invasión.' },
  ];

  const credenciales = [
    { año: '2015', titulo: 'Médico Cirujano', inst: 'UNERG, Venezuela' },
    { año: '2022', titulo: 'Especialista en Terapias Alternativas y Farmacología Vegetal', inst: 'Universidad Juan N. Corpas' },
    { año: '2023', titulo: 'Diplomado Ecodoppler Vascular', inst: 'Cedum Academy' },
    { año: '2024', titulo: 'Diplomado en Flebología', inst: 'Instituto Mexicano de Flebología' },
    { año: '2025', titulo: 'Espuma Ecoguiada y Láser Endovascular', inst: 'Eccos Brazil' },
  ];

  const testimonios = [
    { nombre: 'Martha L.', ciudad: 'Pereira',    texto: 'Llegué con las venas muy marcadas y bastante dolor. El doctor fue muy claro desde el principio, me explicó todo sin afanes. Hice 2 sesiones y quedé muy contenta.' },
    { nombre: 'Julio C.',  ciudad: 'Manizales',  texto: 'Vine desde Manizales porque me lo recomendaron. El procedimiento fue rápido, sin dolor, y al día siguiente ya estaba trabajando normal. No lo podía creer.' },
    { nombre: 'Ana M.',    ciudad: 'Armenia',    texto: 'Llevaba años con ese tema y siempre lo dejaba para después. Finalmente me animé. Ojalá lo hubiera hecho antes, el proceso fue tranquilo y los resultados se ven.' },
    { nombre: 'Roberto V.', ciudad: 'Cartago',   texto: 'Tenía una herida en la pierna que no cerraba. Con el tratamiento del doctor, en mes y medio quedó cerrada completamente. No esperaba que fuera tan efectivo.' },
  ];

  const faqs = [
    { p: '¿Cuánto cuesta el tratamiento de várices?',           r: 'El costo varía según el tipo y extensión. Realizamos primero una evaluación con Ecodoppler para diseñar tu plan. Escríbenos para recibir tu presupuesto sin compromiso.' },
    { p: '¿El tratamiento duele?',                             r: 'Los tratamientos son mínimamente invasivos y no requieren cirugía. La molestia es mínima y la mayoría de pacientes retoman sus actividades el mismo día o al siguiente.' },
    { p: '¿Tienen consultorio en Manizales, Armenia o Cartago?', r: 'No. La consulta es únicamente en nuestro consultorio de Pereira, Risaralda. Sin embargo, recibimos pacientes que vienen desde Manizales, Armenia, Cartago y todo el Eje Cafetero.' },
    { p: '¿Las várices vuelven a aparecer?',                    r: 'Con un tratamiento bien ejecutado y hábitos saludables, la recurrencia es baja. Diseñamos planes de mantenimiento para cada paciente.' },
    { p: '¿Cuántas sesiones necesito?',                         r: 'Depende del caso. Las várices leves: 1 a 3 sesiones de escleroterapia. Los casos complejos se definen en la primera evaluación.' },
    { p: '¿Puedo venir desde Manizales?',                       r: 'Sí, pero la consulta es únicamente en nuestro consultorio de Pereira. Muchos pacientes de Manizales hacen el viaje (aproximadamente 55 minutos) y solo necesitan entre 2 y 3 visitas durante todo el tratamiento.' },
    { p: '¿Puedo venir desde Armenia o el Quindío?',            r: 'Sí. La atención es solo en Pereira. Pacientes de Armenia, Calarcá, Montenegro y todo el Quindío nos visitan en el consultorio. El acceso desde la autopista del Café hace que llegar a Pereira sea muy sencillo.' },
    { p: '¿Puedo venir desde Cartago o el norte del Valle?',    r: 'Sí, pero la consulta es exclusivamente en Pereira. Cartago está a unos 40 minutos del consultorio. También atendemos pacientes de municipios del norte del Valle del Cauca que viajan hasta Pereira.' },
    { p: '¿Tienen consultorio en Dosquebradas o Santa Rosa?',   r: 'No. El único consultorio está en Pereira. Sin embargo, Dosquebradas y Santa Rosa de Cabal quedan a pocos minutos, por lo que muchos pacientes de esos municipios nos visitan con frecuencia.' },
  ];

  const videos = [
    { id: '1023499429595639', title: '"La Abuela" — Testimonio real', desc: 'Resultados que hablan solos' },
    { id: '1427344862526267', title: 'Paciente con venas varicosas',  desc: 'Antes y después del tratamiento' },
    { id: '1198914878742461', title: 'Tratamiento mínimamente invasivo', desc: 'Sin cirugía, sin cicatrices' },
  ];

  return (
    <>
      <Helmet>
        <title>Tratamiento de Várices en Pereira — Dr. John Salazar | Flebólogo Eje Cafetero</title>
        <meta name="description" content="¿Varices en Pereira, Manizales o Armenia? El Dr. John Salazar, especialista en Flebología, ofrece Escleroterapia, Espuma Ecoguiada y Láser Endovascular. Consulta hoy: 313 649 7534." />
        <meta name="keywords" content="varices Pereira, tratamiento varices Pereira, flebólogo Pereira, escleroterapia Pereira, láser varices Pereira, venas varicosas Pereira, arañas vasculares Pereira, ecodoppler vascular Pereira, varices Manizales, flebólogo Manizales, escleroterapia Manizales, tratamiento varices Manizales, varices Armenia, flebólogo Armenia, escleroterapia Armenia, tratamiento varices Armenia, varices Cartago, varices Dosquebradas, varices Santa Rosa de Cabal, varices Chinchiná, varices La Virginia, varices Villamaría, varices Calarcá, varices Montenegro, varices Quimbaya, varices La Tebaida, varices Circasia, varices Filandia, varices Riosucio, varices Anserma, varices Salamina, varices Neira, varices Eje Cafetero, flebólogo Eje Cafetero, tratamiento varices Eje Cafetero, Dr John Salazar varices, médico varices Pereira, especialista várices Risaralda, especialista várices Caldas, especialista várices Quindío, insuficiencia venosa Pereira, venas hinchadas tratamiento, piernas pesadas tratamiento, telangiectasias Pereira, espuma ecoguiada Pereira, láser endovascular Pereira" />
        <link rel="canonical" href="https://drjohnsalazar.com.co/varices" />
        <meta property="og:title" content="Tratamiento de Várices en Pereira — Dr. John Salazar" />
        <meta property="og:description" content="Flebólogo especialista en Pereira. Escleroterapia, Espuma Ecoguiada y Láser Endovascular. Atendemos Pereira, Manizales, Armenia y Cartago." />
        <meta property="og:url" content="https://drjohnsalazar.com.co/varices" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(varicosSchema)}</script>
      </Helmet>

      <main className="va">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="va-hero" style={{ '--va-bg': `url(${bgHome})` }}>
          <div className="va-hero__overlay" />
          <div className="va-hero__inner">
            <div className="va-hero__left">
              <div className="va-hero__badge">Pereira · Manizales · Armenia · Cartago</div>
              <h1 className="va-hero__title">
                <span className="va-hero__title-main">Tratamiento</span>
                <span className="va-hero__title-sub"> de Várices</span>
                <br />
                <span className="va-hero__title-place">en el Eje Cafetero</span>
              </h1>
              <p className="va-hero__desc">
                Especialista en <strong>Medicina Biológica y Flebología</strong>. Trabajamos con
                tecnología de punta — incluyendo <strong>Láser Vascular</strong> — y un enfoque
                multidisciplinario. <strong>Sin cirugía. Sin hospitalización.</strong> Resultados visibles desde la primera sesión.
              </p>
              <div className="va-hero__ctas">
                <CtaWa text="Agendar consulta" size="lg" />
                <a href="tel:+573136497534" className="va-hero__tel">313 649 7534</a>
              </div>
              <div className="va-hero__trust">
                <div className="va-trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span>5 estrellas en Google</span>
                </div>
                <div className="va-trust-sep" />
                <div className="va-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Consultorio en Pereira</span>
                </div>
                <div className="va-trust-sep" />
                <div className="va-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                  <span>Atendemos todo el Eje Cafetero</span>
                </div>
              </div>
            </div>
            <div className="va-hero__right">
              <img
                src={doctorCutout}
                alt="Dr. John Salazar — Flebólogo Pereira"
                className="va-hero__doc"
              />
            </div>
          </div>
        </section>

        {/* ── VIDEOS ───────────────────────────────────────────────────────── */}
        <section className="va-section va-videos">
          <div className="va-container">
            <h2 className="va-title va-title--light">Resultados reales de pacientes</h2>
            <p className="va-sub va-sub--light">Estos son testimonios reales de pacientes atendidos por el Dr. John Salazar.</p>
            <div className="va-videos__grid">
              {videos.map((v, i) => (
                <div key={i} className="va-video-card">
                  <div className="va-video-card__frame">
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${v.id}&show_text=false&autoplay=true&allowfullscreen=true`}
                      scrolling="no"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                      title={v.title}
                    />
                  </div>
                  <div className="va-video-card__info">
                    <strong>{v.title}</strong>
                    <span>{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SÍNTOMAS ─────────────────────────────────────────────────────── */}
        <section className="va-section va-sintomas">
          <div className="va-container">
            <h2 className="va-title">¿Te identificas con alguno de estos síntomas?</h2>
            <p className="va-sub">Las várices son más que un problema estético. Si no se tratan, pueden volverse una condición seria.</p>
            <div className="va-sintomas__grid">
              {sintomas.map((s, i) => (
                <div key={i} className="va-sintoma-item">
                  <img src={iconCheck} alt="" className="va-sintoma-item__icon" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="va-sintomas__cta">
              <p>Si tienes uno o más de estos síntomas, lo más probable es que necesites una evaluación vascular.</p>
              <CtaWa text="Consultar mi caso" size="md" />
            </div>
          </div>
        </section>

        {/* ── TRATAMIENTOS ─────────────────────────────────────────────────── */}
        <section className="va-section va-tratamientos">
          <div className="va-container">
            <h2 className="va-title va-title--light">Tecnología de punta para tratar tus várices</h2>
            <p className="va-sub va-sub--light">Trabajamos con la última tecnología disponible y un enfoque multidisciplinario. Sin cirugía.</p>
            <div className="va-trat__grid">
              {tratamientos.map((t, i) => (
                <div key={i} className="va-trat-card">
                  <div className="va-trat-card__num">{t.num}</div>
                  <h3 className="va-trat-card__title">{t.nombre}</h3>
                  <p className="va-trat-card__desc">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOCTOR ───────────────────────────────────────────────────────── */}
        <section className="va-section va-doctor">
          <div className="va-container va-doctor__inner">
            <div className="va-doctor__photo-wrap">
              <img
                src="/Foto doc.jpg"
                alt="Dr. John Salazar — Especialista en Medicina Biológica y Flebología"
                className="va-doctor__photo"
                loading="lazy"
              />
            </div>
            <div className="va-doctor__content">
              <p className="va-label">Conozca al especialista</p>
              <h2 className="va-title" style={{ textAlign: 'left', marginBottom: 12 }}>
                <em>Dr. John Salazar</em>
              </h2>
              <p className="va-doctor__bio">
                Médico especialista en <strong>Medicina Biológica y Flebología</strong> con más de 10 años de experiencia clínica.
                Formado en tecnologías vasculares de punta en México, Brasil y Venezuela.
                Referente en el tratamiento multidisciplinario de venas várices en el Eje Cafetero,
                utilizando <strong>láser vascular y tecnología de última generación</strong>, siempre sin cirugía.
              </p>
              <div className="va-creds">
                {credenciales.map((c, i) => (
                  <div key={i} className="va-cred">
                    <span className="va-cred__año">{c.año}</span>
                    <div className="va-cred__info">
                      <strong>{c.titulo}</strong>
                      <span>{c.inst}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="va-doctor__rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <strong>5 estrellas en Google</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESO ──────────────────────────────────────────────────────── */}
        <section className="va-section va-proceso">
          <div className="va-container">
            <h2 className="va-title">¿Cómo es el proceso?</h2>
            <div className="va-proceso__steps">
              {[
                { n: '1', titulo: 'Agenda tu consulta',          desc: 'Escríbenos por WhatsApp o llama. Te confirmamos cita en 24 horas.' },
                { n: '2', titulo: 'Evaluación con tecnología avanzada',   desc: 'El Dr. John Salazar, especialista en Medicina Biológica y Flebología, diseña tu plan de tratamiento personalizado.' },
                { n: '3', titulo: 'Tratamiento y seguimiento',   desc: 'Aplicamos la tecnología más avanzada y te acompañamos durante todo el proceso hasta lograr los resultados.' },
              ].map((s, i) => (
                <div key={i} className="va-proceso__step">
                  <div className="va-proceso__num">{s.n}</div>
                  <h3>{s.titulo}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <CtaWa text="Comenzar ahora por WhatsApp" size="lg" />
            </div>
          </div>
        </section>

        {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
        <section className="va-section va-testimonios">
          <div className="va-container">
            <h2 className="va-title">Lo que dicen nuestros pacientes</h2>
            <div className="va-testi__grid">
              {testimonios.map((t, i) => (
                <div key={i} className="va-testi-card">
                  <div className="va-testi-card__stars">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                  </div>
                  <p className="va-testi-card__texto">"{t.texto}"</p>
                  <div className="va-testi-card__autor">
                    <div className="va-testi-card__avatar">{t.nombre.charAt(0)}</div>
                    <div>
                      <strong>{t.nombre}</strong>
                      <span>{t.ciudad}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HAMAMELIS CTA ─────────────────────────────────────────────────── */}
        <section className="va-section va-hamamelis">
          <div className="va-container va-hamamelis__inner">
            <div className="va-hamamelis__content">
              <p className="va-label va-label--gold">Tratamiento complementario</p>
              <h2 className="va-title" style={{ textAlign: 'left', marginBottom: 14 }}>
                Hamamelis + Castaño de Indias
              </h2>
              <p className="va-hamamelis__desc">
                El Dr. Salazar también ha formulado un producto natural de apoyo para el tratamiento de várices.
                La combinación de <strong>Hamamelis virginica</strong> y <strong>Castaño de Indias</strong>
                complementa el tratamiento clínico, mejora la circulación y reduce la inflamación venosa.
              </p>
              <div className="va-hamamelis__btns">
                <Link to="/productos/hamamelis" className="va-btn-ver">Ver producto</Link>
                <CtaWa text="Preguntar al doctor" size="md" />
              </div>
            </div>
            <div className="va-hamamelis__img-wrap">
              <img src={hamamelisProd} alt="Hamamelis + Castaño de Indias — Tratamiento de várices" className="va-hamamelis__img" />
            </div>
          </div>
        </section>

        {/* ── COBERTURA ────────────────────────────────────────────────────── */}
        <section className="va-section va-cobertura">
          <div className="va-container">
            <h2 className="va-title va-title--light">Atendemos todo el Eje Cafetero</h2>
            <p className="va-sub va-sub--light">Consultorio en <strong style={{ color: '#c9a84c' }}>Pereira, Risaralda</strong>. Recibimos pacientes de:</p>
            <div className="va-ciudades">
              {[
                'Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Marsella',
                'Manizales', 'Chinchiná', 'Villamaría', 'Neira', 'Anserma', 'Riosucio', 'Salamina',
                'Armenia', 'Calarcá', 'Montenegro', 'Quimbaya', 'La Tebaida', 'Circasia', 'Filandia',
                'Cartago',
              ].map((c, i) => (
                <div key={i} className="va-ciudad-pill">{c}</div>
              ))}
            </div>
            <p className="va-cobertura__note">La mayoría de pacientes solo necesitan <strong>2 a 3 visitas</strong> durante todo el tratamiento.</p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="va-section va-faq">
          <div className="va-container">
            <h2 className="va-title">Preguntas frecuentes</h2>
            <div className="va-faq__list">
              {faqs.map((f, i) => (
                <details key={i} className="va-faq__item">
                  <summary className="va-faq__pregunta">{f.p}</summary>
                  <p className="va-faq__respuesta">{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

export default Varices;
