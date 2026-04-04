// Tienda.jsx - Página de tienda
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { getProducts } from '../../../services/productsService';
import { STATIC_PRODUCTS } from '../../../data/products';
import { formatPrice } from '../../../utils/formatters';
import CartDrawer from '../../../components/shop/CartDrawer/CartDrawer';
import SEO from '../../../components/common/SEO';
import './Tienda.css';

const Tienda = () => {
  const { addItem, itemCount } = useCart();
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedIds, setAddedIds] = useState([]);

  // Índice de imágenes estáticas por nombre normalizado
  const staticImageMap = STATIC_PRODUCTS.reduce((acc, p) => {
    acc[p.name.toLowerCase()] = p.image;
    return acc;
  }, {});

  useEffect(() => {
    getProducts().then(firestoreProducts => {
      if (firestoreProducts.length > 0) {
        // Si el producto de Firestore no tiene imagen válida,
        // se usa la imagen estática que coincida por nombre
        const enriched = firestoreProducts.map(p => {
          const hasValidImage = p.imageUrl && !p.imageUrl.includes('placeholder');
          const fallbackImage = staticImageMap[p.name?.toLowerCase()] ?? null;
          return {
            ...p,
            image: !hasValidImage ? fallbackImage : null,
            imageUrl: hasValidImage ? p.imageUrl : '',   // elimina la URL mala
          };
        });
        setProducts(enriched);
      }
    }).catch(() => {});
  }, []);

  const handleAddToCart = (product) => {
    addItem(product, 1);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
    setCartOpen(true);
  };

  return (
    <>
      <SEO
        title="Tienda — Productos Naturales"
        description="Compra los productos naturales del Dr. John Salazar: Prushot, Hamamelis + Castaño de Indias y EP11. Formulados con respaldo clínico. Envío a toda Colombia."
        path="/tienda"
        type="website"
      />
      <section className="tienda-section">
        {/* Header */}
        <div className="tienda-header">
          <div className="tienda-badge">
            <h1 className="tienda-title">Nuestra Tienda</h1>
          </div>
          <p className="tienda-subtitle">
            Productos naturales formulados por el <strong>Dr. John Salazar</strong> con respaldo clínico
          </p>

          {/* Botón carrito flotante */}
          <button className="tienda-cart-btn" onClick={() => setCartOpen(true)}>
            <span className="tienda-cart-icon">🛒</span>
            <span>Ver carrito</span>
            {itemCount > 0 && <span className="tienda-cart-badge">{itemCount}</span>}
          </button>
        </div>

        {/* Grid de productos */}
        <div className="tienda-grid">
          {products.map(product => (
            <article key={product.id} className="tienda-card">
              <Link to={product.link || '#'} className="tienda-card-img-link">
                <div className="tienda-card-img-wrapper">
                  {(product.image || product.imageUrl) ? (
                    <img
                      src={product.image || product.imageUrl}
                      alt={product.name}
                      className="tienda-card-img"
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="tienda-card-img-fallback">🧴</span>
                  )}
                </div>
              </Link>

              <div className="tienda-card-body">
                <h2 className="tienda-card-name">{product.name}</h2>
                <p className="tienda-card-subtitle">{product.subtitle}</p>
                <p className="tienda-card-desc">{product.description}</p>

                <div className="tienda-card-footer">
                  <span className="tienda-card-price">{formatPrice(product.price)}</span>
                  <div className="tienda-card-actions">
                    {product.link && (
                      <Link to={product.link} className="tienda-btn-secondary">
                        Ver más
                      </Link>
                    )}
                    <button
                      className={`tienda-btn-primary ${addedIds.includes(product.id) ? 'tienda-btn-added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      {addedIds.includes(product.id) ? '¡Agregado!' : product.inStock ? 'Agregar al carrito' : 'Sin stock'}
                    </button>
                    <a
                      href={`https://wa.me/573113958098?text=Hola,%20me%20interesa%20el%20producto%20*${encodeURIComponent(product.name)}*`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tienda-btn-whatsapp"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.557 4.126 1.526 5.859L.057 23.5l5.797-1.443A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 0 1-5.031-1.371l-.361-.214-3.741.981.999-3.648-.235-.374A9.86 9.86 0 0 1 2.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Tienda;
