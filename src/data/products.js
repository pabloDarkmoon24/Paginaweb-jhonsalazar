// Datos estáticos de los 3 productos principales
import product1 from '../assets/Home/Producto-1.png';
import product2 from '../assets/Home/Producto-2.png';
import product3 from '../assets/Home/Producto-3.png';

export const STATIC_PRODUCTS = [
  {
    id: 'prushot',
    name: 'PRUSHOT',
    subtitle: 'Energía, Deseo y Vitalidad.',
    description: 'El impulso que tu cuerpo y mente estaban esperando. Un energizante y afrodisíaco natural que optimiza tu respuesta hormonal y física sin efectos secundarios.',
    price: 120000,
    image: product1,
    link: '/productos/prushot',
    inStock: true,
  },
  {
    id: 'hamamelis',
    name: 'HAMAMELIS + CASTAÑO DE INDIAS',
    subtitle: 'Ligereza y Salud Venosa.',
    description: 'Tratamiento de doble acción para transformar la salud de tus piernas. Alivia el dolor, reduce várices y fortalece la circulación desde el interior hacia afuera.',
    price: 95000,
    image: product2,
    link: '/productos/hamamelis',
    inStock: true,
  },
  {
    id: 'ep11',
    name: 'EP11',
    subtitle: 'Mente Despierta y Cuerpo Vital.',
    description: 'Combate el agotamiento físico y mental. Formulado con colágeno y adaptógenos, EP11 activa tu memoria, protege tu piel y fortalece tu sistema inmunológico.',
    price: 110000,
    image: product3,
    link: '/productos/ep11',
    inStock: true,
  },
];
