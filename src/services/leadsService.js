// leadsService.js - Leads y solicitudes de cita en Firestore
import {
  collection, addDoc, getDocs, doc, updateDoc,
  query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION = 'leads';

const getUtms = () => {
  const params = new URLSearchParams(window.location.search);
  const utms = {};
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => {
    const v = params.get(k);
    if (v) utms[k] = v;
  });
  return utms;
};

// Guardar lead desde formulario de contacto
export const createLead = async ({ nombres, apellidos, correo, telefono, asunto }) => {
  const data = {
    type: 'contact',
    name: `${nombres} ${apellidos}`,
    email: correo,
    phone: telefono,
    subject: asunto,
    status: 'pending',
    source: 'form',
    utms: getUtms(),
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTION), data);
  return { id: docRef.id, ...data };
};

// Guardar solicitud de cita
export const createAppointment = async ({ name, email, phone, message }) => {
  const data = {
    type: 'appointment',
    name,
    email,
    phone,
    message,
    status: 'pending',
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, COLLECTION), data);
  return { id: docRef.id, ...data };
};

// Obtener todos los leads (admin)
export const getAllLeads = async () => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};

// Actualizar estado de un lead
export const updateLeadStatus = async (leadId, status) => {
  const ref = doc(db, COLLECTION, leadId);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
};
