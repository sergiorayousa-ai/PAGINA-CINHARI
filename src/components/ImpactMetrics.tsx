import React from 'react';
import {
  Users,
  HeartHandshake,
  Smile,
  GraduationCap,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Heart,
  Quote
} from 'lucide-react';
import { motion } from 'motion/react';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { useLanguage } from '../context/LanguageContext';

interface ImpactMetricsProps {
  onDonateClick?: () => void;
  onSurveyClick?: () => void;
  onAppointmentClick?: () => void;
}

export const ImpactMetrics: React.FC<ImpactMetricsProps> = ({
  onSurveyClick,
  onAppointmentClick
}) => {
  const { t, language } = useLanguage();

  const metrics = [
    {
      id: 'atenciones',
      value: '+14,800',
      label: language === 'es' ? 'Consultas y sesiones psicológicas' : 'Psychological sessions & consultations',
      subtext: language === 'es'
        ? 'Brindadas a niños, jóvenes y familias en Bogotá y Soacha a tarifa solidaria.'
        : 'Provided to children, youth, and families in Bogotá and Soacha on sliding scales.',
      icon: Users,
      color: 'from-teal-500 to-emerald-600'
    },
    {
      id: 'especialistas',
      value: '45+',
      label: language === 'es' ? 'Especialistas interdisciplinarios' : 'Interdisciplinary specialists',
      subtext: language === 'es'
        ? 'Psicólogos clínicos, terapeutas ocupacionales, fonoaudiólogos y trabajadores sociales.'
        : 'Clinical psychologists, occupational therapists, speech therapists, and social workers.',
      icon: HeartHandshake,
      color: 'from-teal-600 to-cyan-600'
    },
    {
      id: 'talleres',
      value: '340+',
      label: language === 'es' ? 'Talleres comunitarios y escolares' : 'Community & school workshops',
      subtext: language === 'es'
        ? 'Prevención de violencias, pautas de crianza y fortalecimiento emocional.'
        : 'Violence prevention, parenting skills, and emotional empowerment.',
      icon: GraduationCap,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'alivio',
      value: '94.2%',
      label: language === 'es' ? 'Índice de mejoría y bienestar integral' : 'Improvement & well-being rate',
      subtext: language === 'es'
        ? 'Reportado por familias y cuidadores tras completar su proceso de habilitación.'
        : 'Reported by families and caregivers upon completing their habilitation process.',
      icon: Smile,
      color: 'from-emerald-500 to-teal-700'
    }
  ];

  const pillars = [
    {
      title: language === 'es' ? 'Accesibilidad e Inclusión Social' : 'Accessibility & Social Inclusion',
      description: language === 'es'
        ? 'Creemos que la salud mental y la habilitación integral son derechos fundamentales. Eliminamos barreras para que las familias reciban atención oportuna.'
        : 'We believe mental health and habilitation are fundamental rights. We remove barriers so families receive timely care.',
      icon: HeartHandshake
    },
    {
      title: language === 'es' ? 'Rigor Profesional & Licencia ICBF' : 'Professional Rigor & ICBF License',
      description: language === 'es'
        ? 'Nuestros programas se rigen bajo los estándares del ICBF (LF-3298) con metodologías respaldadas por evidencia científica y calidez humana.'
        : 'Our programs follow ICBF standards (LF-3298) backed by scientific evidence and human warmth.',
      icon: ShieldCheck
    },
    {
      title: language === 'es' ? 'Prevención y Fortalecimiento Familiar' : 'Prevention & Family Strengthening',
      description: language === 'es'
        ? 'Acompañamos a los entornos cuidadores con herramientas de crianza afectiva y resolución pacífica para prevenir el malestar emocional crónico.'
        : 'We support caregiving environments with positive parenting tools to prevent chronic emotional distress.',
      icon: Sparkles
    }
  ];

  return (
    <section id="impacto" className="py-20 relative overflow-hidden scroll-mt-24" aria-label="Impacto social y Quiénes Somos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Action Buttons at the Beginning */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Action Buttons right at the beginning of Transformando realidades */}
          {onSurveyClick && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <LiquidMetalButton
                label={t('impact.btnTest')}
                onClick={onSurveyClick}
                width={230}
                icon={<Sparkles className="w-4 h-4 text-cyan-300" />}
              />
            </div>
          )}

          <span className="inline-block px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md text-teal-800 text-xs font-semibold uppercase tracking-wider border border-white/80 shadow-xs mb-3">
            {t('impact.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-architects text-slate-900 tracking-normal">
            {t('impact.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            {t('impact.subtitle')}
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-white/45 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-white/70 shadow-sm hover:shadow-lg hover:bg-white/65 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md text-teal-700 border border-white/80 shadow-xs flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-900 tracking-tight mb-2">
                    {metric.value}
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2 leading-snug">
                    {metric.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {metric.subtext}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/50 flex items-center justify-between text-[11px] text-teal-700 font-medium">
                  <span>{t('impact.license')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative & Institutional Pillars */}
        <div className="bg-white/40 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/60 shadow-lg shadow-teal-900/5 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6">
              <span className="inline-block px-3 py-0.5 rounded-full bg-white/60 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-teal-800 border border-white/80">
                {t('impact.missionBadge')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-4 leading-snug">
                {t('impact.missionTitle')}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 font-light">
                {t('impact.missionP1')}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {t('impact.missionP2')}
              </p>

              {onAppointmentClick && (
                <div className="flex flex-wrap gap-3 mt-2">
                  <LiquidMetalButton
                    label={t('impact.appointmentBtn')}
                    onClick={onAppointmentClick}
                    width={280}
                  />
                </div>
              )}
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 gap-4">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/80 shadow-xs hover:bg-white/80 transition-all flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-800 border border-teal-500/20 shrink-0 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-800 mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Featured Testimonial Quote */}
        <div className="relative rounded-3xl bg-slate-900/85 backdrop-blur-2xl text-white p-8 sm:p-10 overflow-hidden border border-white/20 shadow-xl">
          <Quote className="absolute top-4 right-6 w-24 h-24 text-white/5 pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl font-light italic leading-relaxed text-teal-50">
              {t('impact.quote')}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 text-teal-300 flex items-center justify-center font-bold text-sm border border-white/20 backdrop-blur-md">
                LC
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{t('impact.quoteAuthor')}</div>
                <div className="text-xs text-teal-200">{t('impact.quoteRole')}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
