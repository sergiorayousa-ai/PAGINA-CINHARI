import React, { useState, useEffect, useRef } from 'react';
import { CinhariLogo } from './CinhariLogo';
import { LiquidMetalButton } from '@/components/ui/liquid-metal-button';
import { useLanguage } from '../context/LanguageContext';
import { ShareButton } from './ShareButton';
import {
  Menu,
  X,
  Heart,
  PhoneCall,
  ChevronDown,
  Calendar,
  Eye,
  Search,
  Activity,
  BookOpen,
  Users,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  MapPin,
  Globe
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenDonate: () => void;
  onOpenCrisis: () => void;
  onOpenAppointment: () => void;
  onOpenSecurity: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSizeLarge: boolean;
  onToggleFontSize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenDonate,
  onOpenCrisis,
  onOpenAppointment,
  onOpenSecurity,
  highContrast,
  onToggleHighContrast,
  fontSizeLarge,
  onToggleFontSize
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('cita') || q.includes('agendar') || q.includes('hora') || q.includes('book') || q.includes('appointment')) {
      onOpenAppointment();
    } else if (q.includes('crisis') || q.includes('urgencia') || q.includes('emergencia') || q.includes('ayuda') || q.includes('help')) {
      onOpenCrisis();
    } else if (q.includes('quienes') || q.includes('about') || q.includes('directorio') || q.includes('equipo') || q.includes('team')) {
      handleLinkClick('quienes-somos');
    } else if (q.includes('sede') || q.includes('location') || q.includes('fusagasuga') || q.includes('soacha')) {
      handleLinkClick('sedes');
    } else if (q.includes('test') || q.includes('ansiedad') || q.includes('depresion') || q.includes('evaluacion')) {
      handleLinkClick('encuesta');
    } else if (q.includes('recurso') || q.includes('respiracion') || q.includes('calma')) {
      handleLinkClick('recursos');
    } else if (q.includes('noticia') || q.includes('blog') || q.includes('articulo')) {
      handleLinkClick('blog');
    } else if (q.includes('dona') || q.includes('aporte') || q.includes('apoyar') || q.includes('donate')) {
      onOpenDonate();
    } else {
      handleLinkClick('quienes-somos');
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Top Banner for Direct Line, Address & Accessibility & Language Switcher */}
      <div className="bg-slate-900/90 backdrop-blur-md text-teal-100 text-xs py-1.5 px-4 sm:px-6 border-b border-white/10 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-white">{t('nav.careGuidance')}</span>
              <a
                href="tel:+573143674235"
                className="text-teal-200 hover:text-white font-semibold flex items-center gap-1 transition-colors ml-0.5"
              >
                <PhoneCall className="w-3 h-3 text-teal-400" />
                <span>314 3674235</span>
              </a>
            </div>

            <span className="hidden sm:inline text-white/30">|</span>

            <span className="hidden md:inline text-teal-200/85 text-[11px]">
              {t('nav.locationsSub')}
            </span>

            <button
              onClick={onOpenCrisis}
              className="text-amber-300 hover:text-amber-200 font-medium underline text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
            >
              {t('nav.crisisLine')}
            </button>

            <span className="hidden lg:inline text-white/30">|</span>

            {/* Anti-Phishing Official Verification Badge */}
            <button
              onClick={onOpenSecurity}
              className="hidden lg:flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 hover:text-white px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer shadow-xs"
              title="Verificar autenticidad del sitio y canales oficiales contra fraudes"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'es' ? 'Canal Oficial Verificado' : 'Verified Official Channel'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto text-[11px]">
            {/* Language Switcher Button (ES | EN) */}
            <div className="flex items-center bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 gap-1">
              <Globe className="w-3 h-3 text-teal-300" />
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  language === 'es' ? 'bg-teal-500 text-white shadow-xs' : 'text-teal-200 hover:text-white'
                }`}
                aria-label="Cambiar idioma a Español"
                title="Español"
              >
                ES
              </button>
              <span className="text-white/30 text-[10px]">|</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  language === 'en' ? 'bg-teal-500 text-white shadow-xs' : 'text-teal-200 hover:text-white'
                }`}
                aria-label="Switch language to English"
                title="English"
              >
                EN
              </button>
            </div>

            {/* Accessibility Toggles */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15">
              <button
                type="button"
                onClick={onToggleFontSize}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                  fontSizeLarge ? 'bg-teal-500 text-white' : 'text-teal-300 hover:text-white'
                }`}
                title="Aumentar o reducir tamaño del texto"
                aria-label="Aumentar tamaño de fuente"
              >
                A+ / A-
              </button>
              <span className="text-teal-500/60">|</span>
              <button
                type="button"
                onClick={onToggleHighContrast}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                  highContrast ? 'bg-amber-400 text-slate-950 font-bold' : 'text-teal-300 hover:text-white'
                }`}
                title="Alternar modo de alto contraste para personas con baja visión"
                aria-label="Modo alto contraste"
              >
                <Eye className="w-3 h-3" />
                <span>{highContrast ? t('nav.highContrast') : t('nav.contrast')}</span>
              </button>
            </div>

            <button
              onClick={onOpenAppointment}
              className="hidden md:inline-flex items-center gap-1 text-emerald-300 hover:text-white transition-colors cursor-pointer font-medium"
              title="Enviar mensaje para agendar cita por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('nav.sendAppointmentMsg')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header with Logo Centered in the middle (Like Reference Design) */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 shadow-xs`}
        ref={dropdownRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Centered Logo Area */}
          <div className="py-2.5 sm:py-3 flex items-center justify-between lg:justify-center relative border-b border-slate-100 lg:border-none">
            {/* Centered Brand Link */}
            <button
              onClick={() => handleLinkClick('inicio')}
              className="flex items-center justify-center focus:outline-none group cursor-pointer"
              aria-label="Fundación CINHARI - Psicología Especializada - Inicio"
            >
              <CinhariLogo
                size="md"
                variant="full"
                showTagline={true}
                customTagline="Psicología Especializada - Bogotá - Soacha"
              />
            </button>

            {/* Mobile Actions on right side of top row: Language selector OUTSIDE menu + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Language Switcher OUTSIDE the menu button */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    language === 'es'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="Español"
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-label="English"
                >
                  EN
                </button>
              </div>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 focus:outline-none cursor-pointer"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Desktop Navigation Menu Bar (Centered below the logo) */}
          <div className="hidden lg:flex items-center justify-center py-2 relative">
            <nav className="flex items-center gap-1 xl:gap-2 text-[13.5px] font-medium text-slate-700" aria-label="Navegación principal">
              {/* Inicio */}
              <button
                type="button"
                onClick={() => handleLinkClick('inicio')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'inicio' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.inicio')}
              </button>

              {/* Quiénes somos (Directorio) */}
              <button
                type="button"
                onClick={() => handleLinkClick('quienes-somos')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'quienes-somos' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.quienesSomos')}
              </button>

              {/* Sedes (Fusagasugá & Soacha) */}
              <button
                type="button"
                onClick={() => handleLinkClick('sedes')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'sedes' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.sedes')}
              </button>

              {/* Impacto */}
              <button
                type="button"
                onClick={() => handleLinkClick('impacto')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'impacto' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.impacto')}
              </button>

              {/* Test Emocional */}
              <button
                type="button"
                onClick={() => handleLinkClick('encuesta')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'encuesta' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.encuesta')}
              </button>

              {/* Recursos ▾ */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'recursos' ? null : 'recursos')}
                  onMouseEnter={() => setOpenDropdown('recursos')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    activeSection === 'recursos' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t('nav.recursos')}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {openDropdown === 'recursos' && (
                  <div
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  >
                    <button
                      onClick={() => handleLinkClick('recursos')}
                      className="w-full text-left px-4 py-2 hover:bg-teal-50 text-slate-700 hover:text-teal-900 text-xs flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <div>
                        <div className="font-semibold">{language === 'es' ? 'Bienestar Diario' : 'Daily Wellness'}</div>
                        <div className="text-[10px] text-slate-500">{language === 'es' ? 'Ejercicios de respiración y calma' : 'Breathing and grounding exercises'}</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleLinkClick('recursos')}
                      className="w-full text-left px-4 py-2 hover:bg-teal-50 text-slate-700 hover:text-teal-900 text-xs flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      <div>
                        <div className="font-semibold">{language === 'es' ? 'Guías Psicoeducativas' : 'Psychoeducational Guides'}</div>
                        <div className="text-[10px] text-slate-500">{language === 'es' ? 'Herramientas prácticas para familias' : 'Practical tools for families'}</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Noticias */}
              <button
                type="button"
                onClick={() => handleLinkClick('blog')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'blog' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.blog')}
              </button>

              {/* Donaciones */}
              <button
                type="button"
                onClick={() => handleLinkClick('donaciones')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeSection === 'donaciones' ? 'text-teal-700 font-bold bg-teal-50/80' : 'hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.donaciones')}
              </button>

              {/* Language Switcher & Search Toggle Icon & Desktop CTA */}
              <div className="relative ml-1 flex items-center gap-2">
                {/* Desktop Language Switcher */}
                <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setLanguage('es')}
                    className={`px-2 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      language === 'es' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label="Español"
                  >
                    ES
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      language === 'en' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label="English"
                  >
                    EN
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-teal-800 transition-colors cursor-pointer"
                  title="Buscar"
                  aria-label="Buscar"
                >
                  <Search className="w-4 h-4" />
                </button>

                <div className="hidden xl:block ml-1">
                  <LiquidMetalButton
                    label={t('nav.whatsAppAppointment')}
                    onClick={onOpenAppointment}
                    width={220}
                  />
                </div>

                {searchOpen && (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      autoFocus
                      placeholder={language === 'es' ? 'Buscar: cita, test, donar, sede...' : 'Search: appointments, test, donate, clinic...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Ir
                    </button>
                  </form>
                )}
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleLinkClick('inicio')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {t('nav.inicio')}
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('quienes-somos')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#19909c] hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{t('nav.quienesSomos')} ({t('about.badge')})</span>
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('sedes')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-teal-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{t('nav.sedes')} (Fusagasugá & Soacha)</span>
                <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold">{t('nav.twoBranches')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('impacto')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {t('nav.impacto')}
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('encuesta')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-teal-800 bg-teal-50/60 flex items-center justify-between"
              >
                <span>{t('nav.encuesta')}</span>
                <span className="text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-bold">Gratis</span>
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('recursos')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {t('nav.recursos')}
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('blog')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {t('nav.blog')}
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('donaciones')}
                className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                {t('nav.donaciones')}
              </button>

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-3">
                <div className="w-full flex justify-center py-1">
                  <LiquidMetalButton
                    label={t('nav.sendAppointmentMsg')}
                    onClick={() => {
                      onOpenAppointment();
                      setMobileMenuOpen(false);
                    }}
                    width={260}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onOpenCrisis();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
                  {t('nav.crisisLine')} (314 3674235)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenSecurity();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'es' ? 'Verificar Sitio Oficial & Anti-Phishing' : 'Verify Official Site & Anti-Phishing'}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

