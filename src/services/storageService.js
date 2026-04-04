// storageService.js - Subida de imágenes a Firebase Storage
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

// Tipos de archivo permitidos
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_MB = 5;

/**
 * Sube una imagen de producto a Firebase Storage
 * @param {File} file - Archivo de imagen
 * @param {function} onProgress - Callback de progreso (0-100)
 * @returns {Promise<string>} URL pública de descarga
 */
export const uploadProductImage = async (file, onProgress = null) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Formato no permitido. Usa JPG, PNG o WebP.');
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    throw new Error(`La imagen no puede superar ${MAX_SIZE_MB}MB.`);
  }

  const ext      = file.name.split('.').pop().toLowerCase();
  const fileName = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, fileName);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      'state_changed',
      (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(pct);
      },
      reject,
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

/**
 * Elimina una imagen de Firebase Storage dado su URL de descarga
 */
export const deleteProductImage = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('firebasestorage')) return;
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch {
    // Si no existe o ya fue eliminada, ignorar
  }
};
