// Validators - Funciones de validación y sanitización
// SEGURIDAD: Siempre validar en frontend Y backend

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valida teléfono colombiano
 * Acepta formatos: 3001234567, +573001234567, 300 123 4567
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - true si es válido
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Remover espacios y guiones
  const cleanPhone = phone.replace(/[\s-]/g, '');
  
  // Validar formato colombiano (10 dígitos o +57 + 10 dígitos)
  const phoneRegex = /^(\+57)?[0-9]{10}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Valida que un nombre sea válido
 * @param {string} name - Nombre a validar
 * @returns {boolean} - true si es válido
 */
export const validateName = (name) => {
  if (!name || typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  // Mínimo 2 caracteres, solo letras, espacios, tildes y ñ
  const nameRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]{2,}$/;
  return nameRegex.test(trimmedName);
};

/**
 * Valida contraseña segura
 * @param {string} password - Contraseña a validar
 * @returns {object} - {isValid: boolean, errors: string[]}
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || typeof password !== 'string') {
    return { isValid: false, errors: ['Contraseña requerida'] };
  }
  
  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe incluir al menos una mayúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Debe incluir al menos una minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Debe incluir al menos un número');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitiza input del usuario
 * SEGURIDAD: Previene XSS básico
 * @param {string} input - Input a sanitizar
 * @returns {string} - Input sanitizado
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover < y > para prevenir tags HTML
    .replace(/[^\w\s@.-áéíóúñÁÉÍÓÚÑ]/g, ''); // Solo alfanuméricos, espacios, @, ., -, y tildes
};

/**
 * Sanitiza dirección (permite más caracteres)
 * @param {string} address - Dirección a sanitizar
 * @returns {string} - Dirección sanitizada
 */
export const sanitizeAddress = (address) => {
  if (typeof address !== 'string') return '';
  
  return address
    .trim()
    .replace(/[<>]/g, '') // Remover tags HTML
    .slice(0, 200); // Máximo 200 caracteres
};

/**
 * Valida que un número sea positivo
 * @param {number} num - Número a validar
 * @returns {boolean} - true si es válido
 */
export const validatePositiveNumber = (num) => {
  return typeof num === 'number' && num > 0 && !isNaN(num);
};

/**
 * Valida formulario de checkout
 * @param {object} data - Datos del formulario
 * @returns {object} - {isValid: boolean, errors: object}
 */
export const validateCheckoutForm = (data) => {
  const errors = {};
  
  if (!validateName(data.name)) {
    errors.name = 'Nombre inválido';
  }
  
  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!validatePhone(data.phone)) {
    errors.phone = 'Teléfono inválido (10 dígitos)';
  }
  
  if (!data.address || data.address.trim().length < 10) {
    errors.address = 'Dirección muy corta';
  }
  
  if (!data.city || data.city.trim().length < 3) {
    errors.city = 'Ciudad inválida';
  }
  
  if (!data.postalCode || !/^\d{6}$/.test(data.postalCode)) {
    errors.postalCode = 'Código postal inválido (6 dígitos)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Valida formulario de cita
 * @param {object} data - Datos del formulario
 * @returns {object} - {isValid: boolean, errors: object}
 */
export const validateAppointmentForm = (data) => {
  const errors = {};
  
  if (!validateName(data.name)) {
    errors.name = 'Nombre inválido';
  }
  
  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }
  
  if (!validatePhone(data.phone)) {
    errors.phone = 'Teléfono inválido';
  }
  
  if (!data.office || data.office.trim().length < 3) {
    errors.office = 'Debes seleccionar un consultorio';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};