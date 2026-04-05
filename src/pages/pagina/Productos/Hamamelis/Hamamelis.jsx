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
  "name": "Hamamelis + Castaño de Indias Complex — Circulación y Salud Venosa",
  "sku": "HAMAMELIS-COMPLEX",
  "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
  "description": "Tratamiento natural de doble acción: cápsulas y gotas de Hamamelis virginica y Castaño de Indias. Alivia piernas pesadas, mejora la circulación venosa y ayuda a prevenir várices. Formulado por el Dr. John Salazar.",
  "image": "https://drjohnsalazar.com.co/img/hamamelis.png",
  "category": "Suplementos naturales",
  "condition": "https://schema.org/NewCondition",
  "url": "https://drjohnsalazar.com.co/productos/hamamelis",
  "offers": {
    "@type": "Offer",
    "url": "https://drjohnsalazar.com.co/productos/hamamelis",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "COP",
    "price": "95000",
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