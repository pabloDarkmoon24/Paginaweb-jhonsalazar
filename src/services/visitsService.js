// visitsService.js - Registro de visitas y navegación
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'visits';

export const recordVisit = async (page) => {
  await addDoc(collection(db, COLLECTION), {
    page,
    referrer:  document.referrer || 'directo',
    createdAt: serverTimestamp(),
  });
};

export const getAllVisits = async () => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};
