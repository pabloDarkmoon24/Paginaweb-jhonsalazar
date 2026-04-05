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
  "name": "EP11 — Energía, Memoria y Vitalidad Natural",
  "sku": "EP11-500",
  "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
  "description": "Suplemento líquido natural de 500 ml. Formulado con Maca, Chontaduro, Borojó, Colágeno hidrolizado y Vitaminas. Combate el cansancio, mejora la memoria, fortalece piel, cabello y uñas. Sin azúcar ni cafeína, apto para diabéticos e hipertensos.",
  "image": "https://drjohnsalazar.com.co/img/ep11.png",
  "category": "Suplementos naturales",
  "condition": "https://schema.org/NewCondition",
  "url": "https://drjohnsalazar.com.co/productos/ep11",
  "offers": {
    "@type": "Offer",
    "url": "https://drjohnsalazar.com.co/productos/ep11",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "COP",
    "price": "110000",
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
