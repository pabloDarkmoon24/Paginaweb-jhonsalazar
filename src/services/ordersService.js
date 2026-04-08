// ordersService.js - CRUD de órdenes en Firestore
import {
  collection, addDoc, getDocs, doc, updateDoc,
  query, orderBy, where, serverTimestamp, getDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { generateOrderNumber } from '../utils/formatters';

const COLLECTION = 'orders';

// Crear orden (epayco, wompi o contra entrega)
export const createOrder = async ({ customer, items, total, paymentMethod, wompiTransactionId = null }) => {
  const orderData = {
    orderNumber: generateOrderNumber(),
    paymentMethod, // 'epayco' | 'wompi' | 'contra_entrega'
    status: 'pending',
    customer,
    items,
    total,
    wompiTransactionId,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, COLLECTION), orderData);
  return { id: docRef.id, ...orderData };
};

// Obtener todas las órdenes (admin)
export const getAllOrders = async () => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Obtener órdenes por método de pago
export const getOrdersByPaymentMethod = async (paymentMethod) => {
  const q = query(
    collection(db, COLLECTION),
    where('paymentMethod', '==', paymentMethod),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Actualizar estado de una orden
export const updateOrderStatus = async (orderId, status) => {
  const ref = doc(db, COLLECTION, orderId);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
};

// Obtener una orden por ID
export const getOrderById = async (orderId) => {
  const ref = doc(db, COLLECTION, orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

// Obtener una orden por número de orden
export const getOrderByOrderNumber = async (orderNumber) => {
  const q = query(collection(db, COLLECTION), where('orderNumber', '==', orderNumber));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() };
};
