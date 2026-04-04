// Cart Context
// Maneja el estado del carrito de compras con persistencia en localStorage

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shopping-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch {
      localStorage.removeItem('shopping-cart');
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('shopping-cart', JSON.stringify(items));
    } catch {
    }
  }, [items]);

  // Agregar producto al carrito
  const addItem = (product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity }];
    });
  };

  // Remover producto del carrito
  const removeItem = (productId) => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Limpiar carrito completamente
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('shopping-cart');
  };

  // Calcular total del carrito
  const total = items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  // Contar items totales (considerando cantidades)
  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity, 
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isEmpty: items.length === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};