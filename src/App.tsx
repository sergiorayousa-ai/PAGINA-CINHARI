import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CinhariWebScrollHero } from './components/CinhariWebScrollHero';
import { SearchIntentHeroIntro } from './components/SearchIntentHeroIntro';
import { QuienesSomos } from './components/QuienesSomos';
import { ServicesTableSection } from './components/ServicesTableSection';
import { ImpactMetrics } from './components/ImpactMetrics';
import { DonationSystem } from './components/DonationSystem';
import { PsychologicalSurvey } from './components/PsychologicalSurvey';
import { DailyWellnessResources } from './components/DailyWellnessResources';
import { PastEventsSection } from './components/PastEventsSection';
import { SedesLocations } from './components/SedesLocations';
import { FAQSection } from './components/FAQSection';
import { CrisisModal } from './components/CrisisModal';
import { SecurityModal } from './components/SecurityModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { Footer } from './components/Footer';
import { INITIAL_BLOG_POSTS } from './data/initialData';
import { Donation } from './types';
import { openWhatsApp } from './utils/whatsapp';
import { useSEO } from './hooks/useSEO';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [blogPosts] = useState(INITIAL_BLOG_POSTS);

  // Dynamic SEO meta-titles and descriptions based on view and language
  useSEO(activeSection);

  // Modals & Flows (Appointment modal removed for now; direct WhatsApp used)
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  // Accessibility State
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLarge, setFontSizeLarge] = useState(false);

  // ScrollSpy for Active Section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'terapia-psicologica', 'quienes-somos', 'servicios', 'impacto', 'encuesta', 'recursos', 'blog', 'donaciones', 'sedes', 'preguntas-frecuentes', 'contacto'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Defer slightly to ensure any collapsing mobile menus have finalized layout
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = Math.max(0, elementPosition - headerOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 50);
  };

  const handleOpenDonate = () => {
    handleNavigate('donaciones');
  };

  const handleOpenAppointmentWhatsApp = () => {
    openWhatsApp();
  };

  const handleDonationComplete = (newDonation: Donation) => {
    console.log('Donation completed:', newDonation);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      highContrast
        ? 'contrast-125 saturate-150 bg-slate-900 text-white'
        : 'bg-gradient-to-br from-[#f0f9ff] via-[#f5f3ff] to-[#e0f2f1] text-slate-800'
    } ${fontSizeLarge ? 'text-lg' : 'text-base'} pb-16 sm:pb-0`}>
      
      {/* Navigation Header with Cinhari Logo and Colombia Contact */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenDonate={handleOpenDonate}
        onOpenCrisis={() => setIsCrisisOpen(true)}
        onOpenAppointment={handleOpenAppointmentWhatsApp}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        fontSizeLarge={fontSizeLarge}
        onToggleFontSize={() => setFontSizeLarge(!fontSizeLarge)}
      />

      {/* Hero Section with Interactive Web Scroll 3-Hearts to Emblem Animation */}
      <CinhariWebScrollHero
        onSurveyClick={() => handleNavigate('encuesta')}
        onResourcesClick={() => handleNavigate('recursos')}
        onCrisisClick={() => setIsCrisisOpen(true)}
      />

      {/* 3, 4, 5, 6, 7, 8, 10: Single H1, Search Intent, Opening CTA, Key Takeaways (TL;DR) & Interlinking */}
      <SearchIntentHeroIntro
        onSurveyClick={() => handleNavigate('encuesta')}
        onCrisisClick={() => setIsCrisisOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Quiénes Somos - Directorio Clínico */}
      <QuienesSomos />

      {/* 9, 10, 11: Servicios y Modalidades Terapéuticas (Tabla Comparativa & Listas Estructuradas) */}
      <ServicesTableSection />

      {/* Social Impact Metrics & Mission (Fusagasugá, Soacha, ICBF) */}
      <ImpactMetrics
        onSurveyClick={() => handleNavigate('encuesta')}
        onAppointmentClick={handleOpenAppointmentWhatsApp}
      />

      {/* Psychological Wellness Screening Assessment: "¿Cómo estoy psicológicamente?" */}
      <PsychologicalSurvey
        onStartBreathingExercise={() => {
          handleNavigate('recursos');
        }}
        onBookAppointment={handleOpenAppointmentWhatsApp}
        onOpenCrisis={() => setIsCrisisOpen(true)}
      />

      {/* Daily Mental Wellness Support Resources */}
      <DailyWellnessResources
        onOpenCrisis={() => setIsCrisisOpen(true)}
      />

      {/* Past Foundation Events & Interactive Gallery (Fusagasugá & Soacha) */}
      <PastEventsSection
        onNavigateToContact={() => handleNavigate('contacto')}
      />

      {/* Integrated and Secure Donation System (PSE, Nequi, Daviplata, Bancolombia, DIAN Art. 257) */}
      <div id="donaciones-wrapper">
        <DonationSystem
          onDonationComplete={handleDonationComplete}
        />
      </div>

      {/* 12 & 13: Preguntas Frecuentes (FAQ Accordion con Interlinkeado y Schema) */}
      <FAQSection />

      {/* 16: Nuestras Sedes de Atención: Fusagasugá & Soacha con Schema de Negocio Local */}
      <SedesLocations />

      {/* Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDonate={handleOpenDonate}
        onOpenCrisis={() => setIsCrisisOpen(true)}
        onOpenSecurity={() => setIsSecurityOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* 21: Mobile Sticky CTA Bar */}
      <MobileStickyCTA
        onSurveyClick={() => handleNavigate('encuesta')}
        onCrisisClick={() => setIsCrisisOpen(true)}
      />

      {/* 24/7 Crisis Support Hotline Modal (Colombia / Cundinamarca) */}
      <CrisisModal
        isOpen={isCrisisOpen}
        onClose={() => setIsCrisisOpen(false)}
      />

      {/* Anti-Phishing & Official Security Verification Center Modal */}
      <SecurityModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />

    </div>
  );
}
