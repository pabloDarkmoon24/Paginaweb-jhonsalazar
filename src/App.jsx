// App.jsx - Componente principal de la aplicación
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';

// Insignia Google Customer Reviews (aparece en todas las páginas públicas)
const GoogleMerchantBadge = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'merchantWidgetScript';
    script.src = 'https://www.gstatic.com/shopping/merchant/merchantwidget.js';
    script.defer = true;
    script.addEventListener('load', () => {
      if (window.merchantwidget) {
        window.merchantwidget.start({
          merchant_id: 5760217929,
          position:    'BOTTOM_RIGHT',
        });
      }
    });
    document.body.appendChild(script);
    return () => {
      const existing = document.getElementById('merchantWidgetScript');
      if (existing) document.body.removeChild(existing);
    };
  }, []);
  return null;
};
import { General } from './pages/general';
import { Prushot } from './pages/pagina/Productos/Prushot/prushot';
import Contacto from './pages/pagina/contacto/PrushotContacto';
import Navbar from './pages/pagina/navbar/navbar';
import { EP11 } from './pages/pagina/Productos/EP11/EP11.jsx';
import Footer from './pages/pagina/footer/Footer';
import Hamamelis from './pages/pagina/Productos/Hamamelis/Hamamelis';
import Tienda from './pages/pagina/tienda/Tienda';
import Checkout from './pages/pagina/checkout/Checkout';
import ConfirmacionEpayco from './pages/pagina/checkout/ConfirmacionEpayco';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ContraEntrega from './pages/admin/contraentrega/ContraEntrega';
import VentasWompi from './pages/admin/ventas/VentasWompi';
import Leads from './pages/admin/leads/Leads';
import AdminProductos from './pages/admin/productos/AdminProductos';
import ProtectedRoute from './components/common/ProtectedRoute';
import PoliticaDevoluciones from './pages/pagina/PoliticaDevoluciones';
import PoliticaPrivacidad from './pages/pagina/PoliticaPrivacidad';
import ScrollToTop from './components/common/ScrollToTop';
import usePageTracking from './hooks/usePageTracking';
import Varices from './pages/pagina/varices/Varices';
import WhatsAppButton from './components/common/WhatsAppButton';

// Determina el contexto del botón WhatsApp según la ruta actual
const waContext = (pathname) => {
  if (pathname.startsWith('/varices'))           return 'varices';
  if (pathname.startsWith('/productos/prushot')) return 'prushot';
  if (pathname.startsWith('/productos/hamamelis')) return 'hamamelis';
  if (pathname.startsWith('/productos/ep11'))    return 'ep11';
  return 'default';
};

// Componente interno para controlar Navbar/Footer según ruta
const AppContent = () => {
  const location = useLocation();
  const isAdmin   = location.pathname.startsWith('/admin');
  const isVarices = location.pathname === '/varices';
  usePageTracking();

  return (
    <>
      <ScrollToTop />
      {/* {!isAdmin && !isVarices && <GoogleMerchantBadge />} */}
      {!isAdmin && <Navbar />}
      <div className={isAdmin ? '' : 'App'}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<General />} />
          <Route path="/productos/prushot" element={<Prushot />} />
          <Route path="/productos/hamamelis" element={<Hamamelis />} />
          <Route path="/productos/ep11" element={<EP11 />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/confirmacion" element={<ConfirmacionEpayco />} />
          <Route path="/politica-devoluciones" element={<PoliticaDevoluciones />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/varices" element={<Varices />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin protegido */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="contra-entrega" element={<ContraEntrega />} />
            <Route path="ventas" element={<VentasWompi />} />
            <Route path="leads" element={<Leads />} />
            <Route path="productos" element={<AdminProductos />} />
          </Route>
        </Routes>
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton context={waContext(location.pathname)} />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;