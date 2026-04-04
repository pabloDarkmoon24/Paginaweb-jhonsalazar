// App.jsx - Componente principal de la aplicación
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';
import { General } from './pages/general';
import { Prushot } from './pages/pagina/Productos/Prushot/prushot';
import Contacto from './pages/pagina/contacto/PrushotContacto';
import Navbar from './pages/pagina/navbar/navbar';
import { EP11 } from './pages/pagina/Productos/EP11/EP11.jsx';
import Footer from './pages/pagina/footer/Footer';
import Hamamelis from './pages/pagina/Productos/Hamamelis/Hamamelis';
import Tienda from './pages/pagina/tienda/Tienda';
import Checkout from './pages/pagina/checkout/Checkout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ContraEntrega from './pages/admin/contraentrega/ContraEntrega';
import VentasWompi from './pages/admin/ventas/VentasWompi';
import Leads from './pages/admin/leads/Leads';
import AdminProductos from './pages/admin/productos/AdminProductos';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import usePageTracking from './hooks/usePageTracking';

// Componente interno para controlar Navbar/Footer según ruta
const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  usePageTracking();

  return (
    <>
      <ScrollToTop />
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