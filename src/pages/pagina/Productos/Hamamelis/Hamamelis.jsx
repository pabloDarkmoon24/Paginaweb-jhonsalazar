import HamameliHero from "./parte1/HamameliHero";
import HamameliInfo from "./parte2/HamameliInfo";
import HamameliComposicion from "./parte3/HamameliComposicion";
import HamamelisBeneficios from "./parte4/HamamelisBeneficios";
import HamameliResultados from "./parte5/HamameliResultados";
import HamameliSeguridad from "./parte6/HamameliSeguridad";
import SEO from "../../../../components/common/SEO";

const hamameliSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Hamamelis + Castaño de Indias",
  "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
  "description": "Fórmula natural a base de Hamamelis y Castaño de Indias para estimular el flujo sanguíneo y mejorar la circulación. Formulada por el Dr. John Salazar.",
  "category": "Suplemento natural",
  "url": "https://drjohnsalazar.com.co/productos/hamamelis",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "COP",
    "seller": { "@type": "Organization", "name": "Dr. John Salazar" },
  },
};

function Hamamelis() {
  return (
    <>
      <SEO
        title="Hamamelis + Castaño de Indias — Circulación Natural"
        description="Fórmula natural con Hamamelis y Castaño de Indias para estimular el flujo sanguíneo y mejorar la circulación de forma progresiva. Formulada por el Dr. John Salazar."
        path="/productos/hamamelis"
        schema={hamameliSchema}
      />
      <HamameliHero />
      <HamameliInfo />
      <HamameliComposicion />
      <HamamelisBeneficios />
      <HamameliResultados />
      <HamameliSeguridad />
    </>
  );
}

export default Hamamelis;