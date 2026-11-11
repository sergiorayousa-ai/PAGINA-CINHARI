import React, { useState } from 'react';
import { CinhariLogo } from './CinhariLogo';
import { SocialLinks } from '@/components/ui/social-links';
import { GradientWave } from '@/components/ui/gradient-wave';
import { openWhatsApp } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowUp,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDonate: () => void;
  onOpenCrisis: () => void;
  onOpenSecurity?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenCrisis,
  onOpenSecurity
}) => {
  const { language, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const CINHARI_SOCIALS = [
    {
      name: 'Instagram',
      image: 'https://cdn.21st.dev/assets/localized/6486882af723b976a81fed3662a2950cb06a250d8978efdb5e3f0ac3590b5fae.png',
      url: 'https://www.instagram.com/fundacioncinhari'
    },
    {
      name: 'Facebook',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
      url: 'https://www.facebook.com/fundacioncinhari'
    },
    {
      name: 'WhatsApp',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
      onClick: () => openWhatsApp('Hola Fundación CINHARI, deseo solicitar información para agendar una cita de atención psicológica.')
    }
  ];

  return (
    <footer id="contacto" className="relative overflow-hidden pt-16 pb-12 text-slate-100 border-t border-sky-400/25 shadow-2xl z-10" aria-label="Pie de página de Fundación Cinhari">
      {/* Animated Gradient Wave Background (WebGL smooth canvas) */}
      <GradientWave
        colors={["#0284c7", "#06b6d4", "#0d9488", "#38bdf8", "#0284c7", "#14b8a6"]}
        shadowPower={3}
        darkenTop={false}
        noiseSpeed={0.000015}
        noiseFrequency={[0.00015, 0.0008]}
        deform={{ incline: 0.35, noiseAmp: 180, noiseFlow: 4 }}
        className="opacity-95"
      />

      {/* Soft translucent marine tint for pristine text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#034d70]/65 via-[#033c57]/60 to-[#022a3e]/70 backdrop-blur-[1px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <CinhariLogo size="lg" theme="light" showTagline={true} customTagline={language === 'es' ? "Psicología Especializada - Fusagasugá & Soacha" : "Specialized Psychology - Fusagasugá & Soacha"} />
            
            <p className="text-sky-100/90 text-xs sm:text-sm leading-relaxed font-light mt-3">
              {language === 'es'
                ? 'Centro Integral de Habilitación y Psicología Especializada. Acompañamiento terapéutico accesible, calidez humana y desarrollo psicosocial en nuestras sedes de Fusagasugá y Soacha.'
                : 'Comprehensive Habilitation & Specialized Psychology Center. Accessible therapeutic accompaniment, humane warmth, and psychosocial development across our Fusagasugá and Soacha locations.'}
            </p>

            {/* Social Links Component (Instagram, Facebook, WhatsApp) */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-200/90 block mb-2">
                {language === 'es' ? 'Redes y Contacto Directo:' : 'Social & Direct Contact:'}
              </span>
              <div className="inline-block bg-white/10 border border-white/20 rounded-2xl px-2 py-1 backdrop-blur-md shadow-xs">
                <SocialLinks socials={CINHARI_SOCIALS} className="text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-sky-100">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  {t('nav.inicio')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quienes-somos')} className="hover:text-cyan-300 transition-colors cursor-pointer font-semibold text-cyan-200">
                  {t('nav.quienesSomos')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sedes')} className="hover:text-cyan-300 transition-colors cursor-pointer font-semibold text-cyan-200">
                  {t('nav.sedes')} (Fusagasugá & Soacha)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('impacto')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  {t('nav.impacto')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('encuesta')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  {t('nav.encuesta')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recursos')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  {t('nav.recursos')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  {t('nav.blog')}
                </button>
              </li>
              <li>
                <button onClick={onOpenDonate} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  {t('nav.donaciones')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Attention */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              {language === 'es' ? 'Contacto & Sedes' : 'Contact & Locations'}
            </h4>
            <ul className="space-y-3 text-xs text-sky-100">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {language === 'es' ? 'Sede Fusagasugá:' : 'Fusagasugá Location:'}
                  </span>
                  <span className="text-sky-200/80">Calle 17A # 13-24 / 13-30, Barrio Piedra Grande</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    {language === 'es' ? 'Sede Soacha:' : 'Soacha Location:'}
                  </span>
                  <span className="text-sky-200/80">
                    {language === 'es' ? 'Atención Psicológica Especializada, Cundinamarca' : 'Specialized Psychological Care, Cundinamarca'}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                <div>
                  <span className="text-sky-200/80 text-[10px] block">
                    {language === 'es' ? 'WhatsApp / Línea Oficial:' : 'Official WhatsApp Line:'}
                  </span>
                  <button
                    onClick={() => openWhatsApp()}
                    className="hover:text-white font-semibold text-emerald-300 transition-colors cursor-pointer text-left"
                  >
                    314 367 4235 ({language === 'es' ? 'Clic para WhatsApp' : 'Click for WhatsApp'})
                  </button>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
                <a href="mailto:contacto@fundacioncinhari.org" className="hover:text-white transition-colors text-sky-100">
                  contacto@fundacioncinhari.org
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenCrisis}
                className="text-xs px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 font-semibold inline-block backdrop-blur-sm transition-all cursor-pointer"
              >
                {language === 'es' ? 'Línea de Crisis & Apoyo Emocional 24h' : '24/7 Crisis Hotline & Emotional Support'}
              </button>
            </div>
          </div>

          {/* Newsletter / Bulletin */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              {language === 'es' ? 'Píldora Semanal de Salud Mental' : 'Weekly Mental Health Bulletin'}
            </h4>
            <p className="text-xs text-sky-200/90 font-light">
              {language === 'es'
                ? 'Recibe reflexiones psicológicas, guías prácticas y convocatorias de talleres gratuitos en tu email.'
                : 'Receive psychological reflections, practical guides, and free workshop alerts directly in your inbox.'}
            </p>

            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={language === 'es' ? 'Tu correo electrónico...' : 'Your email address...'}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-cyan-300 text-xs text-white placeholder-sky-200/60 backdrop-blur-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white transition-colors cursor-pointer shadow-xs"
                    aria-label={language === 'es' ? 'Suscribirse al boletín' : 'Subscribe to bulletin'}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-sky-200/70 block">
                  {language === 'es' ? 'Sin spam. Puedes darte de baja en cualquier momento.' : 'No spam. Unsubscribe at any time.'}
                </span>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-teal-900/60 border border-teal-400/50 text-teal-200 text-xs backdrop-blur-sm">
                {language === 'es' ? '¡Gracias por suscribirte a la comunidad CINHARI!' : 'Thank you for subscribing to the CINHARI community!'}
              </div>
            )}
          </div>

        </div>

        {/* Anti-Phishing & Official Trust Banner */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-white/10 border border-teal-300/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-xs sm:text-sm">
                  {language === 'es' ? 'Portal Oficial Protegido & Verificado' : 'Official Protected & Verified Portal'}
                </span>
                <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  Anti-Phishing SSL 256-bit
                </span>
              </div>
              <p className="text-sky-200/90 text-[11px] sm:text-xs mt-0.5">
                {language === 'es'
                  ? 'Verifica nuestros únicos canales oficiales contra suplantaciones y fraudes cibernéticos (NIT 901.428.190-2 • ICBF LF-3298).'
                  : 'Verify our authentic official channels against phishing and digital fraud (NIT 901.428.190-2 • ICBF LF-3298).'}
              </p>
            </div>
          </div>

          {onOpenSecurity && (
            <button
              onClick={onOpenSecurity}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'es' ? 'Verificar Canales & Seguridad' : 'Verify Security & Channels'}</span>
            </button>
          )}
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/80">
          <div>
            © {new Date().getFullYear()} Fundación CINHARI. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap">
            {onOpenSecurity && (
              <button
                onClick={onOpenSecurity}
                className="hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'es' ? 'Seguridad & Anti-Phishing' : 'Security & Anti-Phishing'}</span>
              </button>
            )}
            <a href="#contacto" className="hover:text-white transition-colors">
              {language === 'es' ? 'Aviso Legal' : 'Legal Notice'}
            </a>
            <a href="#contacto" className="hover:text-white transition-colors">
              {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
            </a>
            <a href="#donaciones" className="hover:text-white transition-colors">
              {language === 'es' ? 'Transparencia y Cuentas' : 'Transparency & Reports'}
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all ml-2 cursor-pointer"
              title={language === 'es' ? 'Volver arriba' : 'Back to top'}
              aria-label={language === 'es' ? 'Volver arriba' : 'Back to top'}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
