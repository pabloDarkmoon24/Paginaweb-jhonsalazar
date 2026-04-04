import PrushotHero from "./parte1/PrushotHero";
import PrushotInfo from "./parte2/PrushotInfo";
import PrushotComposicion from "./parte3/PrushotComposicion";
import PrushotMecanismo from "./parte4/PrushotMecanismo";
import PrushotBeneficios from "./parte5/PrushotBeneficios";
import PrushotBeneficiosCards from "./parte6/PrushotBeneficiosCards";
import PrushotSeguridad from "./parte7/PrushotSeguridad";
import SEO from "../../../../components/common/SEO";

const prushotSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Prushot",
  "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
  "description": "Suplemento natural para energía real, rendimiento y deseo natural. Sin químicos, formulado por el Dr. John Salazar.",
  "category": "Suplemento natural",
  "url": "https://drjohnsalazar.com.co/productos/prushot",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "COP",
    "seller": { "@type": "Organization", "name": "Dr. John Salazar" },
  },
};

export function Prushot() {
  return (
    <>
      <SEO
        title="Prushot — Energía y Vitalidad Natural"
        description="Prushot: suplemento natural para energía real, rendimiento sin químicos y deseo natural. Formulado por el Dr. John Salazar, especialista en Medicina Biológica."
        path="/productos/prushot"
        schema={prushotSchema}
      />
      <PrushotHero />
      <PrushotInfo />
      <PrushotComposicion />
      <PrushotMecanismo />
      <PrushotBeneficios />
      <PrushotBeneficiosCards />
      <PrushotSeguridad />
    </>
  );
}

