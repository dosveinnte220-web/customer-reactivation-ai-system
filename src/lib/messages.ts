import type { BusinessSettings, Customer } from "@/lib/types";

export type MessageTemplateInput = {
  businessType: string;
  campaignObjective: string;
  channel: string;
  tone: string;
  offer?: string;
  maxLength?: number;
  segment: string;
  language?: "en" | "es";
  customer: Customer;
  settings?: BusinessSettings;
};

const englishByTone = {
  friendly: [
    "Hi {{first_name}}, we’ve missed seeing you at the {{business_type}} lately. We’d love to welcome you back with a quick restart plan and a few fresh options.",
    "Hi {{first_name}}, it’s been a while since your last visit. We’d love to help you get back into your routine with a simple, low-pressure plan.",
  ],
  professional: [
    "Hi {{first_name}}, we notice it has been some time since your last visit. We would welcome the opportunity to reconnect and review your options.",
    "Hi {{first_name}}, we’d be glad to help you get back on track. We can review current offerings and get you started again.",
  ],
  empathetic: [
    "Hi {{first_name}}, we know life gets busy. We’d love to help you ease back into your routine and make your next visit feel comfortable again.",
    "Hi {{first_name}}, we’ve missed you and hope you’re doing well. If you’re ready to return, we’re happy to help you get back into the rhythm that works for you.",
  ],
  energetic: [
    "Hi {{first_name}}, it’s time for a fresh start. We’ve missed your energy and would love to help you jump back in with a motivating plan.",
    "Hi {{first_name}}, we’ve been thinking about you and want to help you get back in motion with a few easy ways to reconnect.",
  ],
} as const;

const spanishByTone = {
  friendly: [
    "Hola {{first_name}}, hemos extrañado verte en el {{business_type}}. Nos encantaría darte la bienvenida de regreso con un plan sencillo para retomar tu rutina.",
    "Hola {{first_name}}, ha pasado un tiempo desde tu última visita. Nos encantaría ayudarte a volver con opciones simples y sin presión.",
  ],
  professional: [
    "Hola {{first_name}}, notamos que ha pasado un tiempo desde tu última visita. Nos gustaría ayudarte a reconectarte con nuestras opciones actuales.",
    "Hola {{first_name}}, estaríamos encantados de ayudarte a retomar tu rutina con un plan personalizado y sencillo.",
  ],
  empathetic: [
    "Hola {{first_name}}, sabemos que la vida puede ser ocupada. Nos encantaría ayudarte a volver a tu rutina con una experiencia cómoda y sin presión.",
    "Hola {{first_name}}, te echamos de menos y esperamos que estés bien. Si te gustaría regresar, con gusto te ayudaremos a volver a tu ritmo.",
  ],
  energetic: [
    "Hola {{first_name}}, es hora de un nuevo comienzo. Te hemos echado de menos y queremos ayudarte a volver con energía.",
    "Hola {{first_name}}, hemos pensado en ti y queremos ayudarte a volver a movernos con opciones sencillas y motivadoras.",
  ],
} as const;

export function generateTemplateMessage(input: MessageTemplateInput) {
  const language = input.language ?? input.settings?.default_language ?? "en";
  const tone = input.tone || input.settings?.default_message_tone || "friendly";
  const useSpanish = language === "es";
  const pool = useSpanish ? spanishByTone[tone as keyof typeof spanishByTone] ?? spanishByTone.friendly : englishByTone[tone as keyof typeof englishByTone] ?? englishByTone.friendly;
  const template = pool[Math.abs(hashString(`${input.customer.id}-${input.segment}-${tone}`)) % pool.length];
  const businessType = input.businessType || input.settings?.business_type || "business";
  const objectiveLine = input.campaignObjective ? ` ${input.campaignObjective}` : "";
  const offerLine = input.offer ? ` ${input.offer}` : "";
  const firstName = input.customer.first_name || "there";
  const finalText = `${template.replace(/\{\{first_name\}\}/g, firstName).replace(/\{\{business_type\}\}/g, businessType)}${objectiveLine}${offerLine}`;

  return truncateText(finalText, input.maxLength || 220);
}

export function generateMessageVariants(input: MessageTemplateInput, count = 3) {
  const variants = Array.from({ length: count }, (_, index) => {
    const tone = input.tone || input.settings?.default_message_tone || "friendly";
    const variantTone = index % 2 === 0 ? tone : (tone === "friendly" ? "professional" : tone === "professional" ? "friendly" : tone);
    return generateTemplateMessage({ ...input, tone: variantTone });
  });

  return Array.from(new Set(variants));
}

function truncateText(value: string, maxLength: number) {
  if (!maxLength || value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}
