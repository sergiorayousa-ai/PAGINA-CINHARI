import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  ClipboardCheck, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  HeartHandshake,
  Users,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { openWhatsApp } from '../utils/whatsapp';

interface SearchIntentHeroIntroProps {
  onSurveyClick?: () => void;
  onCrisisClick?: () => void;
  onNavigate?: (id: string) => void;
}

export const SearchIntentHeroIntro: React.FC<SearchIntentHeroIntroProps> = ({
  onSurveyClick,
  onCrisisClick,
  onNavigate,
}) => {
  const { language } = useLanguage();

  const handleAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section 
      id="terapia-psicologica" 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 scroll-mt-24"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-all">
        
        {/* Breadcrumb / Search Intent Category Badge */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-800 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            {language === 'es' ? 'Atención Psicológica Colegiada' : 'Licensed Clinical Psychology'}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">
            {language === 'es' ? 'Fusagasugá · Soacha · Telepsicología' : 'Fusagasugá · Soacha · Teletherapy'}
          </span>
        </div>

        {/* 3. ÚNICO H1 DE LA PÁGINA (Diferente a meta-título, centrado en intención de búsqueda) */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#063852] tracking-tight leading-tight mb-4">
          {language === 'es' ? (
            <>
              Terapia Psicológica y Acompañamiento Integral en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-[#00A3CC]">
                Salud Mental
              </span>
            </>
          ) : (
            <>
              Specialized Psychological Therapy & Comprehensive{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-[#00A3CC]">
                Mental Health Care
              </span>
            </>
          )}
        </h1>

        {/* 5. INTENCIÓN DE BÚSQUEDA (Primer Párrafo Claro y Orientado al Paciente) */}
        <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-4xl mb-6">
          {language === 'es' ? (
            <>
              ¿Buscas apoyo psicológico profesional, empático y sin barreras en <strong>Fusagasugá</strong>, <strong>Soacha</strong> o vía <strong>teleconsulta</strong> en Colombia? En la <strong>Fundación CINHARI</strong> acompañamos procesos de ansiedad, depresión, terapia de pareja, duelo, dificultades emocionales en infancia y adolescencia, y bienestar familiar. Nuestro equipo de psicólogos titulados y colegiados brinda un espacio seguro, confidencial y fundamentado en la evidencia científica para ayudarte a recuperar el equilibrio.
            </>
          ) : (
            <>
              Looking for licensed, compassionate, and accessible psychological care in <strong>Fusagasugá</strong>, <strong>Soacha</strong>, or through <strong>secure teletherapy</strong> across Colombia? At <strong>CINHARI Foundation</strong>, we support individuals, couples, children, and families facing anxiety, depression, grief, and emotional distress. Our registered psychologists offer a safe, confidential, and evidence-based space to guide your healing journey.
            </>
          )}
        </p>

        {/* 8. CTA INMEDIATAMENTE DESPUÉS DEL PRIMER PÁRRAFO */}
        <div className="flex flex-wrap items-center gap-3.5 pb-8 mb-8 border-b border-slate-200/80">
          <button
            type="button"
            id="search-intent-whatsapp-cta"
            onClick={() => openWhatsApp(language === 'es' ? undefined : 'Hello! I want to start psychological therapy with CINHARI Foundation.')}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'es' ? 'Agendar Cita por WhatsApp' : 'Book Appointment via WhatsApp'}</span>
          </button>

          {onSurveyClick && (
            <button
              type="button"
              id="search-intent-survey-cta"
              onClick={onSurveyClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/80 font-semibold text-sm sm:text-base transition-all cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-teal-700" />
              <span>{language === 'es' ? 'Test Emocional Gratuito' : 'Free Emotional Screening'}</span>
            </button>
          )}

          <a
            href="#sedes"
            onClick={(e) => handleAnchor(e, 'sedes')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300/80 font-medium text-sm sm:text-base transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-slate-500" />
            <span>{language === 'es' ? 'Ver Sedes y Horarios' : 'View Locations & Hours'}</span>
          </a>
        </div>

        {/* 6 & 7. TL;DR / KEY TAKEAWAYS (Puntos Clave sumados después de la intención de búsqueda) */}
        <div className="rounded-2xl bg-slate-50/90 border border-teal-200/70 p-5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-700 text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#063852] tracking-tight">
                {language === 'es' ? 'Puntos Clave / Key Takeaways' : 'Key Takeaways (TL;DR)'}
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full">
              {language === 'es' ? 'Resumen Rápido' : 'Quick Overview'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-slate-700">
                <strong className="block text-slate-900 font-semibold mb-0.5">
                  {language === 'es' ? 'Sedes Físicas y Virtual' : 'Physical & Online Clinics'}
                </strong>
                {language === 'es' 
                  ? 'Fusagasugá (Calle 17A # 13-24), Soacha y telepsicología para todo el país.' 
                  : 'Fusagasugá (Calle 17A # 13-24), Soacha, and nationwide teletherapy.'}
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-slate-700">
                <strong className="block text-slate-900 font-semibold mb-0.5">
                  {language === 'es' ? 'Psicólogos Colegiados' : 'Licensed Specialists'}
                </strong>
                {language === 'es' 
                  ? 'Profesionales con tarjeta profesional y licencia ICBF (LF-3298).' 
                  : 'Registered clinicians with valid licenses and ICBF affiliation (LF-3298).'}
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-slate-700">
                <strong className="block text-slate-900 font-semibold mb-0.5">
                  {language === 'es' ? 'Especialidades Clínicas' : 'Clinical Specialties'}
                </strong>
                {language === 'es' 
                  ? 'Ansiedad, depresión, terapia de pareja, psicología infantil y neurodesarrollo.' 
                  : 'Anxiety, depression, couple therapy, child psychology, and neurodevelopment.'}
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-slate-700">
                <strong className="block text-slate-900 font-semibold mb-0.5">
                  {language === 'es' ? 'Agendamiento Directo' : 'Direct Booking'}
                </strong>
                {language === 'es' 
                  ? 'Sin trámites engorrosos ni meses de espera; atención personalizada por WhatsApp.' 
                  : 'No endless queues or bureaucratic delays; direct WhatsApp appointment coordination.'}
              </div>
            </div>
          </div>

          {/* 10. INTERLINKEADO Y CLUSTERS (Enlaces profundos dentro del cluster de salud mental) */}
          <div className="mt-5 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-500">
              {language === 'es' ? 'Explora las secciones principales:' : 'Jump to key sections:'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#servicios"
                onClick={(e) => handleAnchor(e, 'servicios')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 text-teal-900 border border-slate-200 hover:border-teal-300 font-medium transition-colors"
              >
                {language === 'es' ? '→ Tabla de Servicios' : '→ Services Table'}
              </a>
              <a
                href="#sedes"
                onClick={(e) => handleAnchor(e, 'sedes')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 text-teal-900 border border-slate-200 hover:border-teal-300 font-medium transition-colors"
              >
                {language === 'es' ? '→ Sedes Físicas' : '→ Clinic Locations'}
              </a>
              <a
                href="#preguntas-frecuentes"
                onClick={(e) => handleAnchor(e, 'preguntas-frecuentes')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 text-teal-900 border border-slate-200 hover:border-teal-300 font-medium transition-colors"
              >
                {language === 'es' ? '→ FAQ y Costos' : '→ FAQ & Costs'}
              </a>
              <a
                href="#evaluacion"
                onClick={(e) => handleAnchor(e, 'evaluacion')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-teal-50 text-teal-900 border border-slate-200 hover:border-teal-300 font-medium transition-colors"
              >
                {language === 'es' ? '→ Test de Bienestar' : '→ Emotional Test'}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
