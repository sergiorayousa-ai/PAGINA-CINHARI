import React from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export const SedesLocations: React.FC = () => {
  const { t, language } = useLanguage();

  const fusaSpecialties = language === 'es'
    ? ['Psicología Clínica', 'Terapia Familiar', 'Infantil & Juvenil']
    : ['Clinical Psychology', 'Family Therapy', 'Child & Adolescent'];

  const soachaSpecialties = language === 'es'
    ? ['Apoyo Psicosocial', 'Niñez y Adolescencia', 'Orientación Comunitaria']
    : ['Psychosocial Support', 'Childhood & Youth', 'Community Guidance'];

  return (
    <section
      id="sedes"
      className="py-14 bg-slate-50/70 border-t border-slate-200/70 scroll-mt-24"
      aria-label="Sedes de Fundación CINHARI"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Single Rectangle Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Header inside the rectangle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-teal-200/60">
                <MapPin className="w-3 h-3 text-teal-600" />
                {t('sedes.badge')}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063852] tracking-tight">
                {t('sedes.title')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              {t('sedes.description')}
            </p>
          </div>

          {/* 2-Columns in the Same Rectangle (Fusagasugá & Soacha) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 relative z-10">
            
            {/* Column 1: Sede Fusagasugá */}
            <div className="flex flex-col justify-between pr-0 md:pr-6 pt-4 md:pt-0">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <h3 className="text-xl font-bold text-[#063852] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    {t('sedes.fusa.name')}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100/70 text-teal-800 px-2.5 py-0.5 rounded-full">
                    {t('sedes.fusa.badge')}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 mr-1">{t('sedes.addressLabel')}</strong>
                      <span>{t('sedes.fusa.address')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800 mr-1">{t('sedes.phoneLabel')}</strong>
                      <span className="font-semibold text-teal-800">{t('sedes.fusa.phones')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 mr-1">{t('sedes.hoursLabel')}</strong>
                      <span>{t('sedes.fusa.hours')}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties chips */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {fusaSpecialties.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      <CheckCircle2 className="w-2.5 h-2.5 text-teal-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => openWhatsApp(undefined, 'fusagasuga')}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>{t('sedes.action.msg')}</span>
                </button>
                <a
                  href="https://maps.google.com/?q=Calle+17A+13-24+Fusagasuga+Cundinamarca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-600" />
                  <span>{t('sedes.action.maps')}</span>
                </a>
              </div>
            </div>

            {/* Column 2: Sede Soacha */}
            <div className="flex flex-col justify-between pl-0 md:pl-6 pt-6 md:pt-0">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <h3 className="text-xl font-bold text-[#063852] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                    {t('sedes.soacha.name')}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-100/70 text-cyan-800 px-2.5 py-0.5 rounded-full">
                    {t('sedes.soacha.badge')}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 mr-1">{t('sedes.addressLabel')}</strong>
                      <span>{t('sedes.soacha.address')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                    <div>
                      <strong className="text-slate-800 mr-1">{t('sedes.phoneLabel')}</strong>
                      <span className="font-semibold text-teal-800">{t('sedes.soacha.phones')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 mr-1">{t('sedes.hoursLabel')}</strong>
                      <span>{t('sedes.soacha.hours')}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties chips */}
                <div className="flex flex-wrap gap-1 mb-5">
                  {soachaSpecialties.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 text-[10px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      <CheckCircle2 className="w-2.5 h-2.5 text-cyan-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => openWhatsApp(undefined, 'soacha')}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>{t('sedes.action.msg')}</span>
                </button>
                <a
                  href="https://maps.google.com/?q=Soacha+Cundinamarca+Fundacion+CINHARI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t('sedes.action.maps')}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Footer inside the rectangle: Legal / Ethical notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 relative z-10">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{t('sedes.ethicsBanner')}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
