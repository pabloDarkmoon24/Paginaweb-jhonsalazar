// productsService.js - CRUD de productos en Firestore
import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'products';

// Obtener todos los productos
export const getProducts = async () => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Crear producto
export const createProduct = async ({ name, subtitle, description, price, imageUrl, inStock = true }) => {
  const data = {
    name,
    subtitle,
    description,
    price: Number(price),
    imageUrl,
    inStock,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTION), data);
  return { id: docRef.id, ...data };
};

// Actualizar producto
export const updateProduct = async (productId, updates) => {
  const ref = doc(db, COLLECTION, productId);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
};

// Eliminar producto
export const deleteProduct = async (productId) => {
  const ref = doc(db, COLLECTION, productId);
  await deleteDoc(ref);
};
