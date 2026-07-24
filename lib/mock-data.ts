import {
  BarChart3,
  FileText,
  Package,
  RefreshCw,
  Ruler,
  Shirt,
  Tag,
} from "lucide-react";
import type { CategoryCard, SuggestedQuestion } from "./types";

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: "talle-alto", text: "¿Tienen jeans de talle alto?", icon: Shirt },
  { id: "cambios", text: "¿Cómo puedo hacer un cambio?", icon: RefreshCw },
  { id: "envios", text: "¿Cuál es su política de envíos?", icon: FileText },
  { id: "promociones", text: "¿Qué promociones hay hoy?", icon: Tag },
  { id: "stock-40", text: "¿Tienen stock de la talla 40?", icon: Package },
];

export const categoryCards: CategoryCard[] = [
  {
    id: "productos",
    title: "Productos",
    subtitle: "Consulta sobre jeans",
    icon: Shirt,
    accentVar: "cat-productos",
  },
  {
    id: "ventas",
    title: "Ventas",
    subtitle: "Historial de ventas",
    icon: BarChart3,
    accentVar: "cat-ventas",
  },
  {
    id: "tallas",
    title: "Tallas",
    subtitle: "Guía de tallas",
    icon: Ruler,
    accentVar: "cat-tallas",
  },
  {
    id: "cambios",
    title: "Cambios",
    subtitle: "Política de cambios",
    icon: RefreshCw,
    accentVar: "cat-cambios",
  },
  {
    id: "descuentos",
    title: "Descuentos",
    subtitle: "Promociones",
    icon: Tag,
    accentVar: "cat-descuentos",
  },
  {
    id: "stock",
    title: "Stock",
    subtitle: "Disponibilidad",
    icon: Package,
    accentVar: "cat-stock",
  },
];

interface CannedReply {
  keywords: string[];
  content: string;
}

const cannedReplies: CannedReply[] = [
  {
    keywords: ["talle alto", "tiro alto", "cintura alta"],
    content:
      "Tenemos los siguientes modelos de talle alto:\n- Urban Skinny\n- Classic Skinny\n- Black Slim\n\nTodos disponibles desde la talla 36.",
  },
  {
    keywords: ["productos", "modelos", "jeans"],
    content:
      "Contamos con modelos skinny, slim, recto y wide leg, para hombre y mujer, en distintos colores y lavados.",
  },
  {
    keywords: ["cambio", "devolución", "devolver"],
    content:
      "Puedes solicitar un cambio dentro de los 10 días corridos desde que recibes el producto, siempre que esté sin uso y con etiquetas originales.",
  },
  {
    keywords: ["envío", "envio", "entrega", "despacho"],
    content:
      "Los envíos a domicilio demoran entre 2 y 5 días hábiles según la región. También puedes retirar tu pedido gratis en tienda.",
  },
  {
    keywords: ["promoción", "promocion", "descuento", "oferta"],
    content:
      "Actualmente tenemos 20% de descuento en la línea de jeans de segunda temporada y despacho gratis en compras sobre $40.000.",
  },
  {
    keywords: ["venta", "ventas", "vendido"],
    content:
      "El modelo más vendido este año ha sido Urban Skinny, seguido por Classic Straight y Black Slim.",
  },
  {
    keywords: ["talla", "guía de tallas", "guia de tallas"],
    content:
      "Nuestras tallas van de la 36 a la 46. Si estás entre dos tallas, recomendamos elegir la mayor para un calce más cómodo.",
  },
  {
    keywords: ["stock", "disponibilidad", "talla 40"],
    content:
      "La talla 40 tiene stock disponible en la mayoría de nuestros modelos skinny y recto. La disponibilidad puede variar por color.",
  },
];

const fallbackReply: CannedReply = {
  keywords: [],
  content:
    "No tengo información específica sobre eso todavía, pero puedo ayudarte con productos, tallas, cambios, envíos, promociones o stock.",
};

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(DIACRITICS_REGEX, "");
}

export function getReplyFor(question: string): { content: string } {
  const normalized = normalize(question);
  const match = cannedReplies.find((reply) =>
    reply.keywords.some((keyword) => normalized.includes(normalize(keyword)))
  );
  const reply = match ?? fallbackReply;
  return { content: reply.content };
}
