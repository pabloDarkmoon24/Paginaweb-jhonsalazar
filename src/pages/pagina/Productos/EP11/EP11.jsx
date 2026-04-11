import { useEffect } from "react";
import EP11Hero from "./parte1/EP11Hero";
import EP11Info from "./parte2/EP11Info";
import EP11Composicion from "./parte3/EP11Composicion";
import EP11Mecanismo from "./parte4/EP11Mecanismo";
import EP11Beneficios from "./parte5/EP11Beneficios";
import EP11Seguridad from "./parte6/EP11Seguridad";
import SEO from "../../../../components/common/SEO";

const ep11Schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "name": "EP11 — Energía, Memoria y Vitalidad Natural",
      "sku": "EP11-500",
      "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
      "description": "Suplemento líquido natural de 500 ml. Formulado con Maca, Chontaduro, Borojó, Colágeno hidrolizado y Vitaminas. Combate el cansancio crónico, mejora la memoria y la concentración, fortalece piel, cabello y uñas. Sin azúcar ni cafeína, apto para diabéticos e hipertensos.",
      "image": "https://drjohnsalazar.com.co/img/ep11.png",
      "category": "Suplementos naturales",
      "condition": "https://schema.org/NewCondition",
      "url": "https://drjohnsalazar.com.co/productos/ep11",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "5"
      },
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
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Para qué sirve EP11?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EP11 es un suplemento natural de uso diario formulado para combatir el agotamiento físico y mental, mejorar la memoria y la concentración, fortalecer la piel, el cabello y las uñas, y apoyar el sistema inmunológico. Contiene Colágeno hidrolizado, Maca, Borojó, Chontaduro y Vitaminas del complejo B.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Ayuda con la pérdida de memoria y la falta de concentración?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. EP11 está formulado con ingredientes que actúan sobre la función cognitiva y el sistema nervioso. Sus componentes como la Maca y las Vitaminas del complejo B contribuyen a mejorar la memoria, la concentración y el rendimiento mental, especialmente en personas con jornadas exigentes o estrés crónico.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Es apto para diabéticos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. EP11 está formulado sin azúcar ni edulcorantes artificiales, lo que lo hace apto para personas con diabetes. También es seguro para hipertensos. Se recomienda informar al médico tratante antes de iniciar cualquier suplemento.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Tiene cafeína?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. EP11 no contiene cafeína ni estimulantes del sistema nervioso central. Su efecto energizante es progresivo y proviene de fuentes naturales como la Maca y los adaptógenos vegetales.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Sirve para el cansancio crónico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí. EP11 está especialmente indicado para personas que experimentan cansancio físico y mental persistente, desgaste por estrés, jornadas laborales exigentes o recuperación física. Sus ingredientes actúan a nivel celular para restaurar la energía de forma progresiva.",
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

export function EP11() {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_ids:  ['EP11-500'],
        content_name: 'EP11',
        content_type: 'product',
        value:        110000,
        currency:     'COP',
      });
    }
  }, []);

  return (
    <>
      <SEO
        title="EP11 — Suplemento Natural para Cansancio, Memoria y Vitalidad"
        description="¿Cansancio crónico, falta de memoria o agotamiento mental? EP11 activa tu energía, mejora la concentración y fortalece piel, cabello y uñas. Sin azúcar ni cafeína, apto para diabéticos. Formulado por el Dr. John Salazar. Envío gratis a Colombia."
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
