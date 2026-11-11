import React from 'react';
import { PhoneCall, ShieldAlert, Heart, X, CheckCircle2, Wind } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const hotlines = language === 'es' ? [
    {
      name: 'Línea 106 — "El poder de ser escuchado" (Bogotá y Soacha / Cundinamarca)',
      number: '106 · WhatsApp 300 754 8933',
      tel: 'tel:106',
      badge: '24h · Gratuita y Confidencial',
      desc: 'Secretaría Distrital de Salud. Atención psicológica inmediata ante crisis de angustia, ideación suicida, depresión o problemas familiares.'
    },
    {
      name: 'Línea 141 — Protección a Niños, Niñas y Familias (ICBF Colombia)',
      number: '141',
      tel: 'tel:141',
      badge: '24/7 · Cobertura Nacional Gratuita',
      desc: 'Instituto Colombiano de Bienestar Familiar. Orientación prioritaria en derechos de infancia, prevención de vulneraciones y apoyo a familias.'
    },
    {
      name: 'Línea Púrpura Distrital — Mujeres que escuchan mujeres (Bogotá / Soacha)',
      number: '01 8000 112 137 · WhatsApp 300 755 1846',
      tel: 'tel:018000112137',
      badge: '24h · Apoyo Psicosocial y Jurídico',
      desc: 'Atención psicológica y acompañamiento a mujeres y cuidadoras frente a crisis emocionales y situaciones de riesgo.'
    },
    {
      name: 'Línea Calma para Hombres (Bogotá / Región)',
      number: '01 8000 423 614',
      tel: 'tel:018000423614',
      badge: 'Lunes a Domingo · Gratuita',
      desc: 'Espacio de escucha, manejo del estrés, contención emocional y trámite de la ira para hombres.'
    },
    {
      name: 'Línea 123 — Emergencias y Rescate (Bogotá y Soacha)',
      number: '123',
      tel: 'tel:123',
      badge: '24/7 · Respuesta Inmediata',
      desc: 'Número único para situaciones de emergencia médica, psiquiátrica o de riesgo inminente.'
    },
    {
      name: 'Fundación CINHARI — Psicología Especializada y Atención Directa',
      number: '+57 314 367 4235 (Línea & WhatsApp)',
      tel: 'tel:+573143674235',
      badge: 'Sede Calle 17 A # 13-24',
      desc: 'Atención psicológica profesional, evaluación integral y apoyo terapéutico presencial y virtual.'
    }
  ] : [
    {
      name: 'Line 106 — "The Power of Being Heard" (Bogotá & Soacha / Cundinamarca)',
      number: '106 · WhatsApp 300 754 8933',
      tel: 'tel:106',
      badge: '24/7 · Free & Confidential',
      desc: 'Health Secretariat. Immediate psychological support for anxiety crises, distress, depression, or family emergencies.'
    },
    {
      name: 'Line 141 — Child & Family Protection (ICBF Colombia)',
      number: '141',
      tel: 'tel:141',
      badge: '24/7 · Free Nationwide Hotline',
      desc: 'Colombian Institute of Family Welfare. Priority guidance on child rights, protection, and family support.'
    },
    {
      name: 'Purple Line — Women Supporting Women (Bogotá / Soacha)',
      number: '01 8000 112 137 · WhatsApp 300 755 1846',
      tel: 'tel:018000112137',
      badge: '24/7 · Psychosocial & Legal Aid',
      desc: 'Psychological care and accompaniment for women and caregivers facing emotional crises or distress.'
    },
    {
      name: 'Calma Line for Men (Bogotá / Region)',
      number: '01 8000 423 614',
      tel: 'tel:018000423614',
      badge: 'Mon-Sun · Toll-Free',
      desc: 'Dedicated emotional support, stress management, and emotional containment for men.'
    },
    {
      name: 'Line 123 — Emergency & First Responders (Bogotá & Soacha)',
      number: '123',
      tel: 'tel:123',
      badge: '24/7 · Immediate Response',
      desc: 'Unified emergency line for acute medical, psychiatric, or safety crises.'
    },
    {
      name: 'CINHARI Foundation — Specialized Direct Psychological Care',
      number: '+57 314 367 4235 (Hotline & WhatsApp)',
      tel: 'tel:+573143674235',
      badge: 'Calle 17 A # 13-24 Location',
      desc: 'Professional psychological care, comprehensive evaluation, and in-person & virtual therapeutic support.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white/90 backdrop-blur-2xl rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/80 p-6 sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-white/60 pb-4 mb-4">
          <div className="flex items-center gap-2.5 text-rose-700">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-200/80 backdrop-blur-sm flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg leading-tight">
                {language === 'es' ? 'Recursos de Apoyo Inmediato' : 'Immediate Support Hotlines'}
              </h3>
              <p className="text-xs text-rose-700 font-medium">
                {language === 'es' ? 'No estás solo/a. Hay ayuda disponible ahora mismo.' : 'You are not alone. Help is available right now.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/60 backdrop-blur-sm transition-all cursor-pointer"
            aria-label={language === 'es' ? 'Cerrar' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 font-light leading-relaxed">
          {language === 'es'
            ? 'Si tú o alguien cercano está viviendo un momento de angustia abrumadora o pensamientos de autolesión, por favor comunícate de inmediato con una de estas líneas especializadas:'
            : 'If you or someone close to you is experiencing overwhelming distress or crisis, please reach out immediately to one of these specialized hotlines:'}
        </p>

        {/* Hotlines */}
        <div className="space-y-3 mb-6">
          {hotlines.map((h, i) => (
            <a
              key={i}
              href={h.tel}
              className="block p-4 rounded-2xl bg-rose-50/60 hover:bg-rose-100/70 border border-rose-200/80 backdrop-blur-sm transition-all group shadow-xs hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 text-sm group-hover:text-rose-900">{h.name}</span>
                <span className="text-[10px] font-semibold bg-white/90 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-200/80 shadow-xs backdrop-blur-sm">
                  {h.badge}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2 font-light">{h.desc}</p>
              <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'es' ? 'Llamar al' : 'Call'} {h.number}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Immediate Calming Tip */}
        <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 text-xs text-teal-950 space-y-1.5 mb-4 shadow-xs">
          <div className="font-bold flex items-center gap-1.5 text-teal-900">
            <Wind className="w-4 h-4 text-teal-700" />
            <span>
              {language === 'es'
                ? 'Si sientes pánico o taquicardia en este momento:'
                : 'If you feel panic or rapid heart rate right now:'}
            </span>
          </div>
          <p className="text-slate-600 font-light">
            {language === 'es'
              ? 'Pon ambos pies firmes en el suelo, apoya una mano en tu pecho y otra en tu abdomen. Exhala lentamente todo el aire por la boca como si soplaras una vela. Recuerda: esta sensación pasará y tu cuerpo recuperará la calma.'
              : 'Plant both feet firmly on the ground, rest one hand on your chest and the other on your stomach. Exhale slowly through your mouth as if blowing out a candle. Remember: this feeling will pass and your body will regain calm.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/70 hover:bg-white border border-white/80 text-slate-700 font-semibold text-xs backdrop-blur-sm shadow-xs transition-all cursor-pointer"
        >
          {language === 'es' ? 'Cerrar ventana' : 'Close window'}
        </button>
      </motion.div>
    </div>
  );
};
