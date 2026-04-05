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
  "name": "Prushot — Suplemento Natural Energizante y Coadyuvante del Bienestar",
  "sku": "PRUSHOT-500",
  "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
  "description": "Suplemento líquido natural de 500 ml (25 porciones). Formulado con Borojó, Chontaduro, Maca, Guaraná, Té verde y Vitaminas del complejo B. Aprobado por INVIMA. Coadyuvante del bienestar físico y hormonal: contribuye a mejorar la vitalidad, el rendimiento físico y el equilibrio hormonal de forma natural.",
  "image": "https://drjohnsalazar.com.co/img/prushot.png",
  "category": "Suplementos naturales",
  "condition": "https://schema.org/NewCondition",
  "url": "https://drjohnsalazar.com.co/productos/prushot",
  "offers": {
    "@type": "Offer",
    "url": "https://drjohnsalazar.com.co/productos/prushot",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "COP",
    "price": "120000",
    "priceValidUntil": "2026-12-31",
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "CO",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 15,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn",
      "url": "https://drjohnsalazar.com.co/politica-devoluciones",
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "COP" },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "CO" },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" },
        "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 5, "unitCode": "DAY" },
      },
    },
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

