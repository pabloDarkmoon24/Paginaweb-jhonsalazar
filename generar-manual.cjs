const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, PageBreak } = require('docx');
const fs = require('fs');

const ROJO = "C0392B";
const GRIS = "555555";
const GRIS_CLARO = "F2F2F2";
const BLANCO = "FFFFFF";

function titulo(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    run: { color: ROJO, bold: true, size: 32 },
  });
}

function subtitulo(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    run: { color: ROJO, size: 26 },
  });
}

function subtitulo3(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    run: { bold: true, size: 22 },
  });
}

function parrafo(text, bold = false) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, bold, color: GRIS })],
    spacing: { after: 120 },
  });
}

function viñeta(text) {
  return new Paragraph({
    children: [new TextRun({ text: `• ${text}`, size: 22, color: GRIS })],
    spacing: { after: 80 },
    indent: { left: 360 },
  });
}

function separador() {
  return new Paragraph({ text: '', spacing: { after: 200 } });
}

function saltoHoja() {
  return new Paragraph({ children: [new PageBreak()] });
}

function tablaCeldas(filas, anchos) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: filas.map((fila, fi) => new TableRow({
      children: fila.map((celda, ci) => new TableCell({
        width: anchos ? { size: anchos[ci], type: WidthType.PERCENTAGE } : undefined,
        shading: fi === 0 ? { fill: ROJO, type: ShadingType.CLEAR, color: ROJO } : (fi % 2 === 0 ? { fill: GRIS_CLARO, type: ShadingType.CLEAR } : { fill: BLANCO, type: ShadingType.CLEAR }),
        children: [new Paragraph({
          children: [new TextRun({ text: celda, size: 20, bold: fi === 0, color: fi === 0 ? BLANCO : GRIS })],
          spacing: { before: 80, after: 80 },
          indent: { left: 120, right: 120 },
        })],
      })),
    })),
  });
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } },
    },
  },
  sections: [{
    properties: {
      page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } },
    },
    children: [

      // ─── PORTADA ───
      new Paragraph({ text: '', spacing: { before: 1200 } }),
      new Paragraph({
        children: [new TextRun({ text: 'DR. JOHN SALAZAR', size: 56, bold: true, color: ROJO, font: 'Calibri' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Manual de Usuario', size: 40, color: GRIS, font: 'Calibri' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Página Web y Panel de Administración', size: 28, color: GRIS })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
      }),
      new Paragraph({
        children: [new TextRun({ text: 'drjohnsalazar.com.co', size: 24, color: ROJO, italics: true })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [new TextRun({ text: 'Versión 1.0  —  Abril 2026', size: 22, color: GRIS })],
        alignment: AlignmentType.CENTER,
      }),
      saltoHoja(),

      // ─── ÍNDICE ───
      titulo('Contenido'),
      parrafo('1.  Descripción General del Sitio'),
      parrafo('2.  Páginas Públicas'),
      parrafo('     2.1  Inicio'),
      parrafo('     2.2  Tienda'),
      parrafo('     2.3  Páginas de Productos'),
      parrafo('     2.4  Contacto'),
      parrafo('     2.5  Proceso de Compra (Checkout)'),
      parrafo('3.  Panel de Administración'),
      parrafo('     3.1  Acceso al Panel'),
      parrafo('     3.2  Dashboard'),
      parrafo('     3.3  Entregas (Contra Entrega)'),
      parrafo('     3.4  Ventas'),
      parrafo('     3.5  Leads y Citas'),
      parrafo('     3.6  Gestión de Productos'),
      parrafo('4.  Preguntas Frecuentes'),
      saltoHoja(),

      // ─── 1. DESCRIPCIÓN GENERAL ───
      titulo('1.  Descripción General del Sitio'),
      parrafo('La plataforma web del Dr. John Salazar es un sitio de comercio electrónico y gestión de clientes desarrollado para la venta de productos naturales y la captación de leads para el consultorio médico. El sitio está disponible en:'),
      new Paragraph({
        children: [new TextRun({ text: 'https://drjohnsalazar.com.co', size: 22, bold: true, color: ROJO })],
        spacing: { after: 200 },
        indent: { left: 360 },
      }),
      subtitulo3('¿Qué ofrece el sitio?'),
      viñeta('Venta de 3 productos naturales con entrega a toda Colombia'),
      viñeta('Información detallada sobre cada producto (ingredientes, beneficios, modo de uso)'),
      viñeta('Formulario de contacto para consultas y solicitudes de cita'),
      viñeta('Carrito de compras con proceso de checkout'),
      viñeta('Panel de administración para gestionar pedidos, clientes y productos'),
      separador(),
      subtitulo3('Productos disponibles'),
      separador(),
      tablaCeldas([
        ['Producto', 'Descripción', 'Precio'],
        ['PRUSHOT', 'Jarabe afrodisíaco y energizante. Mejora vitalidad, energía y deseo sexual.', '$120.000 COP'],
        ['EP11', 'Suplemento líquido. Combate cansancio, mejora memoria. Apto diabéticos e hipertensos.', '$110.000 COP'],
        ['HAMAMELIS COMPLEX', 'Cápsulas + Gotas para piernas cansadas, várices y circulación venosa.', '$95.000 COP'],
      ], [30, 50, 20]),
      saltoHoja(),

      // ─── 2. PÁGINAS PÚBLICAS ───
      titulo('2.  Páginas Públicas'),

      subtitulo('2.1  Inicio  (/)'),
      parrafo('Es la página principal del sitio. Presenta al Dr. John Salazar, su filosofía de Medicina Biológica y los productos estrella del consultorio.'),
      subtitulo3('Secciones de la página de inicio:'),
      viñeta('Hero principal — mensaje de bienvenida y llamado a la acción'),
      viñeta('Sección del doctor — información sobre su especialidad en Medicina Biológica y Flebología'),
      viñeta('Catálogo de productos — vista previa de los 3 productos con botones de acceso a detalle'),
      separador(),

      subtitulo('2.2  Tienda  (/tienda)'),
      parrafo('Muestra todos los productos disponibles para compra. Los productos se cargan en tiempo real desde la base de datos.'),
      subtitulo3('Funcionalidades:'),
      viñeta('Visualización de productos en cuadrícula con imagen, nombre y precio'),
      viñeta('Botón "Agregar al carrito" con selección de cantidad'),
      viñeta('Botón de WhatsApp directo por cada producto'),
      viñeta('Carrito flotante visible en todo momento con contador de ítems'),
      viñeta('Panel lateral del carrito (CartDrawer) para revisar y ajustar la compra'),
      separador(),
      subtitulo3('Cómo agregar un producto al carrito:'),
      parrafo('1.  Selecciona la cantidad deseada usando los botones + y −.'),
      parrafo('2.  Haz clic en "Agregar al carrito".'),
      parrafo('3.  El panel lateral del carrito se abre automáticamente.'),
      parrafo('4.  Desde el panel puedes ajustar cantidades o proceder al checkout.'),
      separador(),

      subtitulo('2.3  Páginas de Productos'),
      parrafo('Cada producto tiene su propia página de detalle con información completa:'),
      separador(),
      tablaCeldas([
        ['Producto', 'URL', 'Secciones'],
        ['PRUSHOT', '/productos/prushot', 'Hero, Info general, Composición, Mecanismo, Beneficios, Seguridad'],
        ['HAMAMELIS COMPLEX', '/productos/hamamelis', 'Hero, Info general, Composición, Mecanismo, Beneficios, Seguridad'],
        ['EP11', '/productos/ep11', 'Hero, Info general, Composición, Mecanismo, Beneficios, Seguridad'],
      ], [25, 30, 45]),
      separador(),

      subtitulo('2.4  Contacto  (/contacto)'),
      parrafo('Formulario para que los visitantes envíen mensajes o soliciten información. Los mensajes quedan registrados como leads en el panel de administración.'),
      subtitulo3('Campos del formulario:'),
      viñeta('Asunto — tema de la consulta'),
      viñeta('Nombres — nombre del visitante'),
      viñeta('Apellidos — apellidos'),
      viñeta('Correo electrónico — para respuesta'),
      viñeta('Teléfono — contacto directo'),
      parrafo('Al enviar el formulario, el visitante recibe una confirmación en pantalla y el mensaje queda registrado en la sección de Leads del panel de administración.'),
      separador(),

      subtitulo('2.5  Proceso de Compra  (/checkout)'),
      parrafo('Una vez que el cliente tiene productos en el carrito, puede proceder al pago desde la tienda o el panel lateral del carrito.'),
      subtitulo3('Pasos del proceso:'),
      parrafo('Paso 1 — Datos de envío', true),
      viñeta('Nombre completo'),
      viñeta('Correo electrónico'),
      viñeta('Teléfono (10 dígitos)'),
      viñeta('Dirección completa'),
      viñeta('Ciudad'),
      separador(),
      parrafo('Paso 2 — Método de pago', true),
      parrafo('Actualmente solo está disponible el pago Contra Entrega. El cliente paga cuando recibe el pedido.'),
      separador(),
      parrafo('Paso 3 — Confirmación', true),
      parrafo('Tras completar el formulario el sistema genera un número de orden (formato: ORD-YYYYMMDD-###) y lo muestra en pantalla. El cliente recibirá una confirmación por WhatsApp.'),
      saltoHoja(),

      // ─── 3. PANEL DE ADMINISTRACIÓN ───
      titulo('3.  Panel de Administración'),
      parrafo('El panel de administración es una sección privada del sitio web accesible únicamente para el administrador autorizado. Desde aquí se gestiona toda la operación del negocio.'),
      parrafo('Acceso: ', true),
      new Paragraph({
        children: [new TextRun({ text: 'https://drjohnsalazar.com.co/admin/login', size: 22, bold: true, color: ROJO })],
        spacing: { after: 200 },
        indent: { left: 360 },
      }),

      subtitulo('3.1  Acceso al Panel  (/admin/login)'),
      parrafo('Para acceder al panel de administración:'),
      parrafo('1.  Abre el navegador y ve a la URL de administración.'),
      parrafo('2.  Ingresa tu correo electrónico de administrador.'),
      parrafo('3.  Ingresa tu contraseña.'),
      parrafo('4.  Haz clic en "Iniciar sesión".'),
      separador(),
      parrafo('⚠️  Importante: Las credenciales de acceso son privadas. No las compartas con nadie. Si olvidas tu contraseña, comunícate con el equipo técnico.', false),
      separador(),
      parrafo('El panel tiene dos vistas según el dispositivo:'),
      viñeta('Computador/Tablet — barra lateral izquierda con el menú de navegación'),
      viñeta('Móvil — barra de navegación en la parte inferior de la pantalla'),
      separador(),

      subtitulo('3.2  Dashboard  (/admin)'),
      parrafo('Es la pantalla principal del panel. Muestra un resumen rápido del estado del negocio.'),
      subtitulo3('Métricas del Dashboard:'),
      separador(),
      tablaCeldas([
        ['Métrica', 'Descripción'],
        ['Total de órdenes', 'Número total de pedidos recibidos'],
        ['Ingresos Wompi', 'Ingresos de pedidos pagados en línea'],
        ['Contra entrega pendientes', 'Pedidos por entregar aún no procesados'],
        ['Leads registrados', 'Total de contactos y solicitudes de cita'],
      ], [40, 60]),
      separador(),
      parrafo('También muestra una tabla con las órdenes más recientes, incluyendo número de orden, nombre del cliente, total, método de pago, estado y fecha.'),
      separador(),

      subtitulo('3.3  Entregas — Contra Entrega  (/admin/contra-entrega)'),
      parrafo('Sección para gestionar los pedidos que serán pagados en el momento de la entrega.'),
      subtitulo3('Información disponible por pedido:'),
      viñeta('Número de orden'),
      viñeta('Nombre del cliente'),
      viñeta('Teléfono y correo electrónico'),
      viñeta('Dirección de entrega y ciudad'),
      viñeta('Productos pedidos con cantidades y subtotales'),
      viñeta('Total del pedido'),
      viñeta('Estado actual'),
      separador(),
      subtitulo3('Estados de un pedido:'),
      separador(),
      tablaCeldas([
        ['Estado', 'Significado', 'Acción sugerida'],
        ['Pendiente', 'Pedido recibido, aún no procesado', 'Contactar al cliente por WhatsApp'],
        ['Enviado', 'Pedido despachado al transportista', 'Informar al cliente el número de guía'],
        ['Completado', 'Pedido entregado y pago recibido', 'Ninguna'],
        ['Cancelado', 'Pedido cancelado por cualquier motivo', 'Registrar el motivo internamente'],
      ], [20, 40, 40]),
      separador(),
      subtitulo3('Cómo cambiar el estado de un pedido:'),
      parrafo('1.  Localiza el pedido en la tabla.'),
      parrafo('2.  En la columna "Estado", haz clic en el selector desplegable.'),
      parrafo('3.  Selecciona el nuevo estado.'),
      parrafo('4.  El cambio se guarda automáticamente en tiempo real.'),
      separador(),
      subtitulo3('Cómo ver los detalles de un pedido:'),
      parrafo('Haz clic en la fila del pedido para expandirla. Verás la dirección completa, el email del cliente y el detalle de cada producto pedido con sus cantidades y valores.'),
      separador(),

      subtitulo('3.4  Ventas  (/admin/ventas)'),
      parrafo('Sección de reportes para pagos procesados en línea (Wompi). Muestra métricas de ventas por período.'),
      subtitulo3('Filtros de período disponibles:'),
      viñeta('Todo el tiempo'),
      viñeta('Últimos 7 días'),
      viñeta('Últimos 30 días'),
      viñeta('Últimos 90 días'),
      separador(),
      subtitulo3('Métricas disponibles:'),
      viñeta('Ingresos totales del período'),
      viñeta('Número de transacciones'),
      viñeta('Ticket promedio (ingreso por transacción)'),
      viñeta('Unidades vendidas'),
      viñeta('Ventas por producto (tabla con unidades e ingresos por producto)'),
      viñeta('Historial completo de transacciones con número de orden, cliente, total y estado'),
      separador(),

      subtitulo('3.5  Leads y Citas  (/admin/leads)'),
      parrafo('Sección para gestionar todos los contactos, solicitudes de cita y estadísticas de visitas al sitio.'),
      subtitulo3('Pestañas disponibles:'),
      separador(),
      parrafo('Pestaña 1 — Leads y Citas', true),
      parrafo('Muestra todos los mensajes del formulario de contacto y solicitudes de cita. Permite filtrar por tipo (contacto o cita) y por estado.'),
      separador(),
      tablaCeldas([
        ['Estado', 'Significado'],
        ['Pendiente', 'Nuevo lead, aún no atendido'],
        ['Contactado', 'Se ha comunicado con el lead'],
        ['Agendado', 'Se agendó la cita (solo para type=cita)'],
        ['Completado', 'Gestión finalizada exitosamente'],
        ['Cancelado', 'Lead descartado o cancelado'],
      ], [30, 70]),
      separador(),
      parrafo('Cómo gestionar un lead:', true),
      parrafo('1.  Localiza el lead en la tabla.'),
      parrafo('2.  Usa los datos de contacto (email o teléfono) para comunicarte.'),
      parrafo('3.  Cambia el estado en el selector desplegable de la última columna.'),
      parrafo('4.  El cambio se guarda automáticamente.'),
      separador(),
      parrafo('Pestaña 2 — Visitas por página', true),
      parrafo('Muestra estadísticas de navegación del sitio: cuáles páginas son más visitadas y el historial de las últimas 50 visitas con la página, referencia de origen y fecha.'),
      separador(),

      subtitulo('3.6  Gestión de Productos  (/admin/productos)'),
      parrafo('Sección para administrar el catálogo de productos que aparecen en la tienda. Permite crear, editar y eliminar productos.'),
      subtitulo3('Cargar productos iniciales:'),
      parrafo('Si el catálogo está vacío, aparecerá el botón "Cargar productos iniciales". Haz clic en él para agregar automáticamente los 3 productos base (PRUSHOT, EP11, HAMAMELIS COMPLEX) con su información estándar.'),
      separador(),
      subtitulo3('Crear un nuevo producto:'),
      parrafo('1.  Haz clic en "Nuevo Producto".'),
      parrafo('2.  Carga una imagen (arrastra o haz clic en el área de carga).'),
      parrafo('3.  Completa los campos: Nombre, Subtítulo, Descripción, Precio.'),
      parrafo('4.  Marca si está en stock.'),
      parrafo('5.  Haz clic en "Guardar". La imagen se sube automáticamente y el producto queda disponible en la tienda.'),
      separador(),
      subtitulo3('Editar un producto:'),
      parrafo('1.  Haz clic en "Editar" en la tarjeta del producto.'),
      parrafo('2.  Modifica los campos que necesites.'),
      parrafo('3.  Haz clic en "Guardar cambios".'),
      separador(),
      subtitulo3('Eliminar un producto:'),
      parrafo('1.  Haz clic en "Eliminar" en la tarjeta del producto.'),
      parrafo('2.  Confirma la acción en el diálogo de seguridad.'),
      parrafo('3.  El producto y su imagen son eliminados permanentemente.'),
      parrafo('⚠️  Esta acción no se puede deshacer.'),
      separador(),
      subtitulo3('Campos de un producto:'),
      separador(),
      tablaCeldas([
        ['Campo', 'Obligatorio', 'Descripción'],
        ['Imagen', 'No', 'Foto del producto. Se sube a Firebase Storage.'],
        ['Nombre', 'Sí', 'Nombre visible en la tienda'],
        ['Subtítulo', 'No', 'Frase corta debajo del nombre'],
        ['Descripción', 'No', 'Texto descriptivo del producto'],
        ['Precio (COP)', 'Sí', 'Precio en pesos colombianos sin puntos ni comas'],
        ['En stock', 'No', 'Si está desmarcado aparece como "Sin stock"'],
      ], [25, 15, 60]),
      saltoHoja(),

      // ─── 4. PREGUNTAS FRECUENTES ───
      titulo('4.  Preguntas Frecuentes'),

      subtitulo3('¿Cómo sé que llegó un pedido nuevo?'),
      parrafo('Actualmente el sistema no envía notificaciones automáticas por email. Se recomienda revisar el panel de administración diariamente o configurar alertas desde la consola de Firebase.'),
      separador(),

      subtitulo3('¿Qué pasa si un cliente no contesta para confirmar el pedido?'),
      parrafo('Cambia el estado del pedido a "Cancelado" en la sección de Contra Entrega y registra el motivo en las notas internas si es necesario.'),
      separador(),

      subtitulo3('¿Puedo agregar más productos además de los tres actuales?'),
      parrafo('Sí. Desde la sección "Productos" del panel puedes crear tantos productos adicionales como necesites con imagen, descripción y precio personalizado.'),
      separador(),

      subtitulo3('¿El sitio acepta pagos en línea?'),
      parrafo('Actualmente solo está activo el método de pago Contra Entrega. El pago en línea con Wompi está preparado en el sistema pero desactivado. Puede activarse cuando se requiera.'),
      separador(),

      subtitulo3('¿Cómo recupero el acceso si olvido la contraseña?'),
      parrafo('Comunícate con el equipo técnico que desarrolló la plataforma para restablecer las credenciales de administrador a través de Firebase Authentication.'),
      separador(),

      subtitulo3('¿Cómo aparece el sitio en Google?'),
      parrafo('El sitio está registrado en Google Search Console y el sitemap ha sido enviado. Google indexará las páginas en 24-48 horas. Para mejorar la visibilidad local se recomienda además crear un perfil en Google Business Profile (business.google.com).'),
      separador(),

      new Paragraph({ text: '', spacing: { before: 600 } }),
      new Paragraph({
        children: [new TextRun({ text: 'Dr. John Salazar — Manual de Usuario v1.0  |  Abril 2026', size: 18, color: GRIS, italics: true })],
        alignment: AlignmentType.CENTER,
      }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('D:/Desktop/JHON SALAZAR/Manual-DrJohnSalazar.docx', buffer);
  console.log('✅ Manual creado: D:/Desktop/JHON SALAZAR/Manual-DrJohnSalazar.docx');
});
