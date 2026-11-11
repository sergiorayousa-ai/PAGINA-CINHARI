export const CINHARI_PHONE = '573143674235';
export const EXACT_WHATSAPP_URL =
  'https://api.whatsapp.com/send?phone=573143674235&text=Hola!!!%20Quiero%20hacer%20terapia%20psicol%C3%B3gica%20para%20lograr%20un%20cambio%20genuino%20en%20mi%20vida';

export function getWhatsAppUrl(customMessage?: string, _sede?: 'fusagasuga' | 'soacha'): string {
  if (customMessage) {
    const encoded = encodeURIComponent(customMessage);
    return `https://api.whatsapp.com/send?phone=${CINHARI_PHONE}&text=${encoded}`;
  }
  return EXACT_WHATSAPP_URL;
}

export function openWhatsApp(customMessage?: string, _sede?: 'fusagasuga' | 'soacha') {
  const url = getWhatsAppUrl(customMessage, _sede);
  window.open(url, '_blank', 'noopener,noreferrer');
}

