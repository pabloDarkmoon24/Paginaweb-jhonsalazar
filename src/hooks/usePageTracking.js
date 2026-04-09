// usePageTracking.js - Registra cada navegación de página
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { recordVisit } from '../services/visitsService';

const TRACKED_PAGES = {
  '/':                    'Inicio',
  '/tienda':              'Tienda',
  '/productos/prushot':   'Producto - PRUSHOT',
  '/productos/hamamelis': 'Producto - Hamamelis',
  '/productos/ep11':      'Producto - EP11',
  '/contacto':            'Contacto',
  '/checkout':            'Checkout',
};

const usePageTracking = () => {
  const location  = useLocation();
  const lastPath  = useRef(null); // evita doble registro por re-render

  useEffect(() => {
    const pageName = TRACKED_PAGES[location.pathname];
    if (!pageName) return;

    // Solo registrar si la ruta realmente cambió
    if (lastPath.current === location.pathname) return;
    lastPath.current = location.pathname;

    recordVisit(pageName).catch(() => {});

    // Meta Pixel — PageView en cada navegación de la SPA
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);
};

export default usePageTracking;
