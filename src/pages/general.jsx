import { Home } from "./pagina/home/home";
import SEO from "../components/common/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://drjohnsalazar.com.co/#doctor",
      "name": "Dr. John Salazar Salazar",
      "alternateName": "Dr. John Salazar",
      "jobTitle": "Médico Cirujano — Especialista en Flebología y Medicina Biológica",
      "description": "Médico Cirujano graduado de la UNERG, con especializaciones en Terapias Alternativas y Farmacología Vegetal (Juan N. Corpas) y formación internacional en Flebología, Ecodoppler y Láser Endovascular en México, Brasil y Venezuela. Ejerce en Pereira, Risaralda, combinando técnicas vasculares de precisión con Medicina Biológica.",
      "url": "https://drjohnsalazar.com.co",
      "telephone": "+573203264883",
      "email": "johnsalasmedico@gmail.com",
      "image": "https://drjohnsalazar.com.co/img/Foto-Dr-John-Salazar.png",
      "gender": "Male",
      "nationality": "Colombian",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Médico Cirujano",
          "educationalLevel": "Pregrado",
          "recognizedBy": { "@type": "Organization", "name": "Universidad Nacional Experimental Rómulo Gallegos (UNERG)" },
          "dateCreated": "2015"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "postdoctorate",
          "name": "Especialista en Terapias Alternativas y Farmacología Vegetal",
          "educationalLevel": "Especialización médico-quirúrgica",
          "recognizedBy": { "@type": "Organization", "name": "Universidad Juan N. Corpas" },
          "dateCreated": "2022"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certificate",
          "name": "Diplomado en Ecodoppler del Sistema Vascular",
          "recognizedBy": { "@type": "Organization", "name": "Cedum Academy — Caracas, Venezuela" },
          "dateCreated": "2023"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certificate",
          "name": "Diplomado en Flebología",
          "recognizedBy": { "@type": "Organization", "name": "Instituto Mexicano de Flebología" },
          "dateCreated": "2024"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certificate",
          "name": "Diplomado en Ecografía y Espuma Ecoguiada",
          "recognizedBy": { "@type": "Organization", "name": "Eccos Brazil" },
          "dateCreated": "2025"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "certificate",
          "name": "Diplomado en Láser Endovascular y Estético",
          "recognizedBy": { "@type": "Organization", "name": "Eccos Brazil" },
          "dateCreated": "2025"
        }
      ],
      "sameAs": [
        "https://drjohnsalazar.com.co",
        "https://www.facebook.com/DoctorJohnSalazar",
        "https://www.instagram.com/drjohnsalazar07/"
      ],
      "worksFor": { "@id": "https://drjohnsalazar.com.co/#consultorio" }
    },
    {
      "@type": "MedicalBusiness",
      "@id": "https://drjohnsalazar.com.co/#consultorio",
      "name": "Consultorio Dr. John Salazar",
      "description": "Consultorio médico especializado en Flebología, Medicina Biológica y Medicina Estética. Tratamiento de várices con ecodoppler, espuma ecoguiada y láser endovascular. Productos naturales con aprobación INVIMA. Atención en Pereira y plataforma digital nacional.",
      "url": "https://drjohnsalazar.com.co",
      "telephone": "+573203264883",
      "priceRange": "$$",
      "image": "https://drjohnsalazar.com.co/img/Foto-Dr-John-Salazar.png",
      "medicalSpecialty": [
        "Flebología",
        "Angiología",
        "Medicina Biológica",
        "Medicina Estética",
        "Farmacología Vegetal"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "5"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pereira",
        "addressRegion": "Risaralda",
        "addressCountry": "CO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 4.8044055,
        "longitude": -75.6902629
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/DoctorJohnSalazar",
        "https://www.instagram.com/drjohnsalazar07/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://drjohnsalazar.com.co/#website",
      "url": "https://drjohnsalazar.com.co",
      "name": "Dr. John Salazar — Medicina Biológica y Productos Naturales",
      "description": "Ciencia natural aplicada al bienestar humano. Productos naturales formulados por el Dr. John Salazar con respaldo clínico.",
      "inLanguage": "es-CO",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://drjohnsalazar.com.co/tienda?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ],
};

export function General() {
  return (
    <>
      <SEO
        description="Ciencia natural aplicada al bienestar humano. Productos naturales formulados por el Dr. John Salazar, especialista en Medicina Biológica y Flebología."
        path="/"
        schema={homeSchema}
      />
      <Home />
    </>
  );
}