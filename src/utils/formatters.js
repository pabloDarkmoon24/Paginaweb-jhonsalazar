// Formatters - Funciones para formatear datos
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea precio en pesos colombianos
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Precio formateado (ej: $50.000)
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formatea fecha completa
 * @param {Date|Timestamp} date - Fecha a formatear
 * @returns {string} - Fecha formateada (ej: 13 de febrero de 2025, 14:30)
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    // Si es un Timestamp de Firestore, convertir a Date
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    
    return format(dateObj, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return '';
  }
};

/**
 * Formatea fecha corta
 * @param {Date|Timestamp} date - Fecha a formatear
 * @returns {string} - Fecha formateada (ej: 13/02/2025)
 */
export const formatDateShort = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'dd/MM/yyyy', { locale: es });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return '';
  }
};

/**
 * Formatea tiempo relativo
 * @param {Date|Timestamp} date - Fecha a formatear
 * @returns {string} - Tiempo relativo (ej: hace 2 horas)
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return formatDistanceToNow(dateObj, { 
      addSuffix: true, 
      locale: es 
    });
  } catch (error) {
    console.error('Error formateando tiempo relativo:', error);
    return '';
  }
};

/**
 * Formatea teléfono colombiano
 * @param {string} phone - Teléfono a formatear
 * @returns {string} - Teléfono formateado (ej: 300 123 4567)
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Limpiar el teléfono
  const cleaned = phone.replace(/\D/g, '');
  
  // Si tiene +57, removerlo para formato local
  const localPhone = cleaned.startsWith('57') ? cleaned.slice(2) : cleaned;
  
  // Formatear: 300 123 4567
  if (localPhone.length === 10) {
    return `${localPhone.slice(0, 3)} ${localPhone.slice(3, 6)} ${localPhone.slice(6)}`;
  }
  
  return phone;
};

/**
 * Formatea número de orden
 * @returns {string} - Número de orden (ej: ORD-20250213-001)
 */
export const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `ORD-${year}${month}${day}-${random}`;
};

/**
 * Trunca texto largo
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Capitaliza primera letra
 * @param {string} text - Texto a capitalizar
 * @returns {string} - Texto capitalizado
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formatea estado del pedido
 * @param {string} status - Estado del pedido
 * @returns {object} - {label: string, color: string}
 */
export const formatOrderStatus = (status) => {
  const statuses = {
    pending: { label: 'Pendiente', color: 'orange' },
    paid: { label: 'Pagado', color: 'green' },
    shipped: { label: 'Enviado', color: 'blue' },
    completed: { label: 'Completado', color: 'green' },
    cancelled: { label: 'Cancelado', color: 'red' }
  };
  
  return statuses[status] || { label: status, color: 'gray' };
};

/**
 * Formatea estado de la cita
 * @param {string} status - Estado de la cita
 * @returns {object} - {label: string, color: string}
 */
export const formatAppointmentStatus = (status) => {
  const statuses = {
    pending: { label: 'Pendiente', color: 'orange' },
    contacted: { label: 'Contactado', color: 'blue' },
    scheduled: { label: 'Agendada', color: 'green' },
    not_scheduled: { label: 'No concretada', color: 'gray' },
    completed: { label: 'Completada', color: 'green' },
    cancelled: { label: 'Cancelada', color: 'red' }
  };
  
  return statuses[status] || { label: status, color: 'gray' };
};