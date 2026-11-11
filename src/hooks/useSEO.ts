import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SectionSEO {
  title: { es: string; en: string };
  description: { es: string; en: string };
}

const SECTION_SEO_MAP: Record<string, SectionSEO> = {
  default: {
    title: {
      es: 'Fundación CINHARI — Psicología Especializada y Habilitación Integral',
      en: 'CINHARI Foundation — Specialized Psychology & Comprehensive Rehabilitation'
    },
    description: {
      es: 'Fundación CINHARI en Fusagasugá y Soacha. Psicología clínica, terapia de pareja, infantil y virtual en Colombia. Citas ágiles por WhatsApp.',
      en: 'CINHARI Foundation in Fusagasugá and Soacha. Clinical psychology, couple, child, and teletherapy in Colombia. Fast booking via WhatsApp.'
    }
  },
  'quienes-somos': {
    title: {
      es: 'Equipo y Directorio Clínico | Fundación CINHARI',
      en: 'Clinical Team & Board of Directors | CINHARI Foundation'
    },
    description: {
      es: 'Conoce al equipo de psicólogos y directores de Fundación CINHARI: María José León, Trinidad Andreani y Javier Morán. Terapia ética y basada en evidencia.',
      en: 'Meet the clinical psychologists and directors of CINHARI Foundation: María José León, Trinidad Andreani, and Javier Morán.'
    }
  },
  servicios: {
    title: {
      es: 'Servicios de Psicología y Modalidades Terapéuticas | Fundación CINHARI',
      en: 'Psychological Services & Therapy Modalities | CINHARI Foundation'
    },
    description: {
      es: 'Consulta las modalidades de terapia psicológica: individual, infantil, familiar, parejas y telepsicología en Fusagasugá, Soacha y Colombia.',
      en: 'Explore therapy modalities: individual, child, family, couples, and online telepsychology in Fusagasugá, Soacha, and Colombia.'
    }
  },
  evaluacion: {
    title: {
      es: 'Test de Bienestar Emocional y Ansiedad Gratuito | Fundación CINHARI',
      en: 'Free Emotional Wellness & Anxiety Screening Test | CINHARI Foundation'
    },
    description: {
      es: 'Evalúa tu nivel de ansiedad y bienestar psicológico con nuestro test confidencial basado en escalas clínicas validadas.',
      en: 'Assess your anxiety level and emotional wellness with our confidential screening test based on validated clinical scales.'
    }
  },
  recursos: {
    title: {
      es: 'Recursos de Salud Mental y Ejercicio de Respiración | Fundación CINHARI',
      en: 'Mental Health Resources & Guided Breathing Exercises | CINHARI Foundation'
    },
    description: {
      es: 'Guías prácticas, contención ante ataques de pánico y ejercicio guiado de respiración diafragmática para calmar la ansiedad.',
      en: 'Practical guides, panic attack support, and guided diaphragmatic breathing exercises to relieve acute anxiety.'
    }
  },
  noticias: {
    title: {
      es: 'Blog de Psicología y Actualidad en Salud Mental | Fundación CINHARI',
      en: 'Psychology Blog & Community Mental Health News | CINHARI Foundation'
    },
    description: {
      es: 'Artículos sobre salud comunitaria en Bogotá y Soacha, lineamientos ICBF para niñez y manejo de ansiedad escolar.',
      en: 'Articles on community health in Bogotá & Soacha, ICBF child guidelines, and managing school anxiety in youth.'
    }
  },
  donaciones: {
    title: {
      es: 'Donaciones con Certificado Tributario DIAN | Fundación CINHARI',
      en: 'Solidarity Donations with DIAN Tax Certificate | CINHARI Foundation'
    },
    description: {
      es: 'Apoya terapias psicológicas para personas en vulnerabilidad en Colombia. Donación deducible en un 25% del impuesto de renta.',
      en: 'Support mental health therapy for vulnerable communities in Colombia. Tax-deductible donations with DIAN certificate.'
    }
  },
  sedes: {
    title: {
      es: 'Sedes en Fusagasugá y Soacha — Atención Presencial | Fundación CINHARI',
      en: 'Fusagasugá & Soacha Locations — In-Person Care | CINHARI Foundation'
    },
    description: {
      es: 'Direcciones, horarios de atención y contacto de las sedes de Fundación CINHARI en Fusagasugá (Calle 17A # 13-24) y Soacha.',
      en: 'Addresses, opening hours, and contact info for CINHARI Foundation branches in Fusagasugá and Soacha.'
    }
  },
  'preguntas-frecuentes': {
    title: {
      es: 'Preguntas Frecuentes sobre Terapia Psicológica | Fundación CINHARI',
      en: 'Frequently Asked Questions on Psychological Therapy | CINHARI Foundation'
    },
    description: {
      es: 'Respuestas claras sobre agendamiento por WhatsApp, costos de sesiones, cobertura ICBF, telepsicología y sedes en Cundinamarca.',
      en: 'Clear answers regarding WhatsApp appointment booking, therapy costs, ICBF coverage, telepsychology, and clinic locations.'
    }
  }
};

export function useSEO(activeSectionId?: string) {
  const { language } = useLanguage();

  useEffect(() => {
    const key = activeSectionId && SECTION_SEO_MAP[activeSectionId] ? activeSectionId : 'default';
    const seo = SECTION_SEO_MAP[key] || SECTION_SEO_MAP.default;

    const titleText = seo.title[language] || seo.title.es;
    const descText = seo.description[language] || seo.description.es;

    // Update Document Title
    document.title = titleText;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descText);

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', titleText);
    }

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', descText);
    }

    // Update HTML lang attribute
    document.documentElement.lang = language === 'en' ? 'en' : 'es';
  }, [activeSectionId, language]);
}
