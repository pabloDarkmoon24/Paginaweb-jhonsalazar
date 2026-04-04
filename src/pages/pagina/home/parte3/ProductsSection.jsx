// ProductsSection.jsx - Sección de Productos
import { Link } from 'react-router-dom';
import './ProductsSection.css';
import product1 from '../../../../assets/Home/Producto-1.png';
import product2 from '../../../../assets/Home/Producto-2.png';
import product3 from '../../../../assets/Home/Producto-3.png';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      number: '1.',
      image: product1,
      name: 'PRUSHOT',
      subtitle: 'Energía, Deseo y Vitalidad.',
      description: 'El impulso que tu cuerpo y mente estaban esperando. Un energizante y afrodisíaco natural que optimiza tu respuesta hormonal y física sin efectos secundarios.',
      link: '/productos/prushot'
    },
    {
      id: 2,
      number: '2.',
      image: product2,
      name: 'HAMAMELIS + CASTAÑO DE INDIAS',
      subtitle: 'Ligereza y Salud Venosa.',
      description: 'Tratamiento de doble acción para transformar la salud de tus piernas. Alivia el dolor, reduce várices y fortalece la circulación desde el interior hacia afuera.',
      link: '/productos/hamamelis'
    },
    {
      id: 3,
      number: '3.',
      image: product3,
      name: 'EP11',
      subtitle: 'Mente Despierta y Cuerpo Vital.',
      description: 'Combate el agotamiento físico y mental. Formulado con colágeno y adaptógenos, EP11 activa tu memoria, protege tu piel y fortalece tu sistema inmunológico.',
      link: '/productos/ep11'
    }
  ];

  return (
    <section className="products-section">
      <div className="products-container">
        {/* Encabezado */}
        <div className="products-header">
          <div className="products-header-badge">
            <h2 className="products-badge-text">
              Soluciones Naturales con<br />Resultados Clínicos
            </h2>
          </div>
          
          <p className="products-intro">
            Tras años de investigación y práctica clínica, <strong>el Dr. John Salazar 
            ha formulado tres productos estrella</strong> diseñados para transformar tu 
            calidad de vida:
          </p>
        </div>

        {/* Lista de Productos */}
        <div className="products-list">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              
              {/* COLUMNA 1: Imagen y Botones */}
              <div className="product-left">
                
                {/* Imagen */}
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={`${product.name} - ${product.subtitle}`}
                    className="product-image"
                  />
                </div>

                {/* Botones FUERA del wrapper, como hermano */}
                <div className="product-buttons">
                  <Link to={product.link} className="product-btn product-btn-secondary">
                    Ver más
                  </Link>
                  <Link to="/tienda" className="product-btn product-btn-primary">
                    Comprar ahora
                  </Link>
                </div>
              </div>

              {/* COLUMNA 2: Contenido de texto */}
              <div className="product-right">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-subtitle">{product.subtitle}</p>
                <p className="product-description">{product.description}</p>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;