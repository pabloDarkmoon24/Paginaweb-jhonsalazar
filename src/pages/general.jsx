import { Home } from "./pagina/home/home";
import SEO from "../components/common/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://drjohnsalazar.com.co/#doctor",
      "name": "Dr. John Salazar",
      "jobTitle": "Médico especialista en Medicina Biológica y Flebología",
      "description": "Médico colombiano especializado en Medicina Biológica y Flebología. Formulador de productos naturales con respaldo clínico.",
      "url": "https://drjohnsalazar.com.co",
      "sameAs": [],
    },
    {
      "@type": "MedicalBusiness",
      "@id": "https://drjohnsalazar.com.co/#consultorio",
      "name": "Consultorio Dr. John Salazar",
      "description": "Consulta médica especializada en Medicina Biológica y Flebología. Productos naturales con respaldo clínico.",
      "url": "https://drjohnsalazar.com.co",
      "telephone": "+573113958098",
      "priceRange": "$$",
      "medicalSpecialty": ["Flebología", "Medicina Biológica"],
    },
    {
      "@type": "WebSite",
      "@id": "https://drjohnsalazar.com.co/#website",
      "url": "https://drjohnsalazar.com.co",
      "name": "Dr. John Salazar — Medicina Biológica y Productos Naturales",
      "description": "Ciencia natural aplicada al bienestar humano. Productos naturales formulados por el Dr. John Salazar con respaldo clínico.",
      "inLanguage": "es-CO",
    },
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