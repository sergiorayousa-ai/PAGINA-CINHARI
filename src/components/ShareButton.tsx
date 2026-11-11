import React, { useState } from 'react';
import { Share2, Copy, Check, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ShareButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title: language === 'es' ? 'Fundación CINHARI — Psicología Especializada' : 'CINHARI Foundation — Specialized Psychology',
    text: language === 'es' 
      ? 'Acompañamiento en salud mental y terapia psicológica en Fusagasugá, Soacha y virtual para toda Colombia.' 
      : 'Specialized mental health therapy and psychological support in Fusagasugá, Soacha, and nationwide teletherapy.',
    url: window.location.origin,
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to custom modal if user dismissed or unsupported
      }
    }
    setIsOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentUrl = encodeURIComponent(window.location.origin);
  const shareText = encodeURIComponent(shareData.text);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        id="share-website-button"
        onClick={handleShareClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-teal-900 border border-slate-200/80 shadow-xs hover:shadow-sm text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
        aria-label={language === 'es' ? 'Compartir página' : 'Share website'}
      >
        <Share2 className="w-3.5 h-3.5 text-teal-600" />
        <span>{language === 'es' ? 'Compartir' : 'Share'}</span>
      </button>

      {/* Fallback Share Modal / Popover */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#063852]">
                <Share2 className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-sm">
                  {language === 'es' ? 'Compartir Fundación CINHARI' : 'Share CINHARI Foundation'}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed font-light">
              {language === 'es'
                ? 'Difunde esta iniciativa para que más personas accedan a atención psicológica profesional y apoyo emocional.'
                : 'Help more individuals and families discover accessible, licensed mental health therapy.'}
            </p>

            {/* Quick Share Links */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-emerald-900 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold transition-colors"
              >
                <span>Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold transition-colors"
              >
                <span>X / Twitter</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 text-xs font-semibold transition-colors"
              >
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Copy URL Input */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="text"
                readOnly
                value={window.location.origin}
                className="bg-transparent text-xs text-slate-600 flex-1 outline-none truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? '¡Copiado!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Copiar' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
