export interface ConsultaResponse {
  pregunta: string;
  respuesta: string;
  documentos_encontrados: boolean;
  citaciones: { archivo: string; contenido: string }[];
}

interface ConsultaErrorResponse {
  error: string;
}

export async function postConsulta(pregunta: string): Promise<ConsultaResponse> {
  const res = await fetch("/api/consultas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pregunta }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data || typeof data.respuesta !== "string") {
    const message = (data as ConsultaErrorResponse | null)?.error
      ?? "No pudimos obtener una respuesta. Intenta nuevamente.";
    throw new Error(message);
  }

  return data as ConsultaResponse;
}
