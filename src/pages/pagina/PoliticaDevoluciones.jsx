import SEO from '../../components/common/SEO';

export default function PoliticaDevoluciones() {
  return (
    <>
      <SEO
        title="Política de Devoluciones — Dr. John Salazar"
        description="Conoce nuestra política de devoluciones y cambios para productos naturales del Dr. John Salazar. Devoluciones aceptadas hasta 15 días después de la compra."
        path="/politica-devoluciones"
      />

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>
          Política de Devoluciones
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: 40 }}>
          Última actualización: abril de 2026
        </p>

        <Section titulo="1. Plazo para devoluciones">
          <p>
            Aceptamos devoluciones dentro de los <strong>15 días calendario</strong> siguientes
            a la fecha de entrega del producto. Pasado este plazo no se podrán procesar
            devoluciones ni cambios.
          </p>
        </Section>

        <Section titulo="2. Condiciones del producto">
          <p>Para que una devolución sea aceptada, el producto debe:</p>
          <ul>
            <li>Estar en su empaque original, sin abrir y sin daños.</li>
            <li>No haber sido usado ni consumido.</li>
            <li>Estar acompañado de la factura o comprobante de compra.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            No se aceptan devoluciones de productos que hayan sido abiertos,
            parcialmente consumidos o que presenten signos de manipulación.
          </p>
        </Section>

        <Section titulo="3. Motivos válidos para devolución">
          <ul>
            <li>Producto recibido con defecto de fabricación o en mal estado.</li>
            <li>Producto diferente al solicitado (error en el pedido por nuestra parte).</li>
            <li>Producto recibido con fecha de vencimiento próxima (menos de 3 meses).</li>
            <li>Arrepentimiento de compra dentro del plazo de 15 días (producto sin abrir).</li>
          </ul>
        </Section>

        <Section titulo="4. Proceso de devolución">
          <ol>
            <li>
              Contáctanos al <strong>+57 311 3958098</strong> o escríbenos a través de la
              página web indicando el motivo de la devolución y el número de tu pedido.
            </li>
            <li>
              Te enviaremos las instrucciones para el envío de devolución. Los gastos de
              envío en devoluciones por defecto de producto corren por nuestra cuenta.
            </li>
            <li>
              Una vez recibido e inspeccionado el producto, procesaremos el reembolso o
              cambio en un plazo máximo de <strong>5 días hábiles</strong>.
            </li>
          </ol>
        </Section>

        <Section titulo="5. Reembolsos">
          <p>
            Los reembolsos se realizan por el mismo medio de pago utilizado en la compra.
            En caso de pago contra entrega, el reembolso se realizará mediante transferencia
            bancaria a la cuenta que nos indiques.
          </p>
          <p style={{ marginTop: 12 }}>
            El plazo de acreditación depende de la entidad financiera y puede tomar entre
            3 y 10 días hábiles adicionales.
          </p>
        </Section>

        <Section titulo="6. Cambios">
          <p>
            Si deseas cambiar un producto por otra referencia, aplican las mismas condiciones
            de la devolución. Si el nuevo producto tiene un valor diferente, se cobrará o
            reembolsará la diferencia.
          </p>
        </Section>

        <Section titulo="7. Productos no sujetos a devolución">
          <ul>
            <li>Productos con sello de higiene roto o empaque abierto.</li>
            <li>Productos con fecha de vencimiento vigente mayor a 3 meses que fueron abiertos.</li>
            <li>Compras realizadas con más de 15 días de antigüedad.</li>
          </ul>
        </Section>

        <Section titulo="8. Contacto">
          <p>
            Para cualquier consulta sobre devoluciones o cambios, comunícate con nosotros:
          </p>
          <ul>
            <li>
              <strong>WhatsApp / Teléfono:</strong>{' '}
              <a href="https://wa.me/573113958098" style={{ color: '#dc2626' }}>
                +57 311 3958098
              </a>
            </li>
            <li>
              <strong>Sitio web:</strong>{' '}
              <a href="https://drjohnsalazar.com.co/contacto" style={{ color: '#dc2626' }}>
                drjohnsalazar.com.co/contacto
              </a>
            </li>
            <li><strong>Ubicación:</strong> Pereira, Colombia</li>
          </ul>
        </Section>
      </main>
    </>
  );
}

function Section({ titulo, children }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 10, borderBottom: '2px solid #fca5a5', paddingBottom: 6 }}>
        {titulo}
      </h2>
      <div style={{ color: '#374151', lineHeight: 1.75, fontSize: '0.95rem' }}>
        {children}
      </div>
    </section>
  );
}
