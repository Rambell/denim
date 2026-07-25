# DenimHouse Chile — Chat de atención al cliente

[![Frontend en producción](https://img.shields.io/badge/Frontend-en%20producción-brightgreen)](https://denim-eta.vercel.app/)
[![Backend API](https://img.shields.io/badge/Backend%20API-Swagger-009688)](http://161.153.218.81:8000/docs)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](#tecnologías-utilizadas)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](#tecnologías-utilizadas)

Interfaz de chat en Next.js para el agente de atención al cliente de
DenimHouse Chile. Permite a los clientes preguntar en lenguaje natural sobre
productos, tallas, envíos, cambios/devoluciones, privacidad y stock, y recibe
respuestas generadas por RAG desde el backend FastAPI.

## Enlaces del proyecto

| | Producción | Repositorio |
|---|---|---|
| **Frontend** (este repo) | [denim-eta.vercel.app](https://denim-eta.vercel.app/) | [github.com/Rambell/denim](https://github.com/Rambell/denim) |
| **Backend** | [API docs (Swagger)](http://161.153.218.81:8000/docs) | [github.com/Rambell/proyectoChallenger](https://github.com/Rambell/proyectoChallenger) |

## Tecnologías utilizadas

- **[Next.js 16](https://nextjs.org/)** (App Router) — framework de React, incluye el Route Handler que actúa de proxy hacia el backend.
- **[React 19](https://react.dev/)** / **[TypeScript](https://www.typescriptlang.org/)** — UI tipada.
- **[Tailwind CSS 4](https://tailwindcss.com/)** — estilos.
- **[lucide-react](https://lucide.dev/)** — iconografía.
- **Vercel** — hosting del frontend.

## Arquitectura

El frontend nunca llama directamente al backend FastAPI desde el navegador:
las peticiones pasan por un Route Handler de Next.js que actúa como proxy
servidor-a-servidor. Esto evita configurar CORS en el backend y mantiene la
URL real del backend fuera del bundle del cliente.

```
Navegador (chat UI)
        │  fetch same-origin
        ▼
Next.js Route Handler  ──►  POST /api/consultas
  (app/api/consultas/route.ts)
        │  fetch server-to-server
        ▼
Backend FastAPI (RAG)  ──►  ${BACKEND_API_URL}/api/consultas
```

El Route Handler además resuelve, antes de tocar el backend:

- **Saludos** ("hola", "buenas tardes", "qué tal", etc.) → responde de
  inmediato con un saludo, sin gastar una consulta al RAG.
- **Sin resultados** (`documentos_encontrados: false`) → en vez de mostrar
  el "No lo se" crudo del backend, sugiere los temas disponibles para que
  la conversación siga.
- **Backend caído o con error** → devuelve un mensaje de error controlado;
  el proceso de Next.js nunca se cae por esto.

### Estructura del proyecto

```
app/
  page.tsx                  # Página principal: estado del chat, envío de mensajes
  layout.tsx                # Layout raíz, fuentes y tema claro/oscuro
  api/
    consultas/route.ts      # Proxy hacia POST {BACKEND_API_URL}/api/consultas
components/
  chat/                     # Header, input, burbujas, indicador "escribiendo...", bienvenida
  sidebar/                  # Preguntas sugeridas
  theme/                    # Toggle de tema
  ui/                       # Primitivos (botón, avatar, card)
lib/
  api.ts                    # Cliente fetch hacia /api/consultas
  types.ts                  # Tipos compartidos (ChatMessage, etc.)
  mock-data.ts              # Preguntas sugeridas y categorías del sidebar
  utils.ts                  # Helpers (cn, etc.)
```

## Funcionalidades

- Chat en tiempo real contra el backend RAG (Gemini con fallback a Groq).
- Respuesta a saludos sin golpear el backend.
- Indicador de "escribiendo…" mientras se espera la respuesta.
- Sugerencia de temas disponibles cuando no hay información para responder.
- Manejo de errores de red/backend sin romper la conversación.
- Preguntas sugeridas y categorías rápidas en el sidebar.
- Tema claro/oscuro.

## Instalación

```bash
npm install
```

Copia `.env.example` a `.env.local`:

```bash
copy .env.example .env.local
```

- `BACKEND_API_URL`: URL base del backend FastAPI (server-side, no se expone
  al navegador). En desarrollo local: `http://localhost:8000`. En
  producción, apunta a la instancia OCI del backend.

## Ejecutar

Con el [backend](https://github.com/Rambell/proyectoChallenger) corriendo
(local o en producción) y `BACKEND_API_URL` configurado:

```bash
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Deploy en Vercel

El frontend está desplegado en Vercel: **[denim-eta.vercel.app](https://denim-eta.vercel.app/)**.

La variable de entorno `BACKEND_API_URL` está configurada en el proyecto de
Vercel apuntando al backend en producción (OCI), para que el Route Handler
proxy pueda alcanzarlo.
