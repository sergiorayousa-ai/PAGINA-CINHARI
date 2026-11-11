import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { openWhatsApp } from '../utils/whatsapp';

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqs = language === 'es' ? [
    {
      q: '¿Cómo puedo agendar una consulta de psicología con la Fundación CINHARI?',
      a: 'El agendamiento es directo y rápido a través de nuestra línea oficial de WhatsApp (+57 314 367 4235) o comunicándote a nuestras sedes. Coordinamos día, hora y modalidad (presencial en Fusagasugá o Soacha, o virtual por teleconsulta) según tu disponibilidad, sin filas ni trámites complejos.'
    },
    {
      q: '¿Dónde están ubicadas las sedes de atención presencial y en qué horarios atienden?',
      a: 'Contamos con dos sedes habilitadas: en Fusagasugá estamos en la Calle 17A # 13-24 / 13-30 (Barrio Piedra Grande), atendiendo de Lunes a Sábado de 8:00 AM a 6:00 PM. En Soacha contamos con sede comunitaria para Cundinamarca y Bogotá con atención de Lunes a Viernes de 8:00 AM a 5:00 PM.'
    },
    {
      q: '¿Cómo funciona la modalidad de telepsicología o terapia virtual?',
      a: 'La terapia virtual se realiza a través de videollamada en una plataforma segura y confidencial. Permite acceder a psicólogos especialistas desde cualquier municipio de Colombia o fuera del país, manteniendo los mismos estándares éticos y de efectividad que una sesión presencial.'
    },
    {
      q: '¿Qué costos tienen las sesiones y disponen de tarifas solidarias o convenios?',
      a: 'Como entidad sin ánimo de lucro, nuestros costos son solidarios y accesibles en comparación con el mercado privado. Evaluamos situaciones socioeconómicas especiales para facilitar el acceso a familias y personas en situación de vulnerabilidad.'
    },
    {
      q: '¿Qué áreas y problemáticas atienden (ansiedad, depresión, parejas, niños)?',
      a: 'Brindamos atención en psicología clínica individual (ansiedad generalizada, pánico, depresión, duelo, autoestima), terapia de pareja y mediación familiar, psicología infantil y juvenil (déficit de atención, conducta, acoso escolar) y evaluación neuropsicológica.'
    },
    {
      q: '¿Las donaciones a la Fundación CINHARI generan certificado de descuento tributario DIAN?',
      a: 'Sí. Al ser una fundación debidamente registrada y vigilada (Licencia ICBF LF-3298), cada donación genera un Certificado de Donación formal que otorga un descuento del 25% en el impuesto de renta de acuerdo con el Artículo 257 del Estatuto Tributario colombiano.'
    },
    {
      q: '¿Qué debo hacer si experimento una crisis de angustia o emergencia en este momento?',
      a: 'Si tú o alguien cercano experimenta pensamientos de autolesión o una crisis de pánico incontrolable, comunícate de inmediato con la Línea 106 de la Secretaría de Salud (24 horas gratuita), la Línea 141 del ICBF para niños y familias, o la Línea 123 de emergencias médicas.'
    }
  ] : [
    {
      q: 'How can I schedule a therapy consultation with CINHARI Foundation?',
      a: 'Booking is direct and hassle-free via our official WhatsApp (+57 314 367 4235) or by calling our clinics. We coordinate the day, time, and format (in-person in Fusagasugá or Soacha, or online teletherapy) based on your availability without bureaucratic delays.'
    },
    {
      q: 'Where are the physical clinics located and what are their opening hours?',
      a: 'We operate two certified clinical branches: in Fusagasugá on Calle 17A # 13-24 / 13-30 (Barrio Piedra Grande), open Monday to Saturday from 8:00 AM to 6:00 PM. In Soacha, we operate a community branch serving Cundinamarca and Bogotá Monday to Friday from 8:00 AM to 5:00 PM.'
    },
    {
      q: 'How does online teletherapy work?',
      a: 'Virtual therapy takes place through secure, encrypted video consultations. It provides access to licensed clinical psychologists from anywhere in Colombia or abroad, upholding the exact same clinical rigor and privacy standards as in-person therapy.'
    },
    {
      q: 'What are the session fees and are solidarity subsidies available?',
      a: 'As a non-profit foundation, our fees are affordable and solidarity-based compared to typical private practices. We assess socioeconomic situations to ensure no one is left without care due to financial hardship.'
    },
    {
      q: 'What mental health areas and specialties do you cover?',
      a: 'We treat individual clinical psychology (generalized anxiety, panic, depression, bereavement, self-esteem), couples and family counseling, child and adolescent psychology (ADHD, behavior, school bullying), and diagnostic screening.'
    },
    {
      q: 'Do donations to CINHARI Foundation qualify for Colombian DIAN tax deductions?',
      a: 'Yes. Being an officially accredited NGO (ICBF License LF-3298), all donations issue a certified receipt granting a 25% income tax credit under Article 257 of the Colombian Tax Statute.'
    },
    {
      q: 'What should I do in an immediate mental health crisis or emergency?',
      a: 'If you or a loved one are experiencing acute suicidal ideation or uncontainable panic, immediately dial Line 106 (24/7 free national hotline), Line 141 (ICBF child and family emergency line), or Line 123 for immediate emergency responders.'
    }
  ];

  return (
    <section 
      id="preguntas-frecuentes" 
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        
        {/* Section Heading (H2) */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'es' ? 'Resolución de Dudas' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063852] tracking-tight mb-2">
            {language === 'es' ? 'Preguntas Frecuentes sobre Terapia y Servicios' : 'Frequently Asked Questions (FAQ)'}
          </h2>
          <p className="text-sm text-slate-600 font-normal">
            {language === 'es'
              ? 'Encuentra respuestas inmediatas sobre cómo agendar tu cita, modalidades presenciales y virtuales, costos y cobertura.'
              : 'Find direct answers about appointment booking, in-person and online modalities, fees, and clinical care.'}
          </p>
        </div>

        {/* 12. FAQ ACCORDION */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-50/90 border-teal-300 shadow-xs' 
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-sm sm:text-base font-bold text-[#063852] leading-snug">
                    {faq.q}
                  </h3>
                  <span className={`p-1.5 rounded-full shrink-0 transition-colors ${
                    isOpen ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed border-t border-slate-200/60 animate-in fade-in duration-200">
                    <p>{faq.a}</p>

                    {/* 10. Interlinkeado contextual dentro de las respuestas */}
                    {idx === 0 && (
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openWhatsApp()}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 underline"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Iniciar chat en WhatsApp oficial' : 'Open official WhatsApp chat'}</span>
                        </button>
                      </div>
                    )}

                    {idx === 1 && (
                      <div className="mt-3 flex items-center gap-2">
                        <a
                          href="#sedes"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 underline"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Ver mapa y detalles de sedes' : 'View maps and clinic details'}</span>
                        </a>
                      </div>
                    )}

                    {idx === 5 && (
                      <div className="mt-3 flex items-center gap-2">
                        <a
                          href="#donaciones"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Ir al canal de donaciones con certificado' : 'Go to tax certificate donation gateway'}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-teal-950 font-medium text-center sm:text-left">
            {language === 'es'
              ? '¿Tienes una pregunta específica que no aparece aquí?'
              : 'Have a specific question not answered here?'}
          </span>
          <button
            type="button"
            onClick={() => openWhatsApp(language === 'es' ? 'Hola! Tengo una pregunta sobre los servicios de la Fundación CINHARI:' : 'Hello! I have a question regarding CINHARI Foundation services:')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <span>{language === 'es' ? 'Preguntar por WhatsApp' : 'Ask via WhatsApp'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
