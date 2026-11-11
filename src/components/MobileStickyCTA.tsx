import React from 'react';
import { PhoneCall, ClipboardCheck, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { openWhatsApp } from '../utils/whatsapp';

interface MobileStickyCTAProps {
  onSurveyClick?: () => void;
  onCrisisClick?: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  onSurveyClick,
  onCrisisClick
}) => {
  const { language } = useLanguage();

  return (
    <div 
      id="mobile-fixed-cta-bar"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] flex items-center gap-2 print:hidden"
    >
      {/* Primary WhatsApp Booking Action */}
      <button
        type="button"
        id="mobile-sticky-whatsapp-btn"
        onClick={() => openWhatsApp(language === 'es' ? undefined : 'Hello! I want to start psychological therapy with CINHARI Foundation.')}
        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer truncate"
        aria-label="Agendar cita por WhatsApp"
      >
        <PhoneCall className="w-4 h-4 shrink-0" />
        <span className="truncate">
          {language === 'es' ? 'Agendar Cita (WhatsApp)' : 'Book Appointment (WhatsApp)'}
        </span>
      </button>

      {/* Secondary Quick Test Action */}
      {onSurveyClick && (
        <button
          type="button"
          id="mobile-sticky-survey-btn"
          onClick={onSurveyClick}
          className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/90 font-semibold text-xs active:scale-95 transition-all cursor-pointer shrink-0"
          aria-label="Test Emocional"
        >
          <ClipboardCheck className="w-4 h-4 text-teal-700" />
          <span>{language === 'es' ? 'Test Gratis' : 'Free Test'}</span>
        </button>
      )}

      {/* Emergency Crisis Button */}
      {onCrisisClick && (
        <button
          type="button"
          id="mobile-sticky-crisis-btn"
          onClick={onCrisisClick}
          className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/90 font-semibold text-xs active:scale-95 transition-all cursor-pointer shrink-0"
          aria-label={language === 'es' ? 'Líneas de Ayuda Inmediata' : 'Emergency Hotlines'}
          title={language === 'es' ? 'Líneas de Crisis' : 'Crisis Hotlines'}
        >
          <ShieldAlert className="w-4 h-4 text-rose-600" />
        </button>
      )}
    </div>
  );
};
