import EP11Hero from "./parte1/EP11Hero";
import EP11Info from "./parte2/EP11Info";
import EP11Composicion from "./parte3/EP11Composicion";
import EP11Mecanismo from "./parte4/EP11Mecanismo";
import EP11Beneficios from "./parte5/EP11Beneficios";
import EP11Seguridad from "./parte6/EP11Seguridad";
import SEO from "../../../../components/common/SEO";

const ep11Schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "EP11 — Energía, Memoria y Vitalidad",
  "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
  "description": "EP11: suplemento natural que combate el cansancio físico y mental, fortalece piel, cabello y uñas. Formulado por el Dr. John Salazar.",
  "category": "Suplemento natural",
  "url": "https://drjohnsalazar.com.co/productos/ep11",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "COP",
    "seller": { "@type": "Organization", "name": "Dr. John Salazar" },
  },
};

export function EP11() {
  return (
    <>
      <SEO
        title="EP11 — Energía, Memoria y Vitalidad Natural"
        description="EP11: suplemento natural que combate el cansancio físico y mental, mejora la memoria, fortalece piel, cabello y uñas. Formulado por el Dr. John Salazar."
        path="/productos/ep11"
        schema={ep11Schema}
      />
      <EP11Hero />
      <EP11Info />
      <EP11Composicion />
      <EP11Mecanismo />
      <EP11Beneficios />
      <EP11Seguridad />
    </>
  );
}
