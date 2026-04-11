import { useEffect } from "react";
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
  "@graph": [
    {
      "@type": "Product",
      "name": "Prushot — Suplemento Natural Energizante y Coadyuvante del Bienestar",
      "sku": "PRUSHOT-500",
      "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
      "description": "Suplemento líquido natural de 500 ml (25 porciones). Formulado con Borojó, Chontaduro, Maca, Guaraná, Té verde y Vitaminas del complejo B. Aprobado por INVIMA. Combate el cansancio, el bajo deseo sexual y la falta de energía. Sin químicos ni dependencia.",
      "image": "https://drjohnsalazar.com.co/img/prushot.png",
      "category": "Suplementos naturales",
      "condition": "https://schema.org/NewCondition",
      "url": "https://drjohnsalazar.com.co/productos/prushot",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "5"
      },
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
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Para qué sirve PRUSHOT?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PRUSHOT es un energizante y estimulante natural formulado para combatir el cansancio crónico, aumentar la vitalidad, mejorar el rendimiento físico y estimular el deseo sexual de forma natural. Está basado en plantas como Borojó, Chontaduro y Maca, con respaldo de la Medicina Biológica.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Sirve para el bajo deseo sexual?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. PRUSHOT actúa como regulador hormonal suave y estimulante del deseo sexual tanto en hombres como en mujeres. Sus ingredientes como la Maca y el Borojó tienen propiedades reconocidas para mejorar la libido y el bienestar emocional de forma progresiva y sin efectos secundarios.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Tiene cafeína o estimulantes químicos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PRUSHOT contiene Guaraná y Té verde como fuentes naturales de energía, que tienen una acción más suave y progresiva que la cafeína aislada. No contiene estimulantes químicos, anabolizantes ni sustancias prohibidas. Es aprobado por INVIMA.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Lo pueden tomar las mujeres?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. PRUSHOT está formulado para hombres y mujeres adultos. Sus efectos energizantes, hormonales y de bienestar emocional aplican para ambos sexos. No está indicado para mujeres embarazadas o en período de lactancia.",
          },
        },
        {
          "@type": "Question",
          "name": "¿En cuánto tiempo se siente el efecto?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Muchas personas reportan una mejora en energía y bienestar desde la primera semana. El efecto sobre el deseo sexual y el equilibrio hormonal es progresivo y se potencia con el uso continuo durante 4 a 8 semanas.",
          },
        },
        {
          "@type": "Question",
          "name": "¿El envío llega a toda Colombia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. Hacemos envíos a todo el territorio colombiano con entrega estimada de 3 a 7 días hábiles y envío completamente gratis.",
          },
        },
      ],
    },
  ],
};

export function Prushot() {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_ids:  ['PRUSHOT-500'],
        content_name: 'PRUSHOT',
        content_type: 'product',
        value:        120000,
        currency:     'COP',
      });
    }
  }, []);

  return (
    <>
      <SEO
        title="Prushot — Energizante Natural para Cansancio, Vitalidad y Deseo Sexual"
        description="¿Cansancio, falta de energía o bajo deseo sexual? PRUSHOT es un energizante 100% natural con Borojó, Maca y Chontaduro. Sin químicos, sin dependencia. Aprobado por INVIMA. Formulado por el Dr. John Salazar. Envío gratis a Colombia."
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
