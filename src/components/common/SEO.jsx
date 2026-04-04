import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://drjohnsalazar.com.co'; // ⚠️ Actualiza con el dominio real
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const SEO = ({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
}) => {
  const fullTitle = title
    ? `${title} | Dr. John Salazar`
    : 'Dr. John Salazar — Medicina Biológica y Productos Naturales';
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Básico */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:site_name" content="Dr. John Salazar" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Datos estructurados (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
