import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    'nav.inicio': 'Inicio',
    'nav.quienesSomos': 'Quiénes Somos',
    'nav.directorio': 'Directorio',
    'nav.impacto': 'Impacto',
    'nav.encuesta': 'Test Emocional',
    'nav.recursos': 'Recursos',
    'nav.blog': 'Eventos & Memorias',
    'nav.sedes': 'Sedes',
    'nav.donaciones': 'Donaciones',
    'nav.donar': 'Donar',
    'nav.careGuidance': 'Atención & Orientación:',
    'nav.crisisLine': 'Línea de Crisis 24h',
    'nav.sendAppointmentMsg': 'Enviar mensaje para agendar cita',
    'nav.whatsAppAppointment': 'WhatsApp para Agendar Cita',
    'nav.locationsSub': 'Fusagasugá & Soacha · Psicología Especializada',
    'nav.highContrast': 'Contraste Alto',
    'nav.contrast': 'Contraste',
    'nav.twoBranches': '2 Sedes',

    // Hero
    'hero.badge': 'Salud Mental Comunitaria · Colombia',
    'hero.title1': 'Salud mental digna y',
    'hero.title2': 'acompañamiento para todos',
    'hero.subtitle': 'Promovemos el bienestar psicológico, la habilitación integral y el fortalecimiento emocional de personas, familias y comunidades en Fusagasugá, Soacha y Colombia.',
    'hero.testBtn': 'Realizar Test de Bienestar',
    'hero.resourcesBtn': 'Recursos Gratuitos',
    'hero.crisisBtn': '¿Necesitas Ayuda Inmediata?',
    'hero.stat1Number': '5.200+',
    'hero.stat1Label': 'Personas acompañadas',
    'hero.stat2Number': '100%',
    'hero.stat2Label': 'Confidencialidad ética',
    'hero.stat3Number': '2 Sedes',
    'hero.stat3Label': 'Fusagasugá & Soacha',

    // Quienes Somos / Directorio
    'about.title': 'QUIENES SOMOS',
    'about.badge': 'DIRECTORIO',
    'about.description': 'Equipo interdisciplinario con vocación social, experiencia clínica y académica al servicio de la salud mental de nuestra comunidad.',
    'about.member1.name': 'María José León',
    'about.member1.role': 'Directora Ejecutiva',
    'about.member1.bio': 'Psicóloga clínica, especialista en relaciones familiares tempranas. Doctora en psicoterapia, Universidad Católica & Universidad de Chile.',
    'about.member2.name': 'Trinidad Andreani',
    'about.member2.role': 'Co Fundadora y Directora',
    'about.member2.bio': 'Ingeniera comercial, Universidad Católica de Chile.',
    'about.member3.name': 'Javier Morán',
    'about.member3.role': 'Co fundador y Director',
    'about.member3.bio': 'Psicólogo, especialista en adolescencia. Doctor en psicoterapia Universidad Católica & Universidad de Chile.',

    // Impact
    'impact.badge': 'Nuestro Impacto Social · Fusagasugá y Soacha',
    'impact.title': 'Transformando realidades mediante habilitación, escucha y esperanza',
    'impact.subtitle': 'En Fundación CINHARI trabajamos por el bienestar biopsicosocial de la infancia y las familias en Colombia, garantizando acompañamiento terapéutico accesible y de alta calidad.',
    'impact.btnTest': 'Test Emocional Gratis',
    'impact.license': 'Licencia ICBF LF-3298',
    'impact.missionBadge': 'Misión y Propósito Institucional',
    'impact.missionTitle': 'Fundación Centro Integral de Habilitación y Rehabilitación a la Infancia y la Familia',
    'impact.missionP1': 'CINHARI nace para cerrar las brechas de atención en salud mental y desarrollo infantil en Colombia. Brindamos evaluación, diagnóstico y tratamiento interdisciplinario a niños, niñas, adolescentes y sus familias en Fusagasugá y Soacha.',
    'impact.missionP2': 'A través de convenios y aportes solidarios, aseguramos que ninguna persona en situación de vulnerabilidad se quede sin el respaldo profesional que necesita para florecer.',
    'impact.appointmentBtn': 'Enviar mensaje para agendar cita',
    'impact.quote': '«Gracias al acompañamiento de los psicólogos y terapeutas de la Fundación CINHARI, mi hijo logró superar sus crisis de ansiedad escolar y hoy avanzamos juntos como familia con pautas claras y mucho amor.»',
    'impact.quoteAuthor': 'Liliana C.',
    'impact.quoteRole': 'Madre beneficiaria del programa en Soacha',

    // Survey
    'survey.badge': 'Evaluación Rápida Confidencial',
    'survey.title': 'Test de Bienestar & Salud Emocional',
    'survey.subtitle': 'Un cuestionario breve diseñado con criterios clínicos preventivos para orientarte sobre tu nivel de estrés, ansiedad o ánimo.',
    'survey.startBtn': 'Comenzar Evaluación (Gratis)',
    'survey.anonymous': '100% Anónimo y Confidencial',
    'survey.time': 'Toma menos de 2 minutos',
    'survey.questionsCount': 'Pregunta {current} de {total}',
    'survey.prev': 'Anterior',
    'survey.resultTitle': 'Resultado de tu Evaluación Emocional',
    'survey.levelLabel': 'Nivel detectado:',
    'survey.recomms': 'Recomendaciones para tu Bienestar:',
    'survey.actionPlan': 'Plan de Acción Sugerido:',
    'survey.scheduleWithUs': 'Agendar Orientación Psicológica',
    'survey.restart': 'Repetir Evaluación',

    // Daily Wellness Resources
    'resources.badge': 'Herramientas Clínicas Abiertas',
    'resources.title': 'Recursos Diarios de Bienestar Emocional',
    'resources.subtitle': 'Ejercicios guiados, reguladores de respiración diafragmática y paisajes sonoros para acompañar tu día.',
    'resources.tabDaily': 'Pausa Diaria',
    'resources.tabBreathing': 'Regulador de Respiración',
    'resources.tabGuides': 'Guías Clínicas',
    'resources.tabAudio': 'Paisajes Sonoros',

    // Blog / Eventos
    'blog.badge': 'Memorias & Eventos Realizados',
    'blog.title': 'Eventos Comunitarios y Jornadas Terapéuticas',
    'blog.subtitle': 'Registros visuales y testimonios de nuestras brigadas, talleres de arte-terapia y seminarios formativos en Fusagasugá y Soacha.',
    'blog.searchPlaceholder': 'Buscar eventos o temas...',
    'blog.readArticle': 'Ver qué ocurrió',

    // Donations
    'donations.badge': 'Súmate a la Causa',
    'donations.title': 'Tu Aporte Hace Posible la Salud Mental',
    'donations.subtitle': 'Cada donación financia consultas solidarias, talleres escolares y terapia para familias de escasos recursos en Fusagasugá y Soacha.',
    'donations.freqOnce': 'Única vez',
    'donations.freqMonthly': 'Aporte Mensual',
    'donations.btnDonate': 'Continuar con la Donación',

    // Sedes
    'sedes.badge': 'Presencia Territorial en Cundinamarca',
    'sedes.title': 'Nuestras Sedes de Atención',
    'sedes.description': 'Espacios clínicos acondicionados para brindarte atención psicológica cercana, cálida y profesional.',
    'sedes.fusa.name': 'Sede Fusagasugá',
    'sedes.fusa.badge': 'Sede Principal',
    'sedes.fusa.address': 'Calle 17A # 13-24 / 13-30, Barrio Piedra Grande, Fusagasugá',
    'sedes.fusa.hours': 'Lun - Vie: 8:00 a.m. - 6:00 p.m. · Sáb: 8:00 a.m. - 1:00 p.m.',
    'sedes.fusa.phones': '315 576 9968 · 314 348 7191',
    'sedes.soacha.name': 'Sede Soacha',
    'sedes.soacha.badge': 'Sede Psicosocial',
    'sedes.soacha.address': 'Soacha, Cundinamarca (Atención a niñez, familias y comunas)',
    'sedes.soacha.hours': 'Lun - Vie: 8:00 a.m. - 5:30 p.m. · Sáb: 8:00 a.m. - 12:30 p.m.',
    'sedes.soacha.phones': '315 576 9968 · 314 367 4235',
    'sedes.action.msg': 'Enviar mensaje para agendar cita',
    'sedes.action.maps': 'Cómo llegar',
    'sedes.addressLabel': 'Dirección:',
    'sedes.hoursLabel': 'Horarios:',
    'sedes.phoneLabel': 'Línea de Atención:',
    'sedes.ethicsBanner': 'Atención psicológica profesional y confidencial regulada por la Ley 1090 de 2006 (Código Deontológico de Psicología en Colombia).',

    // Floating WhatsApp
    'wa.help': '¿Necesitas agendar cita o información?',
    'wa.chat': 'Hablar por WhatsApp',
    'wa.status': 'En línea · Respuesta rápida',

    // Crisis Modal
    'crisis.badge': 'Atención Urgente en Salud Mental',
    'crisis.title': 'Líneas de Ayuda y Crisis 24 Horas',
    'crisis.subtitle': 'Si tú o alguien cercano está en riesgo o experimentando un momento crítico, no estás solo. Estas líneas son gratuitas, confidenciales y atienden las 24 horas.',
    'crisis.callNow': 'Llamar ahora',
    'crisis.close': 'Entendido / Cerrar',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.mission': 'Fundación CINHARI — Psicología Especializada y Habilitación Integral. Personería jurídica y vigilancia institucional.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contact': 'Contacto & Sedes',
  },
  en: {
    // Navigation
    'nav.inicio': 'Home',
    'nav.quienesSomos': 'About Us',
    'nav.directorio': 'Board',
    'nav.impacto': 'Impact',
    'nav.encuesta': 'Wellness Test',
    'nav.recursos': 'Resources',
    'nav.blog': 'Events & Memories',
    'nav.sedes': 'Locations',
    'nav.donaciones': 'Donations',
    'nav.donar': 'Donate',
    'nav.careGuidance': 'Care & Guidance:',
    'nav.crisisLine': '24/7 Crisis Line',
    'nav.sendAppointmentMsg': 'Send message to book appointment',
    'nav.whatsAppAppointment': 'WhatsApp to Book Appointment',
    'nav.locationsSub': 'Fusagasugá & Soacha · Specialized Psychology',
    'nav.highContrast': 'High Contrast',
    'nav.contrast': 'Contrast',
    'nav.twoBranches': '2 Branches',

    // Hero
    'hero.badge': 'Community Mental Health · Colombia',
    'hero.title1': 'Dignified mental health &',
    'hero.title2': 'support for everyone',
    'hero.subtitle': 'We foster psychological well-being, integral habilitation, and emotional empowerment for individuals, families, and communities in Fusagasugá, Soacha, and Colombia.',
    'hero.testBtn': 'Take Wellness Assessment',
    'hero.resourcesBtn': 'Free Resources',
    'hero.crisisBtn': 'Need Immediate Help?',
    'hero.stat1Number': '5,200+',
    'hero.stat1Label': 'Individuals supported',
    'hero.stat2Number': '100%',
    'hero.stat2Label': 'Ethical confidentiality',
    'hero.stat3Number': '2 Clinics',
    'hero.stat3Label': 'Fusagasugá & Soacha',

    // Quienes Somos / Directorio
    'about.title': 'ABOUT US',
    'about.badge': 'BOARD OF DIRECTORS',
    'about.description': 'An interdisciplinary team driven by social vocation, clinical experience, and academic dedication to community mental health.',
    'about.member1.name': 'María José León',
    'about.member1.role': 'Executive Director',
    'about.member1.bio': 'Clinical psychologist, specialist in early family relationships. PhD in Psychotherapy, Catholic University & University of Chile.',
    'about.member2.name': 'Trinidad Andreani',
    'about.member2.role': 'Co-Founder and Director',
    'about.member2.bio': 'Commercial engineer, Catholic University of Chile.',
    'about.member3.name': 'Javier Morán',
    'about.member3.role': 'Co-Founder and Director',
    'about.member3.bio': 'Psychologist, specialist in adolescence. PhD in Psychotherapy, Catholic University & University of Chile.',

    // Impact
    'impact.badge': 'Our Social Impact · Fusagasugá & Soacha',
    'impact.title': 'Transforming lives through habilitation, compassionate listening, and hope',
    'impact.subtitle': 'At CINHARI Foundation we work for the biopsychosocial well-being of children, youth, and families in Colombia, ensuring accessible and top-quality therapeutic care.',
    'impact.btnTest': 'Free Emotional Test',
    'impact.license': 'ICBF License LF-3298',
    'impact.missionBadge': 'Institutional Mission & Purpose',
    'impact.missionTitle': 'Comprehensive Foundation for the Habilitation and Rehabilitation of Children and Families',
    'impact.missionP1': 'CINHARI was born to bridge gaps in mental health and child development in Colombia. We provide interdisciplinary evaluation, diagnosis, and treatment in Fusagasugá and Soacha.',
    'impact.missionP2': 'Through partnerships and solidarity contributions, we ensure no vulnerable individual or family is left without the professional support needed to thrive.',
    'impact.appointmentBtn': 'Send message to book appointment',
    'impact.quote': '«Thanks to the compassionate accompaniment of CINHARI psychologists and therapists, my son overcame his school anxiety and we now move forward as a family with clear guidance and deep love.»',
    'impact.quoteAuthor': 'Liliana C.',
    'impact.quoteRole': 'Beneficiary mother in Soacha program',

    // Survey
    'survey.badge': 'Confidential Quick Assessment',
    'survey.title': 'Wellness & Emotional Health Test',
    'survey.subtitle': 'A brief screening designed with preventive clinical criteria to guide you on your stress, anxiety, and mood levels.',
    'survey.startBtn': 'Start Assessment (Free)',
    'survey.anonymous': '100% Anonymous & Confidential',
    'survey.time': 'Takes less than 2 minutes',
    'survey.questionsCount': 'Question {current} of {total}',
    'survey.prev': 'Previous',
    'survey.resultTitle': 'Your Emotional Assessment Result',
    'survey.levelLabel': 'Detected level:',
    'survey.recomms': 'Recommendations for Your Well-being:',
    'survey.actionPlan': 'Suggested Action Plan:',
    'survey.scheduleWithUs': 'Schedule Psychological Care',
    'survey.restart': 'Retake Assessment',

    // Daily Wellness Resources
    'resources.badge': 'Open Clinical Tools',
    'resources.title': 'Daily Emotional Wellness Resources',
    'resources.subtitle': 'Guided exercises, diaphragmatic breathing pacers, and calming soundscapes to support your day.',
    'resources.tabDaily': 'Daily Pause',
    'resources.tabBreathing': 'Breathing Pacer',
    'resources.tabGuides': 'Clinical Guides',
    'resources.tabAudio': 'Calming Soundscapes',

    // Blog / Events
    'blog.badge': 'Memories & Past Events',
    'blog.title': 'Community Events & Therapeutic Clinics',
    'blog.subtitle': 'Visual records and testimonies of our field clinics, art-therapy workshops, and inclusive seminars in Fusagasugá and Soacha.',
    'blog.searchPlaceholder': 'Search events or topics...',
    'blog.readArticle': 'View what occurred',

    // Donations
    'donations.badge': 'Join the Cause',
    'donations.title': 'Your Contribution Makes Mental Health Possible',
    'donations.subtitle': 'Every donation funds sliding-scale consultations, school workshops, and therapy for vulnerable families in Fusagasugá and Soacha.',
    'donations.freqOnce': 'One-time',
    'donations.freqMonthly': 'Monthly Gift',
    'donations.btnDonate': 'Proceed to Donate',

    // Sedes
    'sedes.badge': 'Territorial Presence in Cundinamarca',
    'sedes.title': 'Our Care Locations',
    'sedes.description': 'Clinically equipped centers designed to provide warm, close, and professional psychological care.',
    'sedes.fusa.name': 'Fusagasugá Clinic',
    'sedes.fusa.badge': 'Main Clinic',
    'sedes.fusa.address': 'Calle 17A # 13-24 / 13-30, Piedra Grande, Fusagasugá',
    'sedes.fusa.hours': 'Mon - Fri: 8:00 a.m. - 6:00 p.m. · Sat: 8:00 a.m. - 1:00 p.m.',
    'sedes.fusa.phones': '+57 315 576 9968 · +57 314 348 7191',
    'sedes.soacha.name': 'Soacha Clinic',
    'sedes.soacha.badge': 'Psychosocial Clinic',
    'sedes.soacha.address': 'Soacha, Cundinamarca (Serving children, youth, and families)',
    'sedes.soacha.hours': 'Mon - Fri: 8:00 a.m. - 5:30 p.m. · Sat: 8:00 a.m. - 12:30 p.m.',
    'sedes.soacha.phones': '+57 315 576 9968 · +57 314 367 4235',
    'sedes.action.msg': 'Send message to book appointment',
    'sedes.action.maps': 'Get directions',
    'sedes.addressLabel': 'Address:',
    'sedes.hoursLabel': 'Hours:',
    'sedes.phoneLabel': 'Care Line:',
    'sedes.ethicsBanner': 'Professional and confidential psychological care regulated by Colombian Law 1090 of 2006 (Psychologist Deontological Code).',

    // Floating WhatsApp
    'wa.help': 'Need an appointment or info?',
    'wa.chat': 'Chat on WhatsApp',
    'wa.status': 'Online · Fast response',

    // Crisis Modal
    'crisis.badge': 'Urgent Mental Health Care',
    'crisis.title': '24-Hour Help & Crisis Hotlines',
    'crisis.subtitle': 'If you or someone you know is in distress or experiencing a critical crisis, you are not alone. These hotlines are free, confidential, and available 24/7.',
    'crisis.callNow': 'Call now',
    'crisis.close': 'Got it / Close',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.mission': 'CINHARI Foundation — Specialized Psychology and Integral Rehabilitation. Certified institutional standing.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact & Locations',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('cinhari_lang');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cinhari_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['es'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
