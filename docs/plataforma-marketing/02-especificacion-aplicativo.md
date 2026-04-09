# ESPECIFICACIÓN COMPLETA DEL APLICATIVO
## Plataforma SaaS de Marketing Digital

**Versión:** 1.0  
**Fecha:** Abril 2026  
**Propietario:** Pablo (desarrollador)  
**Caso piloto:** Dr. John Salazar (drjohnsalazar.com.co)  
**Estado:** Especificación aprobada — pendiente desarrollo

---

## ÍNDICE

1. [Visión y Objetivo](#1-visión)
2. [Usuarios y Roles](#2-usuarios)
3. [Arquitectura del Sistema](#3-arquitectura)
4. [Módulos del Aplicativo](#4-módulos)
5. [Flujos de Usuario](#5-flujos)
6. [Modelo de Datos](#6-datos)
7. [Integraciones de API](#7-apis)
8. [Motor de Inteligencia Artificial](#8-ia)
9. [Stack Tecnológico Detallado](#9-stack)
10. [Seguridad y Privacidad](#10-seguridad)
11. [Fases de Desarrollo](#11-fases)
12. [Costos y Monetización](#12-costos)

---

## 1. VISIÓN Y OBJETIVO

### 1.1 Qué es la Plataforma

Una aplicación web SaaS (Software as a Service) de marketing digital todo en uno, con inteligencia artificial integrada.

**Propósito central:**
> Permitir que cualquier negocio — sin conocimiento técnico avanzado — pueda gestionar, analizar y optimizar toda su presencia digital y campañas publicitarias desde un solo lugar, con la guía de una IA que habla en español claro.

### 1.2 Problema que Resuelve

Hoy, un negocio en Colombia que quiere hacer marketing digital necesita:
- Meta Business Suite (Facebook/Instagram)
- Google Ads + Analytics + Search Console (3 herramientas)
- TikTok Ads Manager
- WhatsApp Business
- Herramienta de email marketing
- Herramienta de reportes

Esto significa: 6–8 herramientas distintas, todas en inglés, sin conexión entre sí, sin orientación de qué hacer primero.

**La plataforma las unifica todas con IA que da recomendaciones claras en español.**

### 1.3 Propuesta de Valor Única

1. **Una sola pantalla** — todos los canales en un dashboard
2. **IA que analiza y recomienda** — no solo muestra datos, dice qué hacer
3. **Auditoría automática** — detecta problemas de configuración antes de que cuesten dinero
4. **En español colombiano** — sin jerga técnica, sin anglicismos
5. **Guía para nuevos negocios** — de cero a publicidad activa paso a paso

### 1.4 Alcance Inicial (MVP)

El MVP (Minimum Viable Product) es la versión mínima que ya aporta valor y puede venderse:

**Incluye:**
- Dashboard con métricas de ventas propias (desde Firestore)
- Chat con IA (Claude API)
- Auditoría básica del sitio web
- Métricas de Meta Ads (lectura, no creación)
- Gestión básica de usuarios

**No incluye en MVP:**
- Crear anuncios desde la plataforma
- TikTok Ads
- WhatsApp automático
- Email marketing

---

## 2. USUARIOS Y ROLES

### 2.1 Tipos de Usuario

#### Super Admin (Pablo)
- Acceso total a todos los clientes/negocios
- Puede crear, editar y eliminar cualquier cuenta
- Ve métricas de uso de la plataforma (cuántos usuarios, qué funciones usan)
- Gestiona facturación de clientes
- Configura límites de uso de APIs por cliente

#### Admin de Negocio
- Gestiona un negocio específico
- Crea y gestiona usuarios del equipo dentro de su negocio
- Ve todos los módulos disponibles según su plan
- Configura integraciones de APIs (Meta, Google, etc.)
- Accede a reportes y exportaciones

#### Usuario del Equipo
- Acceso según permisos que le dio el Admin
- Puede ver/editar campañas, reportes, etc.
- No puede cambiar configuraciones de la cuenta ni integraciones

#### (Futuro) Cliente Final
- Negocios que pagan la suscripción mensual
- Cada uno ve solo su propio espacio
- Sin acceso a los datos de otros clientes

### 2.2 Permisos por Módulo

| Módulo | Super Admin | Admin Negocio | Equipo (básico) | Equipo (avanzado) |
|--------|-------------|---------------|-----------------|-------------------|
| Dashboard | ✅ Todo | ✅ Todo | ✅ Solo lectura | ✅ Todo |
| Campañas | ✅ Todo | ✅ Todo | 👁️ Solo lectura | ✅ Crear/editar |
| IA Chat | ✅ Todo | ✅ Todo | ✅ Todo | ✅ Todo |
| Auditoría | ✅ Todo | ✅ Todo | 👁️ Solo lectura | ✅ Todo |
| WhatsApp | ✅ Todo | ✅ Todo | ❌ Sin acceso | ✅ Todo |
| Analytics | ✅ Todo | ✅ Todo | 👁️ Solo lectura | ✅ Todo |
| Alertas | ✅ Todo | ✅ Todo | ✅ Ver alertas | ✅ Todo |
| Usuarios | ✅ Todo | ✅ Gestionar equipo | ❌ Sin acceso | ❌ Sin acceso |
| Facturación | ✅ Todo | ✅ Ver facturas | ❌ Sin acceso | ❌ Sin acceso |
| Configuración | ✅ Todo | ✅ Su negocio | ❌ Sin acceso | ❌ Sin acceso |

### 2.3 Flujo de Onboarding de un Nuevo Negocio

```
1. Super Admin crea el negocio (nombre, dominio, plan)
2. Sistema crea workspace aislado en Firestore
3. Admin del negocio recibe email de invitación
4. Admin configura su perfil y contraseña
5. Aparece el Wizard de Configuración Inicial:
   a. ¿Qué canales usa? (selección de checkboxes)
   b. Conectar Meta Business Account (OAuth)
   c. Conectar Google Ads (OAuth)
   d. Instalar código de seguimiento (si tiene sitio web)
   e. Auditoría inicial automática
6. Dashboard ya muestra los primeros datos
```

---

## 3. ARQUITECTURA DEL SISTEMA

### 3.1 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                   │
│                   Netlify / Firebase Hosting                  │
│                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │Dashboard │ │Campañas  │ │Chat IA   │ │  Auditoría   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
                    Firebase Auth
                    (Autenticación)
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                  BACKEND (Firebase Functions)                 │
│                        Node.js 20                             │
│                                                               │
│  ┌──────────────┐  ┌────────────────┐  ┌─────────────────┐  │
│  │ Meta API     │  │ Google Ads API │  │  Claude API     │  │
│  │ (proxy)      │  │ (proxy)        │  │  (IA)           │  │
│  └──────────────┘  └────────────────┘  └─────────────────┘  │
│                                                               │
│  ┌──────────────┐  ┌────────────────┐  ┌─────────────────┐  │
│  │ WhatsApp API │  │ TikTok API     │  │  Auditor        │  │
│  │ (360dialog)  │  │                │  │  (web scraper)  │  │
│  └──────────────┘  └────────────────┘  └─────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Firebase Firestore                          │
│                   (Base de datos)                             │
│                                                               │
│  businesses/  users/  campaigns/  leads/  analytics/          │
│  audits/  conversations/  alerts/  webhooks/                  │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Por Qué Esta Arquitectura

**Firebase como backend:**
- Firebase Auth ya usado en el sitio del doctor → cero curva de aprendizaje
- Firestore escala automáticamente sin administrar servidores
- Firebase Functions = serverless → paga solo lo que usa
- Firebase ya tiene reglas de seguridad por colección

**React + Vite como frontend:**
- Ya es el stack del sitio del doctor → mismo conocimiento
- Vite = builds rápidos, HMR en desarrollo
- Netlify para el hosting → CI/CD automático con GitHub

**Claude API para IA:**
- Mejor capacidad de razonamiento en español
- API estable y bien documentada
- claude-sonnet-4-6 = balance costo/calidad óptimo

### 3.3 Aislamiento Multi-tenant

Cada negocio (tenant) tiene su propio espacio aislado en Firestore:

```
/businesses/{businessId}/
  ├── /config
  ├── /users/{userId}
  ├── /campaigns/{campaignId}
  ├── /analytics/{date}
  ├── /alerts/{alertId}
  ├── /conversations/{conversationId}
  └── /audits/{auditId}
```

**Reglas de seguridad Firestore:**
```javascript
// Un usuario solo puede acceder a los datos de su negocio
match /businesses/{businessId}/{document=**} {
  allow read, write: if request.auth != null 
    && request.auth.uid in resource.data.authorizedUsers;
}
```

---

## 4. MÓDULOS DEL APLICATIVO

### 4.1 MÓDULO 1 — DASHBOARD PRINCIPAL

**Propósito:** Vista unificada de todos los canales en tiempo real.

**Componentes de la pantalla:**

```
┌─────────────────────────────────────────────────────────────┐
│ Logo | Nombre Negocio         [Alertas 3] [Notif] [Perfil]  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Período: [Hoy ▼] [Ayer] [7 días] [30 días] [Personalizado] │
│                                                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Ventas   │ │ ROAS     │ │ Inversión│ │ Leads nuevos │   │
│  │ $X,XXX   │ │  3.2x    │ │ $XXX     │ │     42       │   │
│  │ ↑12% vs  │ │ ↑0.5x vs │ │ ↓5% vs  │ │ ↑20% vs     │   │
│  │ ayer     │ │ semana   │ │ ayer     │ │ ayer         │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
│                                                               │
│  ┌────────────────────────┐  ┌─────────────────────────┐    │
│  │ Ventas por día (gráf.) │  │ Rendimiento por canal   │    │
│  │                        │  │  Meta:  $XXX / ROAS 3.1 │    │
│  │   [área chart]         │  │  Google: $XX / ROAS 4.2 │    │
│  │                        │  │  TikTok: $XX / ROAS 2.8 │    │
│  └────────────────────────┘  └─────────────────────────┘    │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Recomendaciones de la IA para hoy                    │   │
│  │  🔴 La campaña "Varices Q1" tiene frecuencia 4.8     │   │
│  │     → Renueva el creativo esta semana                 │   │
│  │  🟡 El ROAS de Google cayó 30% — revisar keywords    │   │
│  │  🟢 "PRUSHOT Mayo" está rindiendo bien, considera    │   │
│  │     escalar +20% el presupuesto                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────┐   ┌───────────────────────────┐   │
│  │ Mejor anuncio activo │   │ Alertas activas           │   │
│  │  [Miniatura video]   │   │ ⚠️ Pixel sin datos 2h     │   │
│  │  CTR: 3.2%           │   │ ⚠️ Budget agotándose      │   │
│  │  ROAS: 4.1x          │   │                           │   │
│  └──────────────────────┘   └───────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Datos que muestra:**
- Ventas totales (del e-commerce propio + atribuidas por canal)
- ROAS combinado y por canal
- Inversión total en ads
- Leads nuevos del período
- Mejor anuncio activo con métricas
- Top 3 recomendaciones de la IA
- Alertas activas
- Gráfica de ventas por día (línea o área)
- Tabla de rendimiento por canal

**Comportamiento:**
- Se actualiza automáticamente cada 30 minutos
- El usuario puede cambiar el período (hoy, ayer, 7 días, 30 días, personalizado)
- Las recomendaciones de la IA se regeneran una vez por día (mañana)
- Hacer clic en cualquier canal lleva al módulo correspondiente

---

### 4.2 MÓDULO 2 — CAMPAÑAS

**Propósito:** Ver y gestionar campañas de Meta, Google y TikTok desde un solo lugar.

**Sub-secciones:**

#### 2a. Vista General de Campañas

```
Filtros: [Todos ▼] [Meta ▼] [Google ▼] [TikTok ▼] [Estado: Activa ▼]

Tabla de campañas:
┌──────────────────┬─────────┬─────────┬────────┬──────┬────────┬────────────┐
│ Campaña          │ Canal   │ Estado  │ Gasto  │ ROAS │ CPA    │ Acciones   │
├──────────────────┼─────────┼─────────┼────────┼──────┼────────┼────────────┤
│ Varices Mayo '26 │ 🔵 Meta │ ✅ Activa│ $450k │ 3.2x │ $28k   │ [Ver] [IA] │
│ Search Hamamelis │ 🔴 Goog │ ✅ Activa│ $120k │ 5.1x │ $15k   │ [Ver] [IA] │
│ PRUSHOT UGC      │ ⚫ TikT │ ⏸ Pausa │ $80k  │ 1.8x │ $45k   │ [Ver] [IA] │
└──────────────────┴─────────┴─────────┴────────┴──────┴────────┴────────────┘

[Botón IA]: "¿Por qué rinde así?" → abre chat IA con contexto de esa campaña
```

#### 2b. Detalle de Campaña

Al hacer clic en una campaña:

```
< Volver a campañas

Campaña: "Varices Mayo '26" — Meta Ads — Activa
Período: últimos 7 días

MÉTRICAS PRINCIPALES:
┌──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│ Gasto    │ Alcance  │ Impres.  │ CTR      │ Clics    │ Compras  │
│ $450,000 │  28,400  │ 140,200  │  2.8%    │  3,926   │   16     │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘
┌──────────┬──────────┬──────────┬──────────┐
│ CPA      │ ROAS     │ Revenue  │ Frecuencia│
│ $28,125  │  3.2x    │ $1.44M  │   2.1    │
└──────────┴──────────┴──────────┴──────────┘

GRÁFICA: Gasto vs. Revenue por día (últimos 7 días)
[gráfica de líneas dobles]

CONJUNTOS DE ANUNCIOS:
[tabla similar con los conjuntos dentro de la campaña]

ANUNCIOS:
[tabla con cada creativo: miniatura, CTR, CPC, conversiones]

ANÁLISIS DE LA IA:
"Esta campaña está funcionando bien. El CTR de 2.8% está por encima
del promedio en Colombia (1.5%). Sin embargo, la frecuencia 2.1 está
subiendo — si llega a 3, te recomiendo renovar el creativo principal.
El conjunto 'Mujeres 35-55 Pereira' tiene ROAS 4.5x vs 2.1x del
otro conjunto — considera pausar el conjunto de bajo rendimiento."
```

#### 2c. Crear Anuncio (Fase 2)

Formulario guiado para crear un anuncio:
1. Seleccionar canal (Meta / Google / TikTok)
2. Seleccionar objetivo (Ventas / Leads / Tráfico)
3. Definir audiencia (intereses, ubicación, edad)
4. Subir creativo (imagen o video)
5. Escribir copy (con sugerencias de la IA)
6. Configurar presupuesto y período
7. Vista previa del anuncio
8. Publicar (via API del canal)

---

### 4.3 MÓDULO 3 — INTELIGENCIA ARTIFICIAL (CHAT)

**Propósito:** Asistente de marketing que responde preguntas, analiza datos y da recomendaciones.

**Interfaz:**

```
┌─────────────────────────────────────────────────────────────┐
│  Chat con la IA de Marketing                    [Historial] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🤖 Hola, soy tu asistente de marketing. Hoy tienes:  │   │
│  │    • 3 campañas activas con inversión total $650k     │   │
│  │    • ROAS promedio: 3.4x (bueno)                      │   │
│  │    • 1 alerta: La campaña de TikTok tiene ROAS < 2x  │   │
│  │    ¿En qué te puedo ayudar?                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 👤 Mi campaña de hamamelis no está funcionando bien,  │   │
│  │    qué hago?                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🤖 Revisé tu campaña "Hamamelis Varices Col" y veo:  │   │
│  │                                                        │   │
│  │    • CTR: 0.9% (bajo — promedio es 1.5%)              │   │
│  │    • Frecuencia: 4.1 (alta — renueva el creativo)     │   │
│  │    • CPA: $52,000 (alto para un producto de $95,000)  │   │
│  │                                                        │   │
│  │    Las 3 acciones que yo haría hoy:                   │   │
│  │    1. Pausar los anuncios con CTR < 0.8%              │   │
│  │    2. Subir un nuevo video con testimonio de cliente   │   │
│  │    3. Reducir la audiencia a mujeres 40-60 Eje cafetero│  │
│  │                                                        │   │
│  │    ¿Quieres que te genere ideas de copy para el nuevo │   │
│  │    video?                                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  Sugerencias rápidas:                                        │
│  [¿Por qué cayeron mis ventas?] [Genera un copy para Meta]  │
│  [¿Cuánto invertir en TikTok?] [Analiza mi mejor campaña]   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  [ Escribe tu pregunta aquí...                    ] [Enviar] │
└─────────────────────────────────────────────────────────────┘
```

**Capacidades de la IA:**

1. **Análisis de datos:** La IA recibe en el contexto los datos actuales del negocio
2. **Recomendaciones accionables:** No solo "el CTR está bajo" sino "pausa estos dos anuncios"
3. **Generación de copies:** "Genera 5 títulos para un anuncio de PRUSHOT enfocado en hombres cansados"
4. **Explicación de métricas:** "¿Qué significa ROAS 2.5x para mi negocio?"
5. **Auditoría on-demand:** "Revisa si mi pixel de Meta está bien instalado"
6. **Proyecciones:** "Si subo el presupuesto a $2M/mes, cuánto podría vender?"

**Contexto que recibe la IA en cada mensaje:**
```json
{
  "negocio": "Dr. John Salazar",
  "productos": ["PRUSHOT $120k", "HAMAMELIS $95k", "EP11 $110k"],
  "campañas_activas": [...],
  "metricas_hoy": { "ventas": X, "roas": X, "inversion": X },
  "alertas_activas": [...],
  "historial_conversacion": [...]
}
```

---

### 4.4 MÓDULO 4 — AUDITORÍA DIGITAL

**Propósito:** Verificar automáticamente que todas las configuraciones de marketing estén correctas.

**Cómo funciona:**
1. El sistema ejecuta la auditoría automáticamente una vez por semana
2. El usuario también puede ejecutarla manualmente cuando quiera
3. La IA genera un reporte en lenguaje simple con prioridades

**Áreas auditadas:**

#### A. Pixel de Meta
- ¿El pixel está instalado en el sitio?
- ¿Está enviando eventos PageView?
- ¿Está enviando eventos Purchase con el valor correcto?
- ¿Hay eventos duplicados?
- ¿Cuántas compras rastreó en los últimos 7 días vs. compras reales?

**Cómo verificar:** Hacer una petición a la API de Meta Events Manager

#### B. Google Analytics / Tag Manager
- ¿GA4 está instalado?
- ¿Está configurado el evento purchase?
- ¿Las conversiones se importan a Google Ads?
- ¿Hay páginas sin tag instalado?

**Cómo verificar:** API de Google Analytics Admin

#### C. SEO Técnico
- ¿El sitio carga en < 3 segundos? (PageSpeed API)
- ¿Tiene sitemap.xml accesible?
- ¿Tiene robots.txt?
- ¿Hay páginas con error 404?
- ¿Tiene SSL activo (HTTPS)?
- ¿Las imágenes tienen alt text?
- ¿El sitio tiene meta descriptions?
- ¿Core Web Vitals aprueban?

**Cómo verificar:** Google PageSpeed API + Search Console API + petición directa HTTP

#### D. Google My Business
- ¿El negocio está verificado?
- ¿Tiene fotos subidas?
- ¿El horario está completo?
- ¿La descripción está llena?
- ¿Ha respondido las reseñas recientes?

**Cómo verificar:** Google Business API

#### E. WhatsApp Business
- ¿El número está verificado?
- ¿Tiene perfil de empresa completo?
- ¿Hay mensajes sin responder > 24h?

**Cómo verificar:** 360dialog API

#### F. Campañas de Ads
- ¿Hay campañas con presupuesto agotado?
- ¿Hay campañas con ROAS < 1 corriendo?
- ¿Hay grupos de anuncios sin anuncios activos?
- ¿Hay anuncios rechazados?
- ¿El quality score promedio de Google es < 5?

**Cómo verificar:** Meta Marketing API + Google Ads API

**Formato del reporte de auditoría:**

```
AUDITORÍA DIGITAL — Dr. John Salazar
Ejecutada: 8 de abril 2026 — 9:00am

RESUMEN: 3 problemas críticos, 2 advertencias, 8 elementos correctos

🔴 CRÍTICO (resolver esta semana)
───────────────────────────────
1. El Pixel de Meta no registra valores de compra
   → Las campañas de Meta no pueden optimizar por ROAS
   → Solución: Agregar el parámetro "value" al evento Purchase
   [Ver cómo solucionarlo]

2. La campaña "Hamamelis Búsqueda" tiene ROAS 0.8x
   → Estás perdiendo dinero activamente
   → Solución: Pausar inmediatamente y revisar keywords
   [Ver campaña]

3. 4 páginas del sitio tienen error 404
   → Estás perdiendo tráfico de SEO
   → Páginas: /productos/prushot-old, /blog/varices-2023...
   [Ver páginas]

🟡 ADVERTENCIA (resolver este mes)
───────────────────────────────────
4. La velocidad móvil es 58/100 (debería ser > 70)
   → Cada segundo extra reduce conversiones ~7%
   → Solución: Comprimir imágenes y reducir JavaScript
   [Ver reporte PageSpeed]

5. Google My Business sin fotos del consultorio
   → Las fotos aumentan 42% los clics al perfil (dato de Google)
   → Solución: Subir 5+ fotos del consultorio
   [Ir a Google My Business]

✅ CORRECTO (8 elementos)
─────────────────────────
✓ Pixel Meta instalado y enviando PageView
✓ GA4 instalado y configurado
✓ SSL activo (HTTPS)
✓ Sitemap.xml accesible
✓ robots.txt configurado
✓ 3 campañas activas con ROAS positivo
✓ WhatsApp Business verificado
✓ Google My Business verificado
```

---

### 4.5 MÓDULO 5 — WHATSAPP

**Propósito:** Automatizar comunicación con clientes y leads via WhatsApp Business API.

**Sub-secciones:**

#### 5a. Flujos de Automatización

Interfaz visual para crear flujos (similar a n8n o Make pero simple):

```
Disparador: [Nuevo pedido pagado]
    ↓
Esperar: [0 minutos]
    ↓
Enviar mensaje: [Template: Confirmación de pedido]
    ↓
Esperar: [3 días]
    ↓
Enviar mensaje: [Template: ¿Cómo vas con el producto?]
    ↓
Esperar: [14 días]
    ↓
Si: [No ha comprado de nuevo]
    ↓
Enviar mensaje: [Template: Recuerda pedir tu próxima dosis]
```

**Templates incluidos (preconfigurados):**
- Confirmación de pedido
- Confirmación de envío con tracking
- El pedido llegó — ¿lo recibiste bien?
- Seguimiento de uso del producto
- Solicitud de reseña
- Carrito abandonado (si hay integración)
- Recordatorio de recompra

#### 5b. Bandeja de Mensajes

```
┌──────────────────┬────────────────────────────────────────────┐
│ CONVERSACIONES   │  Ana M. — hace 2h                          │
│                  │                                             │
│ 🔴 Ana M.       │  Ana: "Hola, cuándo llega mi pedido?"       │
│  "cuándo llega.."│                                             │
│                  │  [Agente: No has respondido este mensaje]   │
│ ✅ Carlos P.    │                                             │
│  "muchas gracias"│  [Campo de texto para responder...]         │
│                  │                                             │
│ ✅ Lucia T.     │  Información del cliente:                   │
│  "lo recibí"    │  • Nombre: Ana María Torres                 │
│                  │  • Pedido #1043 — PRUSHOT × 2              │
└──────────────────│  • Enviado hace 3 días                      │
                   │  • Dirección: Bogotá, Chapinero             │
                   └────────────────────────────────────────────┘
```

#### 5c. Estadísticas de WhatsApp

- Mensajes enviados vs. entregados vs. leídos
- Tasa de respuesta
- Tiempo promedio de respuesta
- Mensajes por flujo (cuántos completaron cada automatización)
- Conversiones atribuidas a conversaciones de WhatsApp

---

### 4.6 MÓDULO 6 — ANALYTICS Y REPORTES

**Propósito:** Ver el rendimiento histórico, comparar períodos y generar reportes para presentar.

**Vistas:**

#### 6a. Reporte Multi-canal

Gráficas que muestran todos los canales juntos:
- Ventas totales por día (línea)
- Gasto por canal por día (barras apiladas)
- ROAS por canal (líneas múltiples)
- CPA por canal (líneas múltiples)

**Comparación:** "Esta semana vs. semana pasada" / "Este mes vs. mes anterior"

#### 6b. Attribution Report

```
ORIGEN DE VENTAS — Últimos 30 días

Total de ventas: 127

Por primer toque (¿cómo nos conocieron?):
  Meta Ads: 68 ventas (54%)
  Google Search: 31 ventas (24%)
  Orgánico (SEO): 18 ventas (14%)
  WhatsApp Directo: 6 ventas (5%)
  Otros: 4 ventas (3%)

Por último toque (¿qué cerró la venta?):
  Google Search: 45 ventas (35%)
  Meta Ads: 38 ventas (30%)
  Email: 22 ventas (17%)
  WhatsApp: 14 ventas (11%)
  Directo: 8 ventas (6%)
```

#### 6c. Reporte PDF Semanal Automático

Cada lunes, el sistema genera un PDF con:
- Resumen ejecutivo de la semana
- Gráficas de rendimiento
- Top 3 anuncios que más vendieron
- Top 3 problemas detectados
- Recomendaciones para la siguiente semana

El PDF se envía por email al Admin y se guarda en la plataforma.

**Formato del reporte (lenguaje simple):**

```
RESUMEN DE LA SEMANA — 1 al 7 de Abril 2026
Dr. John Salazar — drjohnsalazar.com.co

💰 VENTAS: $3,240,000 COP (↑ 18% vs semana pasada)
📊 ROAS TOTAL: 3.8x (excelente — meta es > 3x)
💸 INVERSIÓN: $850,000 COP
🛒 PEDIDOS: 28 (promedio $115,714 por pedido)

📢 LO QUE MEJOR FUNCIONÓ ESTA SEMANA:
El video de testimonio de cliente en Instagram generó
14 ventas con ROAS 5.2x. Es tu mejor anuncio del mes.

⚠️ LO QUE DEBES REVISAR:
La campaña de búsqueda en Google "comprar hamamelis"
tuvo ROAS 1.8x — por debajo del mínimo rentable.
Recomendamos ajustar las pujas o las palabras clave.

📋 PLAN PARA LA PRÓXIMA SEMANA:
1. Duplicar el presupuesto del video de testimonio
2. Pausar keywords de bajo rendimiento en Google
3. Lanzar campaña de TikTok para el lanzamiento de EP11
```

---

### 4.7 MÓDULO 7 — ALERTAS

**Propósito:** Notificar al usuario de problemas antes de que causen daño económico.

**Tipos de alerta:**

| Alerta | Condición | Urgencia | Canal |
|--------|-----------|----------|-------|
| ROAS bajo | Campaña con ROAS < 1.5 por > 2 días | 🔴 Crítica | Push + Email |
| Presupuesto agotado | < 10% del presupuesto diario restante | 🔴 Crítica | Push + Email |
| Pixel sin datos | Sin eventos en > 3 horas durante horario activo | 🔴 Crítica | Push + Email |
| Anuncio rechazado | Meta/Google rechazó un anuncio | 🔴 Crítica | Push + Email |
| Frecuencia alta | Frecuencia > 4 en campaña activa | 🟡 Advertencia | Push |
| CTR bajo | CTR cayó > 40% vs promedio | 🟡 Advertencia | Push |
| Tráfico caído | Tráfico web -30% vs día anterior | 🟡 Advertencia | Push |
| Competidor nuevo | Nuevo anunciante en las mismas keywords | 🔵 Info | Email |
| Nuevo pedido | Cada nueva venta | 🔵 Info | Push |
| Reseña nueva | Nueva reseña en Google | 🔵 Info | Push |

**Pantalla de alertas:**

```
ALERTAS ACTIVAS

🔴 CRÍTICA — hace 2 horas
Pixel de Meta sin datos
El pixel no ha enviado eventos en 3h durante horario de venta.
Tus campañas están gastando dinero sin poder optimizar.
[Ver cómo solucionar] [Marcar como revisado]

🟡 ADVERTENCIA — hace 1 día
Frecuencia alta en "Varices Mayo"
La frecuencia llegó a 4.2 — los usuarios ven tu anuncio 4 veces.
Esto puede hacer que la campaña se agote y suba el CPA.
[Ver campaña] [Renovar creativo] [Marcar como revisado]

HISTORIAL DE ALERTAS
[Ver todas las alertas pasadas — 30 días]
```

**Configuración de alertas:**
- El usuario puede activar/desactivar cada tipo
- Puede configurar umbrales (ej: alertar cuando ROAS < 2x en lugar de 1.5x)
- Puede elegir canal: solo push, solo email, ambos, ninguno

---

### 4.8 MÓDULO 8 — GUÍA PARA NUEVOS NEGOCIOS

**Propósito:** Guiar a un negocio nuevo desde cero hasta tener toda su presencia digital activa.

**Interfaz — Checklist gamificado:**

```
GUÍA DE LANZAMIENTO DIGITAL
Progreso: ████████░░ 78% completado

FUNDACIÓN (5/5 completados ✅)
  ✅ Registrar dominio web
  ✅ Crear cuenta de Google (Gmail del negocio)
  ✅ Crear página de Facebook
  ✅ Crear cuenta de Instagram Business
  ✅ Vincular Facebook e Instagram

TRACKING (3/4 completados)
  ✅ Instalar Google Analytics 4
  ✅ Instalar Meta Pixel
  ✅ Configurar Google Search Console
  🔲 Configurar eventos de conversión [Pendiente]
      → La IA te explica cómo hacerlo
      [Ver tutorial] [Necesito ayuda]

PUBLICIDAD (0/3 completados)
  🔲 Crear primera campaña de Meta Ads
  🔲 Crear primera campaña de Google Search
  🔲 Configurar pixel de TikTok

OPTIMIZACIÓN (0/4 completados)
  🔲 Subir primeras fotos a Google My Business
  🔲 Conseguir 10 reseñas en Google
  🔲 Publicar 3 posts en Instagram
  🔲 Configurar mensaje automático de WhatsApp

[Ver próximo paso recomendado]
```

Cada paso:
- Tiene una explicación en lenguaje simple
- Un tutorial en video o texto
- Validación automática cuando está hecho (el sistema verifica)
- Posibilidad de pedir ayuda a la IA

---

### 4.9 MÓDULO 9 — CONFIGURACIÓN Y CUENTA

**Secciones:**

#### Perfil del Negocio
- Nombre del negocio
- Logo
- Sitio web
- Industria
- Zona horaria
- Moneda (COP por defecto)
- Idioma

#### Integraciones
Estado de cada integración conectada/desconectada:

```
INTEGRACIONES

🔵 Meta Business            [Conectado — última sync hace 5min] [Desconectar]
   Cuenta: Dr. John Salazar (ID: XXXX)
   Pixel: 4544783402473602 ✅

🔴 Google Ads               [Desconectado]                      [Conectar]
   → Necesitas conectar tu cuenta de Google Ads

🟢 Google Analytics 4       [Conectado]                         [Reconectar]
   Propiedad: drjohnsalazar.com.co (ID: G-XXXX)

🟢 Google Search Console    [Conectado]                         [Reconectar]
   Dominio verificado: drjohnsalazar.com.co

⚫ TikTok Ads               [No configurado]                    [Configurar]

🟢 WhatsApp Business (360d) [Conectado]                         [Reconectar]
   Número: +57 313 6497534
```

#### Gestión de Usuarios

```
USUARIOS DEL EQUIPO

Nombre              | Email               | Rol        | Último acceso
--------------------|---------------------|------------|---------------
Juan Pablo P.       | pablo@...           | Admin      | Ahora
Carlos Herrera      | carlos@...          | Editor     | Hace 2 días

[Invitar nuevo usuario]
```

#### Facturación (futuro SaaS)
- Plan actual, próxima fecha de cobro
- Historial de facturas
- Método de pago

---

## 5. FLUJOS DE USUARIO

### 5.1 Flujo Principal — Revisión Diaria (5–10 minutos)

```
Usuario abre la app (mañana)
    ↓
Ve Dashboard:
    → Ventas de ayer
    → Alertas críticas (si hay)
    → 3 recomendaciones de la IA
    ↓
Si hay alerta crítica:
    → Hace clic → ve el problema → sigue los pasos de solución
    ↓
Revisa las recomendaciones de la IA:
    → "Escalar campaña X" → va a Campañas → sube presupuesto
    → "Renovar creativo Y" → crea recordatorio
    ↓
Revisa brevemente las métricas de las campañas activas
    ↓
Cierra la app
```

### 5.2 Flujo — Crear Nueva Campaña (Meta)

```
Usuario va a Campañas → [+ Nueva campaña]
    ↓
Selecciona: Canal = Meta / Objetivo = Ventas
    ↓
La IA pregunta: "¿Qué producto quieres promover?"
    → Usuario selecciona HAMAMELIS
    → La IA sugiere: audiencia, presupuesto, copy
    ↓
Usuario revisa las sugerencias y ajusta si quiere
    ↓
Sube el creativo (imagen o video)
    ↓
Preview del anuncio en formato mobile
    ↓
[Publicar en Meta Ads]
    ↓
Confirmación: "Tu campaña fue creada. La revisaré en 3 días."
```

### 5.3 Flujo — Recibir Alerta de Pixel Caído

```
Sistema detecta: sin eventos de pixel en 2h
    ↓
Notificación push al usuario: "Alerta: Pixel sin datos"
    ↓
Usuario abre la notificación → va al módulo de Alertas
    ↓
Ve el detalle del problema con explicación en español
    ↓
Ve opciones de solución:
    [Verificar instalación] [Contactar soporte] [Marcar como revisado]
    ↓
Usuario hace clic en "Verificar instalación"
    ↓
La IA verifica en tiempo real y dice:
    "El pixel está instalado pero no está cargando en /checkout.
    Posiblemente hay un conflicto con el CSP."
    ↓
El usuario aplica la solución sugerida
    ↓
El sistema verifica automáticamente si se resolvió
    ↓
Alerta resuelta ✅
```

### 5.4 Flujo — Generar Reporte Semanal

```
Cada lunes a las 9am (automático):
    ↓
Firebase Function se ejecuta (cron job)
    ↓
Recopila datos de todos los canales de la semana
    ↓
Envía datos a Claude API con prompt de reporte
    ↓
Claude genera el reporte en español
    ↓
Sistema convierte a PDF (usando puppeteer o similar)
    ↓
Guarda el PDF en Firebase Storage
    ↓
Envía email al Admin con el PDF adjunto
    ↓
El PDF también aparece en la sección de Reportes de la app
```

---

## 6. MODELO DE DATOS

### 6.1 Colecciones de Firestore

```javascript
// Negocio (tenant)
businesses/{businessId} = {
  name: "Dr. John Salazar",
  domain: "drjohnsalazar.com.co",
  logo: "url",
  plan: "pro",  // free | starter | pro | enterprise
  timezone: "America/Bogota",
  currency: "COP",
  createdAt: timestamp,
  trialEndsAt: timestamp,
  authorizedUsers: ["uid1", "uid2"]
}

// Usuario
businesses/{businessId}/users/{userId} = {
  uid: "firebase-auth-uid",
  email: "pablo@...",
  name: "Juan Pablo",
  role: "admin",  // admin | editor | viewer
  permissions: {
    campaigns: "write",
    analytics: "read",
    whatsapp: "write",
    settings: "admin"
  },
  createdAt: timestamp,
  lastLogin: timestamp
}

// Integración (credenciales de cada API)
businesses/{businessId}/integrations/{platform} = {
  platform: "meta",  // meta | google | tiktok | whatsapp
  status: "connected",  // connected | disconnected | error
  accessToken: "encrypted",  // guardado en Secret Manager
  accountId: "act_XXXXXX",
  pixelId: "4544783402473602",
  lastSync: timestamp,
  metadata: { ... }  // datos extra según plataforma
}

// Campaña (espejo local de lo que hay en Meta/Google)
businesses/{businessId}/campaigns/{campaignId} = {
  externalId: "23855678",  // ID en la plataforma de ads
  platform: "meta",
  name: "Varices Mayo '26",
  status: "active",
  objective: "conversions",
  budget: 500000,  // COP, diario
  startDate: timestamp,
  endDate: null,
  lastSynced: timestamp,
  // Métricas del último sync
  metrics: {
    spend: 450000,
    impressions: 140200,
    clicks: 3926,
    ctr: 2.8,
    conversions: 16,
    revenue: 1440000,
    roas: 3.2,
    cpa: 28125,
    reach: 28400,
    frequency: 2.1
  }
}

// Analytics diario (snapshot de todos los canales)
businesses/{businessId}/analytics/{dateString} = {
  date: "2026-04-08",
  totals: {
    revenue: 3240000,
    spend: 850000,
    roas: 3.8,
    orders: 28,
    leads: 42
  },
  byChannel: {
    meta: { revenue: 1940000, spend: 510000, roas: 3.8 },
    google: { revenue: 970000, spend: 255000, roas: 3.8 },
    tiktok: { revenue: 330000, spend: 85000, roas: 3.9 },
    organic: { revenue: 0, spend: 0, orders: 12 }  // pedidos orgánicos
  }
}

// Conversación con la IA
businesses/{businessId}/conversations/{conversationId} = {
  createdAt: timestamp,
  updatedAt: timestamp,
  title: "Análisis campaña Hamamelis",  // generado por IA
  messages: [
    { role: "user", content: "Mi campaña no funciona", timestamp },
    { role: "assistant", content: "Revisé tu campaña...", timestamp }
  ]
}

// Auditoría
businesses/{businessId}/audits/{auditId} = {
  executedAt: timestamp,
  executedBy: "system",  // o uid del usuario
  score: 72,  // 0-100
  critical: 2,
  warnings: 3,
  passed: 8,
  items: [
    {
      category: "pixel",
      check: "Pixel enviando Purchase con valor",
      status: "fail",
      priority: "critical",
      explanation: "El pixel no incluye el parámetro 'value' en el evento Purchase",
      solution: "Agregar value: precio al disparar el evento fbq('track', 'Purchase', {value: precio, currency: 'COP'})"
    }
  ]
}

// Alerta
businesses/{businessId}/alerts/{alertId} = {
  type: "roas_low",
  severity: "critical",  // critical | warning | info
  title: "ROAS bajo en campaña Hamamelis",
  message: "La campaña lleva 3 días con ROAS 0.8x — estás perdiendo dinero",
  entityType: "campaign",
  entityId: "campaignId",
  status: "active",  // active | resolved | dismissed
  createdAt: timestamp,
  resolvedAt: null
}

// Reporte semanal generado
businesses/{businessId}/reports/{reportId} = {
  period: "2026-04-01_2026-04-07",
  generatedAt: timestamp,
  pdfUrl: "firebase-storage-url",
  summary: "Buena semana con ROAS 3.8x...",
  highlights: [...],
  issues: [...],
  recommendations: [...]
}
```

---

## 7. INTEGRACIONES DE API

### 7.1 Meta Marketing API

**Autenticación:**
- OAuth 2.0 — el usuario conecta su Facebook Business Account
- Se guarda el `long-lived access token` en Firebase Secret Manager
- El token dura 60 días → renovar automáticamente antes de expirar

**Endpoints a usar:**

```javascript
// Listar campañas
GET /{ad-account-id}/campaigns?fields=id,name,status,objective,daily_budget

// Métricas de campaña
GET /{campaign-id}/insights?fields=spend,impressions,clicks,ctr,actions,roas&date_preset=last_7d

// Listar anuncios
GET /{ad-account-id}/ads?fields=id,name,status,creative,adset_id

// Crear campaña (Fase 2)
POST /{ad-account-id}/campaigns

// Estado del pixel
GET /{pixel-id}/stats?start_time=X&end_time=Y
```

**Rate limits:** 200 llamadas por hora por cuenta. Manejar con cola y retry.

### 7.2 Google Ads API

**Autenticación:**
- OAuth 2.0 con Google
- Refresh token guardado en Secret Manager
- Developer token de Google Ads requerido (solicitar a Google)

**Endpoints/Queries (Google Ads usa GAQL — SQL-like):**

```sql
-- Listar campañas con métricas
SELECT
  campaign.id, campaign.name, campaign.status,
  metrics.cost_micros, metrics.impressions, metrics.clicks,
  metrics.conversions, metrics.conversion_value,
  metrics.ctr, metrics.average_cpc
FROM campaign
WHERE segments.date DURING LAST_7_DAYS

-- Keywords con quality score
SELECT
  ad_group_criterion.keyword.text,
  ad_group_criterion.quality_info.quality_score,
  metrics.impressions, metrics.clicks
FROM keyword_view
WHERE segments.date DURING LAST_7_DAYS
```

### 7.3 Google Search Console API

**Endpoints:**

```javascript
// Performance data (clics, impresiones, CTR, posición)
POST /webmasters/v3/sites/{siteUrl}/searchAnalytics/query
{
  startDate: "2026-04-01",
  endDate: "2026-04-07",
  dimensions: ["query", "page"],
  rowLimit: 100
}

// Estado de indexación
GET /webmasters/v3/sites/{siteUrl}/sitemaps

// Inspeccionar URL
POST /v1/urlInspection/index:inspect
```

### 7.4 Google PageSpeed API

```javascript
// Analizar velocidad de página
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed
  ?url=https://drjohnsalazar.com.co
  &strategy=mobile  // o desktop
  &key={API_KEY}
```

Devuelve: score, LCP, FID, CLS, TBT, FCP, SI

### 7.5 WhatsApp Business API (360dialog)

**Endpoints:**

```javascript
// Enviar mensaje de texto
POST /v1/messages
{
  to: "573136497534",
  type: "template",
  template: {
    namespace: "...",
    name: "confirmacion_pedido",
    language: { code: "es_CO" },
    components: [{ type: "body", parameters: [...] }]
  }
}

// Estado del mensaje
GET /v1/messages/{messageId}

// Webhooks para mensajes entrantes
// Configurar URL en 360dialog para recibir mensajes
```

### 7.6 Claude API (IA)

**Modelo:** `claude-sonnet-4-6`

**Uso:**

```javascript
// Chat con contexto del negocio
POST https://api.anthropic.com/v1/messages
{
  model: "claude-sonnet-4-6",
  max_tokens: 2048,
  system: `Eres el asistente de marketing de la plataforma.
    Contexto del negocio: ${JSON.stringify(businessContext)}
    Campañas activas: ${JSON.stringify(campaigns)}
    Métricas de hoy: ${JSON.stringify(todayMetrics)}
    Alertas activas: ${JSON.stringify(alerts)}
    
    Responde siempre en español colombiano claro.
    Da recomendaciones específicas y accionables.
    Usa números reales del contexto.
    No uses jerga técnica innecesaria.`,
  messages: conversationHistory
}
```

**Sistema de prompts por función:**

| Función | Prompt especializado |
|---------|---------------------|
| Análisis de campaña | Contexto de la campaña + benchmarks del sector |
| Generación de copies | Producto + audiencia + canal + tono de la marca |
| Reporte semanal | Datos de la semana + comparación semana anterior |
| Auditoría | Resultados de los checks + prioridades de negocio |
| Proyecciones | Datos históricos + tendencias + estacionalidad |
| Explicar métrica | Definición + contexto del negocio + benchmark |

### 7.7 TikTok Marketing API

**Autenticación:** OAuth 2.0 con TikTok for Business

**Endpoints principales:**

```javascript
// Métricas de campañas
GET /open_api/v1.3/report/integrated/get/
  ?advertiser_id={id}
  &metrics=["spend","impressions","clicks","ctr","conversions"]
  &data_level=AUCTION_CAMPAIGN
  &start_date=2026-04-01
  &end_date=2026-04-07

// Video performance
GET /open_api/v1.3/report/integrated/get/
  ?metrics=["video_play_actions","video_watched_2s","video_watched_6s","video_views_p100"]
```

---

## 8. MOTOR DE INTELIGENCIA ARTIFICIAL

### 8.1 Arquitectura de la IA

La IA no es un modelo aislado — es un sistema que combina:
1. **Datos en tiempo real** del negocio (campañas, métricas, alertas)
2. **Base de conocimiento** de marketing (documento 01)
3. **Claude API** como motor de razonamiento
4. **Prompts especializados** por función

### 8.2 Sistema de Contexto (Context Window Management)

Claude tiene un límite de tokens. Para manejarlo eficientemente:

```javascript
// Contexto que siempre va incluido (comprimido)
const coreContext = {
  business: { name, industry, products },
  today: { revenue, spend, roas, orders },
  campaigns: campaigns.map(c => ({
    name: c.name, platform: c.platform, roas: c.roas, 
    status: c.status, spend: c.spend
  })), // Solo datos clave, no todo
  alerts: activeAlerts
};

// Contexto adicional según la pregunta
const additionalContext = await getRelevantContext(userMessage);
// Si pregunta sobre una campaña específica, traer sus datos completos
// Si pregunta sobre SEO, traer datos de Search Console
```

### 8.3 Recomendaciones Automáticas del Dashboard

Cada mañana, una Firebase Function ejecuta:

```javascript
async function generateDailyRecommendations(businessId) {
  const [campaigns, metrics, alerts] = await Promise.all([
    getCampaigns(businessId),
    getTodayMetrics(businessId),
    getActiveAlerts(businessId)
  ]);

  const prompt = `
    Analiza los datos de marketing de este negocio y genera exactamente 
    3 recomendaciones accionables para hoy.
    
    Formato: cada recomendación debe tener:
    - Prioridad: 🔴 crítica / 🟡 importante / 🟢 oportunidad
    - Qué hacer (una sola acción concreta)
    - Por qué (la razón en una frase)
    
    Datos: ${JSON.stringify({ campaigns, metrics, alerts })}
  `;

  const response = await claude.messages.create({...});
  await saveRecommendations(businessId, response);
}
```

### 8.4 Detección de Anomalías

El sistema verifica automáticamente cada 4 horas:

```javascript
const anomalyChecks = [
  {
    name: "roas_low",
    check: (campaigns) => campaigns.filter(c => c.roas < 1.5 && c.status === "active"),
    message: (c) => `La campaña "${c.name}" tiene ROAS ${c.roas}x — por debajo del mínimo rentable`
  },
  {
    name: "frequency_high",
    check: (campaigns) => campaigns.filter(c => c.frequency > 4 && c.platform === "meta"),
    message: (c) => `La campaña "${c.name}" tiene frecuencia ${c.frequency} — renovar creativo`
  },
  {
    name: "pixel_no_data",
    check: async (business) => {
      const events = await getPixelEvents(business.pixelId, "2h");
      return events.length === 0 && isBusinessHours();
    },
    message: () => "El pixel de Meta no ha enviado datos en 2 horas durante horario de negocio"
  },
  {
    name: "budget_depleting",
    check: (campaigns) => campaigns.filter(c => c.budgetRemaining < c.dailyBudget * 0.1),
    message: (c) => `La campaña "${c.name}" tiene solo el 10% del presupuesto diario restante`
  }
];
```

### 8.5 Generador de Copies

Prompt especializado para generar textos de anuncios:

```
Eres un copywriter experto en marketing digital para negocios colombianos.
Vas a crear copies para [CANAL] para el producto [NOMBRE] de [NEGOCIO].

Información del producto:
- Nombre: [PRODUCTO]
- Precio: [PRECIO]
- Beneficio principal: [BENEFICIO]
- Audiencia objetivo: [AUDIENCIA]
- Tono de la marca: [TONO]

Genera 5 variantes de cada elemento:
1. Títulos (máximo 40 caracteres para Meta, 30 para Google)
2. Cuerpo del texto (150 caracteres para Meta primario)
3. CTAs (5 opciones)

Usa el lenguaje natural de un colombiano que habla con alguien de confianza.
No uses anglicismos. Incluye emojis donde sea apropiado para Meta/TikTok.
```

---

## 9. STACK TECNOLÓGICO DETALLADO

### 9.1 Frontend

```
React 18 + Vite 5
├── React Router v6 (navegación)
├── React Query (gestión de estado del servidor, caché)
├── Zustand (estado global del cliente — usuario, negocio activo)
├── Recharts (gráficas de métricas)
├── React Hot Toast (notificaciones)
├── date-fns (manejo de fechas)
└── Tailwind CSS (estilos — alternativa o complemento al CSS actual)
```

**Estructura de carpetas:**

```
src/
├── components/
│   ├── common/         # Botones, inputs, modales, etc.
│   ├── charts/         # Gráficas de métricas
│   ├── alerts/         # Componentes de alertas
│   └── ia/             # Chat con IA
├── pages/
│   ├── dashboard/
│   ├── campaigns/
│   ├── ai-chat/
│   ├── audit/
│   ├── whatsapp/
│   ├── analytics/
│   ├── alerts/
│   ├── guide/
│   └── settings/
├── hooks/              # Custom hooks (useMetrics, useCampaigns, etc.)
├── services/           # Llamadas a Firebase y APIs
│   ├── metaService.js
│   ├── googleService.js
│   ├── aiService.js
│   └── auditService.js
├── store/              # Estado global (Zustand)
└── utils/              # Helpers, formatters, etc.
```

### 9.2 Backend (Firebase Functions)

```javascript
// Funciones disponibles

// Sincronización de datos de ads (cron cada hora)
exports.syncMetaCampaigns = onSchedule("every 1 hours", ...)
exports.syncGoogleCampaigns = onSchedule("every 1 hours", ...)
exports.syncTikTokCampaigns = onSchedule("every 1 hours", ...)

// Detección de anomalías y alertas (cron cada 4 horas)
exports.checkAnomalies = onSchedule("every 4 hours", ...)

// Recomendaciones diarias (cron cada mañana 8am)
exports.generateDailyRecommendations = onSchedule("0 8 * * *", ...)

// Reporte semanal (cron lunes 9am)
exports.generateWeeklyReport = onSchedule("0 9 * * 1", ...)

// APIs del frontend (HTTP)
exports.chatWithAI = onRequest(...)              // Chat con IA
exports.runAudit = onRequest(...)                // Ejecutar auditoría
exports.generateCopy = onRequest(...)            // Generar copies
exports.sendWhatsAppMessage = onRequest(...)     // Enviar WA
exports.createMetaCampaign = onRequest(...)      // Crear campaña en Meta
exports.getMetaOAuthUrl = onRequest(...)         // OAuth Meta
exports.handleMetaOAuthCallback = onRequest(...) // Callback OAuth Meta

// Webhooks (recibir datos)
exports.webhookEpayco = onRequest(...)           // Ya existe
exports.webhookWhatsApp = onRequest(...)         // Mensajes entrantes WA
exports.webhookMeta = onRequest(...)             // Cambios en campañas
```

### 9.3 Bases de Datos

**Firestore:** Datos del negocio (colecciones descritas en sección 6)

**Firebase Storage:**
- Creativos subidos (imágenes y videos de anuncios)
- Reportes PDF generados
- Logos de negocios

**Firebase Secret Manager:**
- Claude API Key
- Meta App Secret
- Google OAuth Client Secret
- WhatsApp API Key por negocio
- TikTok App Secret

### 9.4 Hosting y CI/CD

```
GitHub (código fuente)
    ↓ Push a main
Netlify (frontend)         Firebase (backend)
    ↓ Build automático         ↓ Manual: firebase deploy --only functions
    ↓ Deploy a CDN global      ↓ O con GitHub Actions
Dominio: [plataforma].com  Functions en Cloud Run
```

### 9.5 Servicios Externos

| Servicio | Uso | Costo estimado |
|---------|-----|---------------|
| Claude API | Motor de IA | $0.003/1k tokens = ~$50/mes con uso moderado |
| Resend | Emails transaccionales + reportes | $20/mes |
| 360dialog | WhatsApp Business API | $0.02/mensaje + $5/mes |
| Firebase Blaze | Firestore + Functions + Storage | $25–50/mes |
| Netlify | Hosting frontend | $0 (free tier) o $19/mes (Pro) |

---

## 10. SEGURIDAD Y PRIVACIDAD

### 10.1 Autenticación

- **Firebase Auth** para todos los usuarios
- MFA (Multi-Factor Authentication) disponible para admins
- Sesiones expiran en 7 días de inactividad
- Rate limiting en login: bloqueo tras 10 intentos fallidos

### 10.2 Autorización

- Cada request a Firestore verifica que el usuario pertenece al negocio
- Las Firebase Functions verifican el Firebase ID Token en el header
- Nunca exponer claves de API externas al frontend
- Todas las claves sensibles en Firebase Secret Manager

### 10.3 Datos Sensibles

- Los access tokens de Meta/Google se guardan cifrados
- Los números de WhatsApp de clientes se tratan como datos personales
- Los datos de análisis no incluyen información personal identificable (PII)
- Cumplimiento con HABEAS DATA (ley colombiana de protección de datos)

### 10.4 CSP y Headers de Seguridad

Para la plataforma (separada del sitio del doctor):

```toml
[headers.values]
  Content-Security-Policy = "default-src 'self'; ..."
  X-Frame-Options = "DENY"
  X-Content-Type-Options = "nosniff"
  Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
```

### 10.5 Logs y Auditoría de Acceso

- Todas las acciones de usuario se registran en Firestore con timestamp y uid
- Los logs de errores van a Firebase Crashlytics (frontend) y Cloud Logging (functions)
- Alertas de acceso inusual (login desde nuevo país, múltiples sesiones simultáneas)

---

## 11. FASES DE DESARROLLO

### Fase 1 — MVP Básico (Semanas 1–3)

**Objetivo:** Plataforma funcional para el Dr. John Salazar con las funciones más usadas.

**Entregables:**
- [ ] Autenticación multi-usuario (Admin + Editor)
- [ ] Dashboard básico con ventas de Firestore (datos ya existentes)
- [ ] Chat con IA (Claude API) con contexto básico del negocio
- [ ] Módulo de Auditoría: SEO técnico + Pixel básico
- [ ] Gestión de alertas básica (ROAS bajo, pixel sin datos)
- [ ] Estructura multi-tenant en Firestore

**Métricas de éxito:**
- El Dr. John Salazar puede ver sus ventas del día
- Puede chatear con la IA y recibir recomendaciones útiles
- La auditoría detecta problemas reales

---

### Fase 2 — Integración Meta (Semanas 4–5)

**Objetivo:** Ver campañas de Meta dentro de la plataforma.

**Entregables:**
- [ ] OAuth con Meta Business — flujo de conexión
- [ ] Sync de campañas de Meta (nombre, status, presupuesto)
- [ ] Métricas de Meta: gasto, ROAS, CTR, CPA, frecuencia
- [ ] Análisis de campaña con IA (botón "Analizar con IA")
- [ ] Alertas basadas en métricas de Meta (frecuencia alta, ROAS bajo)
- [ ] Dashboard actualizado con datos de Meta

---

### Fase 3 — Google + Reportes (Semanas 6–7)

**Objetivo:** Integrar Google y activar reportes automatizados.

**Entregables:**
- [ ] OAuth con Google — Google Ads + Search Console
- [ ] Sync de campañas de Google Ads
- [ ] Datos de Search Console (keywords, CTR, posición)
- [ ] Auditoría Google: Quality Score, keywords negativas, Core Web Vitals
- [ ] Reporte semanal PDF automático por email
- [ ] Analytics multi-canal (ventas por origen)

---

### Fase 4 — WhatsApp + Automaciones (Semanas 8–9)

**Objetivo:** Automatizar comunicación por WhatsApp.

**Entregables:**
- [ ] Integración 360dialog WhatsApp API
- [ ] Flujos automáticos: confirmación, seguimiento, reseña
- [ ] Bandeja de mensajes básica
- [ ] Estadísticas de WhatsApp (entregados, leídos, respondidos)
- [ ] Alertas por WhatsApp además de email

---

### Fase 5 — TikTok + Creación de Anuncios (Semanas 10–12)

**Objetivo:** Completar integraciones y permitir crear anuncios desde la plataforma.

**Entregables:**
- [ ] Integración TikTok Ads API
- [ ] Formulario para crear anuncios en Meta
- [ ] Generador de copies con IA
- [ ] A/B testing entre creativos
- [ ] Guía para nuevos negocios (checklist completo)
- [ ] Panel de Super Admin (gestión de múltiples clientes)

---

### Fase 6 — SaaS (Semanas 13–16)

**Objetivo:** La plataforma está lista para venderse a otros negocios.

**Entregables:**
- [ ] Página de landing de la plataforma
- [ ] Onboarding automático para nuevos clientes
- [ ] Integración de pagos (suscripciones mensuales)
- [ ] Planes: Starter ($100/mes), Pro ($200/mes), Enterprise ($300/mes)
- [ ] Documentación para usuarios
- [ ] Sistema de soporte básico (chat interno)

---

## 12. COSTOS Y MONETIZACIÓN

### 12.1 Costos Operativos Mensuales (estimado a escala)

**Con 1 cliente (Dr. John Salazar):**
| Servicio | Costo/mes |
|---------|----------|
| Claude API (moderado) | $30–50 USD |
| Firebase Blaze | $25 USD |
| Netlify | $0 (free) |
| Resend (emails) | $0 (free tier 3k emails) |
| 360dialog WhatsApp | $5 + mensajes |
| **Total** | **~$65 USD/mes** |

**Con 10 clientes:**
| Servicio | Costo/mes |
|---------|----------|
| Claude API | $150–250 USD |
| Firebase Blaze | $80–120 USD |
| Netlify Pro | $19 USD |
| Resend | $20 USD |
| WhatsApp × 10 | $50 USD |
| **Total** | **~$340–460 USD/mes** |

### 12.2 Modelo de Precios (Planes SaaS)

| Plan | Precio | Clientes objetivo | Incluye |
|------|--------|------------------|---------|
| **Starter** | $100 USD/mes | Negocios pequeños, 1 persona | Meta + 1 canal, Chat IA básico, 1 usuario |
| **Pro** | $200 USD/mes | Negocios medianos, equipo pequeño | Todos los canales, Chat IA completo, 5 usuarios, WhatsApp |
| **Enterprise** | $300 USD/mes | Agencias, negocios grandes | Todo + soporte prioritario, usuarios ilimitados, API access |

**Márgenes estimados con 10 clientes (promedio $200/mes):**
- Ingresos: $2,000 USD/mes
- Costos: $400 USD/mes
- Margen: ~80%

**Con 30 clientes:**
- Ingresos: $6,000 USD/mes
- Costos: ~$1,000 USD/mes
- Margen: ~83%

### 12.3 Estrategia de Adquisición de Clientes

**Fase 1 (0–5 clientes):** Referidos directos
- El Dr. John Salazar recomienda a colegas médicos/negocios
- Demo personalizada + onboarding manual
- Precio especial para primeros clientes ($50–100/mes)

**Fase 2 (5–20 clientes):** Inbound
- Contenido en LinkedIn + Instagram mostrando resultados
- Caso de estudio del Dr. John Salazar
- SEO para "plataforma marketing digital Colombia"

**Fase 3 (20+ clientes):** Escalado
- Afiliados (agencias que revenden)
- Google Ads + Meta Ads para la propia plataforma
- Partnerships con cámaras de comercio / gremios empresariales

---

## NOTAS FINALES

### Decisiones Técnicas Importantes

1. **No usar Redux/Zustand desde el inicio** — React Query maneja el 80% del estado. Zustand solo para datos de UI global (usuario activo, negocio activo).

2. **Firestore vs. PostgreSQL** — Firestore escala sin configuración y ya está en el proyecto. PostgreSQL daría mejor soporte a queries complejas de analytics, pero requeriría un servidor. Revisitar si el módulo de analytics se vuelve muy complejo.

3. **Claude API vs. OpenAI** — Claude tiene mejor razonamiento en español y contexto más largo (útil para incluir muchos datos de campañas en un solo mensaje).

4. **Firebase Functions vs. Railway** — Firebase Functions para serverless y simplicidad. Si las funciones de sync se vuelven muy costosas, migrar el backend de sync a un servidor en Railway.

5. **No construir el administrador de anuncios completo desde el inicio** — La creación de anuncios desde la plataforma es compleja. En Fase 1-3, enfocarse en lectura y análisis. La creación viene en Fase 5 cuando hay más datos y feedback.

### Riesgos y Mitigaciones

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|-----------|
| Meta revoca el acceso de la API | Media | Tener proceso de reconexión simple + alertas |
| Costo de IA escala demasiado | Baja | Cachear respuestas similares, limitar longitud de contexto |
| Google Ads API requiere aprobación | Alta | Solicitar acceso básico desde el inicio, mientras tanto usar Search Console |
| Cliente no adopta la plataforma | Media | Onboarding guiado + Quick wins visibles en Semana 1 |
| Datos de campañas con delay | Baja | Indicar claramente cuándo fue el último sync |

---

*Documento creado en Abril 2026*  
*Caso piloto: Dr. John Salazar — drjohnsalazar.com.co*  
*Actualizar conforme avance el desarrollo*
