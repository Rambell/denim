import { NextResponse } from "next/server";

const DEFAULT_BACKEND_URL = "http://localhost:8000";

const GREETING_REGEX =
  /^(?:(hola+|holi+|hey|buen(?:os|as)(?:\s+(?:dias|tardes|noches))?|que tal|saludos)(?:\s+(?:como estas|como andas|como te va|todo bien|tu))?|como estas|como andas|como te va)$/;

const ACCENT_MARKS_REGEX = /[̀-ͯ]/g;
const PUNCTUATION_REGEX = /[¡!¿?.,]/g;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(ACCENT_MARKS_REGEX, "")
    .replace(PUNCTUATION_REGEX, "")
    .trim()
    .replace(/\s+/g, " ");
}

function isGreeting(pregunta: string): boolean {
  return GREETING_REGEX.test(normalize(pregunta));
}

const NO_ANSWER_FALLBACK =
  "No encontré información específica sobre eso en nuestros documentos. Puedo ayudarte con:\n" +
  "- Productos y tallas\n" +
  "- Cambios y devoluciones\n" +
  "- Envíos y tiempos de entrega\n" +
  "- Descuentos y promociones\n" +
  "- Stock disponible\n\n" +
  "¿Sobre cuál te gustaría consultar?";

export async function POST(request: Request) {
  let pregunta: unknown;

  try {
    const body = await request.json();
    pregunta = body?.pregunta;
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  if (typeof pregunta !== "string" || !pregunta.trim()) {
    return NextResponse.json({ error: "La pregunta es requerida." }, { status: 400 });
  }

  if (isGreeting(pregunta)) {
    return NextResponse.json(
      {
        pregunta,
        respuesta: "¡Hola! ¿Qué quieres consultar hoy?",
        documentos_encontrados: false,
        citaciones: [],
      },
      { status: 200 },
    );
  }

  const backendUrl = process.env.BACKEND_API_URL ?? DEFAULT_BACKEND_URL;

  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${backendUrl}/api/consultas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta }),
    });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el servicio de respuestas. Intenta nuevamente en unos segundos." },
      { status: 502 },
    );
  }

  if (!backendResponse.ok) {
    return NextResponse.json(
      { error: "El servicio de respuestas devolvió un error." },
      { status: backendResponse.status >= 500 ? 502 : backendResponse.status },
    );
  }

  const data = await backendResponse.json().catch(() => null);
  if (!data) {
    return NextResponse.json({ error: "El servicio de respuestas devolvió un error." }, { status: 502 });
  }

  if (!data.documentos_encontrados) {
    data.respuesta = NO_ANSWER_FALLBACK;
  }

  return NextResponse.json(data, { status: 200 });
}
