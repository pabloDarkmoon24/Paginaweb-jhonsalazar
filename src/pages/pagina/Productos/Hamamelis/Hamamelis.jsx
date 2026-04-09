import { useEffect } from "react";
import HamameliHero from "./parte1/HamameliHero";
import HamameliInfo from "./parte2/HamameliInfo";
import HamameliComposicion from "./parte3/HamameliComposicion";
import HamamelisBeneficios from "./parte4/HamamelisBeneficios";
import HamameliResultados from "./parte5/HamameliResultados";
import HamameliSeguridad from "./parte6/HamameliSeguridad";
import SEO from "../../../../components/common/SEO";

const hamameliSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "name": "Hamamelis + Castaño de Indias Complex — Circulación y Salud Venosa",
      "sku": "HAMAMELIS-COMPLEX",
      "brand": { "@type": "Brand", "name": "Dr. John Salazar" },
      "description": "Tratamiento natural de doble acción: cápsulas y gotas de Hamamelis virginica y Castaño de Indias. Alivia piernas pesadas, várices, retención de líquidos e inflamación. Mejora la circulación venosa y el retorno venoso. Formulado por el Dr. John Salazar, especialista en Flebología.",
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
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Sirve para eliminar las várices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hamamelis + Castaño de Indias es un tratamiento de apoyo para la salud venosa. Fortalece las paredes de las venas, mejora el retorno venoso y reduce la progresión de las várices. No es un procedimiento quirúrgico, pero actúa desde el interior del cuerpo para mejorar la circulación y aliviar los síntomas asociados como pesadez, dolor e inflamación.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Para qué sirve el Hamamelis con Castaño de Indias?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Es un complejo natural formulado para mejorar la circulación venosa, aliviar piernas pesadas, reducir la inflamación, combatir la retención de líquidos y fortalecer las venas. Está especialmente indicado para personas con problemas de retorno venoso, várices, úlceras varicosas o insuficiencia venosa.",
          },
        },
        {
          "@type": "Question",
          "name": "¿En cuánto tiempo se ven resultados para las piernas pesadas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Los primeros resultados en alivio de pesadez y mejora de la circulación suelen percibirse entre la segunda y cuarta semana de uso continuo. Para una mejora significativa en la salud venosa se recomienda un tratamiento de al menos 2 a 3 meses.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Pueden tomarlo personas con hipertensión o enfermedades crónicas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Al ser un producto de origen natural, es generalmente bien tolerado. Sin embargo, se recomienda consultar con el médico tratante antes de iniciar cualquier suplemento si se padece hipertensión, enfermedades cardíacas o se toman anticoagulantes.",
          },
        },
        {
          "@type": "Question",
          "name": "¿Tiene efectos secundarios?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hamamelis + Castaño de Indias es un suplemento natural sin efectos secundarios conocidos cuando se usa según las indicaciones. No genera dependencia ni interacciones con la mayoría de medicamentos.",
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

function Hamamelis() {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_ids:  ['HAMAMELIS-COMPLEX'],
        content_name: 'Hamamelis + Castaño de Indias',
        content_type: 'product',
        value:        95000,
        currency:     'COP',
      });
    }
  }, []);

  return (
    <>
      <SEO
        title="Hamamelis + Castaño de Indias — Tratamiento Natural para Várices y Circulación"
        description="¿Piernas pesadas, várices o mala circulación? Hamamelis + Castaño de Indias fortalece las venas, mejora el retorno venoso y alivia la inflamación. Formulado por el Dr. John Salazar, flebólogo. Envío gratis a Colombia."
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
