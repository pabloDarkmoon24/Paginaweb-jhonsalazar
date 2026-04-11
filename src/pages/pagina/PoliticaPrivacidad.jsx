import SEO from '../../components/common/SEO';

export default function PoliticaPrivacidad() {
  return (
    <>
      <SEO
        title="Política de Privacidad — Dr. John Salazar"
        description="Conoce cómo el Dr. John Salazar recopila, usa y protege tus datos personales conforme a la Ley 1581 de 2012 (Colombia)."
        path="/politica-privacidad"
      />

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
          Política de Privacidad y Tratamiento de Datos
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: 40 }}>
          Última actualización: abril de 2026
        </p>

        <Section titulo="1. Responsable del tratamiento">
          <p>
            <strong>Dr. John Salazar Salazar</strong> — Médico especialista en Flebología y Medicina Biológica.<br />
            Consultorio: MegaCentro Pinares, Cl. 18 #12-75, Torre 3, Cons. 705, Pereira, Risaralda, Colombia.<br />
            Teléfono: <a href="tel:+573136497534" style={{ color: '#c9a84c' }}>+57 313 649 7534</a><br />
            Sitio web: <a href="https://drjohnsalazar.com.co" style={{ color: '#c9a84c' }}>drjohnsalazar.com.co</a>
          </p>
        </Section>

        <Section titulo="2. Marco legal">
          <p>
            Esta política se rige por la <strong>Ley 1581 de 2012</strong> (Protección de Datos Personales),
            el <strong>Decreto 1377 de 2013</strong> y demás normas aplicables en Colombia. Al utilizar
            este sitio web o contactarnos, aceptas el tratamiento de tus datos conforme a esta política.
          </p>
        </Section>

        <Section titulo="3. Datos que recopilamos">
          <p>Recopilamos los siguientes datos según la forma en que interactúas con nosotros:</p>
          <ul>
            <li><strong>Datos de contacto:</strong> nombre, número de teléfono o WhatsApp, ciudad.</li>
            <li><strong>Datos de navegación:</strong> páginas visitadas, tiempo en el sitio, dispositivo usado (mediante cookies y herramientas de analítica).</li>
            <li><strong>Datos de compra:</strong> dirección de envío, datos de pago procesados por pasarelas externas (Wompi, ePayco).</li>
            <li><strong>Datos médicos (solo si los compartes voluntariamente):</strong> síntomas, condición, consultas enviadas por WhatsApp o formulario.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            No recopilamos datos sensibles sin tu consentimiento expreso. Los datos médicos que nos compartes
            son usados exclusivamente para orientarte y nunca se ceden a terceros con fines comerciales.
          </p>
        </Section>

        <Section titulo="4. Finalidad del tratamiento">
          <ul>
            <li>Gestionar consultas y agendamiento de citas médicas.</li>
            <li>Procesar pedidos de productos naturales y coordinar envíos.</li>
            <li>Enviar información relevante sobre tratamientos o productos (solo si lo autorizas).</li>
            <li>Mejorar la experiencia del sitio web mediante analítica anónima.</li>
            <li>Cumplir obligaciones legales y contractuales.</li>
          </ul>
        </Section>

        <Section titulo="5. Cookies y herramientas de análisis">
          <p>
            Este sitio usa las siguientes herramientas que pueden instalar cookies en tu navegador:
          </p>
          <ul>
            <li><strong>Google Analytics / Google Tag Manager:</strong> analítica de visitas de forma anonimizada.</li>
            <li><strong>Meta Pixel (Facebook):</strong> medición del rendimiento de anuncios publicitarios.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Puedes desactivar las cookies en la configuración de tu navegador en cualquier momento.
            Al continuar navegando en este sitio, aceptas el uso de cookies con las finalidades descritas.
          </p>
        </Section>

        <Section titulo="6. Compartición de datos con terceros">
          <p>
            No vendemos ni cedemos tus datos personales a terceros con fines comerciales. Únicamente
            compartimos información con:
          </p>
          <ul>
            <li>Operadores logísticos para el despacho de pedidos.</li>
            <li>Pasarelas de pago (Wompi, ePayco) para procesar transacciones.</li>
            <li>Plataformas de analítica y publicidad (Google, Meta) bajo sus propias políticas de privacidad.</li>
          </ul>
        </Section>

        <Section titulo="7. Derechos del titular">
          <p>De acuerdo con la Ley 1581 de 2012, tienes derecho a:</p>
          <ul>
            <li><strong>Conocer</strong> los datos personales que tenemos sobre ti.</li>
            <li><strong>Actualizar o corregir</strong> tus datos si están incompletos o incorrectos.</li>
            <li><strong>Solicitar la supresión</strong> de tus datos cuando no sean necesarios para la finalidad del tratamiento.</li>
            <li><strong>Revocar la autorización</strong> de uso de tus datos en cualquier momento.</li>
            <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC).</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Para ejercer cualquiera de estos derechos, contáctanos directamente por WhatsApp al
            {' '}<a href="https://wa.me/573136497534" style={{ color: '#c9a84c' }}>+57 313 649 7534</a>.
          </p>
        </Section>

        <Section titulo="8. Seguridad de los datos">
          <p>
            Adoptamos medidas técnicas y administrativas razonables para proteger tus datos personales
            contra acceso no autorizado, pérdida o alteración. Los datos de pago son procesados
            íntegramente por pasarelas certificadas y nunca quedan almacenados en nuestros servidores.
          </p>
        </Section>

        <Section titulo="9. Retención de datos">
          <p>
            Conservamos tus datos durante el tiempo necesario para cumplir las finalidades descritas
            o según lo exija la ley colombiana. Los datos de contacto de pacientes se conservan por
            un mínimo de 5 años conforme a la normativa de historia clínica.
          </p>
        </Section>

        <Section titulo="10. Cambios a esta política">
          <p>
            Podemos actualizar esta política periódicamente. La versión vigente estará siempre
            disponible en <a href="https://drjohnsalazar.com.co/politica-privacidad" style={{ color: '#c9a84c' }}>drjohnsalazar.com.co/politica-privacidad</a>.
            Cambios significativos serán notificados a través del sitio web.
          </p>
        </Section>

        <Section titulo="11. Contacto">
          <ul>
            <li><strong>WhatsApp:</strong> <a href="https://wa.me/573136497534" style={{ color: '#c9a84c' }}>+57 313 649 7534</a></li>
            <li><strong>Sitio web:</strong> <a href="https://drjohnsalazar.com.co/contacto" style={{ color: '#c9a84c' }}>drjohnsalazar.com.co/contacto</a></li>
            <li><strong>Ubicación:</strong> MegaCentro Pinares, Torre 3, Cons. 705 — Pereira, Risaralda</li>
          </ul>
        </Section>
      </main>
    </>
  );
}

function Section({ titulo, children }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 10, borderBottom: '2px solid #c9a84c', paddingBottom: 6 }}>
        {titulo}
      </h2>
      <div style={{ color: '#374151', lineHeight: 1.75, fontSize: '0.95rem' }}>
        {children}
      </div>
    </section>
  );
}
