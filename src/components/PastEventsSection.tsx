import React, { useState } from 'react';
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from '@/components/blocks/cta-section-with-gallery';
import { Button } from '@/components/ui/button';
import { PAST_EVENTS, PastEvent } from '../data/pastEvents';
import { useLanguage } from '../context/LanguageContext';
import { openWhatsApp } from '../utils/whatsapp';
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Quote,
  Eye,
  MessageCircle,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PastEventsSectionProps {
  onNavigateToContact?: () => void;
}

export const PastEventsSection: React.FC<PastEventsSectionProps> = ({
  onNavigateToContact,
}) => {
  const { language } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState<PastEvent | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleImageClick = (event: PastEvent, index: number) => {
    setSelectedEvent(event);
    setSelectedIndex(index);
  };

  const handlePrevEvent = () => {
    const newIndex =
      selectedIndex === 0 ? PAST_EVENTS.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedEvent(PAST_EVENTS[newIndex]);
  };

  const handleNextEvent = () => {
    const newIndex =
      selectedIndex === PAST_EVENTS.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedEvent(PAST_EVENTS[newIndex]);
  };

  const handleShareEvent = (event: PastEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `${event.title} - Fundación CINHARI (${event.location})`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(
        `${event.title}: ${event.description} - Fundación CINHARI`
      );
      setCopiedId(event.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section
      id="blog"
      className="py-20 relative overflow-hidden scroll-mt-24 bg-gradient-to-b from-white via-sky-50/30 to-white"
      aria-label="Eventos pasados y memorias de Fundación CINHARI"
    >
      {/* Anchor for both #eventos and #blog */}
      <span id="eventos" className="absolute -top-24 left-0" />

      {/* Decorative ambient blurred orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/25 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:px-8 md:grid-cols-2 relative z-10">
        
        {/* Left Column: CTA & Staggered Typography with Brand Colors */}
        <ContainerStagger className="space-y-6">
          <ContainerAnimated className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-800 tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin-slow" />
            <span>
              {language === 'es'
                ? 'Memorias & Eventos de la Fundación'
                : 'Foundation Memories & Past Events'}
            </span>
          </ContainerAnimated>

          <ContainerAnimated className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 tracking-tight leading-[1.15]">
            {language === 'es' ? (
              <>
                Huellas que sanan y{' '}
                <span className="text-teal-700 underline decoration-cyan-400 decoration-wavy decoration-2">
                  transforman vidas
                </span>{' '}
                en nuestra comunidad
              </>
            ) : (
              <>
                Footprints that heal and{' '}
                <span className="text-teal-700 underline decoration-cyan-400 decoration-wavy decoration-2">
                  transform lives
                </span>{' '}
                in our community
              </>
            )}
          </ContainerAnimated>

          <ContainerAnimated className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {language === 'es'
              ? 'Conoce nuestras brigadas psicosociales, talleres de arte-terapia para la niñez y seminarios inclusivos en Fusagasugá y Soacha. Cada fotografía encierra una historia real de superación, dignidad y calidez humana.'
              : 'Explore our psychosocial field clinics, child art-therapy workshops, and inclusive educational seminars in Fusagasugá and Soacha. Every photo holds a genuine story of resilience and community hope.'}
          </ContainerAnimated>

          {/* Quick interactive hint */}
          <ContainerAnimated className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-teal-100 shadow-xs text-xs text-slate-700">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <p className="leading-snug">
              <strong className="text-teal-900 font-semibold">
                {language === 'es' ? 'Galería Interactiva: ' : 'Interactive Gallery: '}
              </strong>
              {language === 'es'
                ? 'Haz clic en cualquiera de las 4 imágenes para ver qué ocurrió en la fundación en cada jornada.'
                : 'Click any of the 4 photos to explore what happened at the foundation during each event.'}
            </p>
          </ContainerAnimated>

          {/* Action buttons with brand teal/cyan colors */}
          <ContainerAnimated className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={() => openWhatsApp('Hola Fundación CINHARI, quisiera conocer las próximas fechas de eventos comunitarios y talleres terapéuticos.')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-teal-600/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-teal-200" />
              <span>
                {language === 'es'
                  ? 'Participar en Próximos Eventos'
                  : 'Join Upcoming Events'}
              </span>
            </Button>

            {onNavigateToContact && (
              <Button
                variant="outline"
                onClick={onNavigateToContact}
                className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-5 py-2.5 rounded-xl cursor-pointer"
              >
                {language === 'es' ? 'Contactar Sedes' : 'Contact Locations'}
              </Button>
            )}
          </ContainerAnimated>
        </ContainerStagger>

        {/* Right Column: Interactive Gallery Grid */}
        <div className="relative">
          {/* Subtle background glow frame */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/10 via-cyan-400/10 to-transparent rounded-3xl -z-10 blur-xl" />

          <GalleryGrid className="relative z-10">
            {PAST_EVENTS.map((event, index) => {
              return (
                <GalleryGridCell
                  key={event.id}
                  index={index}
                  onClick={() => handleImageClick(event, index)}
                  className="group relative cursor-pointer ring-2 ring-white/80 hover:ring-4 hover:ring-teal-400/80 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
                  title={`${event.title} - Clic para ver detalles`}
                >
                  <img
                    className="size-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500 ease-out"
                    width="100%"
                    height="100%"
                    src={event.imageUrl}
                    alt={event.title}
                    loading="lazy"
                  />

                  {/* Gradient Overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-cyan-300 backdrop-blur-md border border-cyan-400/30 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {event.badge}
                    </span>
                  </div>

                  {/* Bottom Info on the Image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-left">
                    <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-1 group-hover:text-cyan-200 transition-colors drop-shadow-md">
                      {event.title}
                    </h3>
                    <p className="text-slate-200/90 text-[10px] sm:text-[11px] flex items-center gap-1 mt-0.5 drop-shadow">
                      <MapPin className="w-3 h-3 text-cyan-300 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </p>
                  </div>

                  {/* Hover Floating Action Cue */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-teal-950/30 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 text-teal-900 text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                      <Eye className="w-3.5 h-3.5 text-teal-600" />
                      {language === 'es' ? 'Ver qué ocurrió' : 'View Event Story'}
                    </span>
                  </div>
                </GalleryGridCell>
              );
            })}
          </GalleryGrid>

          {/* Micro Caption below gallery */}
          <div className="flex items-center justify-between text-xs text-slate-500 mt-4 px-2">
            <span className="flex items-center gap-1 text-teal-800 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              {language === 'es'
                ? 'Jornadas documentadas en Fusagasugá y Soacha'
                : 'Documented events in Fusagasugá & Soacha'}
            </span>
            <span className="text-[11px] text-slate-400">
              {language === 'es' ? 'Haz clic para ampliar' : 'Click to inspect'}
            </span>
          </div>
        </div>

      </div>

      {/* Modal Dialog: Description of what occurred at the Foundation */}
      <AnimatePresence>
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-event-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                aria-label="Cerrar modal de evento"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top: Event Image & Overlaid Badges */}
              <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden bg-slate-900">
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Badges on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-bold tracking-wide shadow-xs">
                      {selectedEvent.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                      {selectedEvent.date}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                      {selectedEvent.location}
                    </span>
                  </div>
                  <h3
                    id="modal-event-title"
                    className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight"
                  >
                    {selectedEvent.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body: Description of what happened at the Foundation */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Highlights Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-teal-800 block">
                        {language === 'es' ? 'Participación:' : 'Participants:'}
                      </span>
                      <p className="text-xs text-slate-700 font-medium">
                        {selectedEvent.attendees}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-100 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-cyan-800 block">
                        {language === 'es' ? 'Impacto Alcanzado:' : 'Impact Achieved:'}
                      </span>
                      <p className="text-xs text-slate-700 font-medium">
                        {selectedEvent.impactMetrics}
                      </p>
                    </div>
                  </div>
                </div>

                {/* What happened in the foundation */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    {language === 'es'
                      ? '¿Qué ocurrió en esta jornada de la fundación?'
                      : 'What occurred during this foundation event?'}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Testimonial Quote if available */}
                {selectedEvent.quote && (
                  <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-teal-500 relative">
                    <Quote className="w-5 h-5 text-teal-500/40 absolute top-3 right-3" />
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      «{selectedEvent.quote.text}»
                    </p>
                    <span className="text-[11px] font-semibold text-teal-900 block mt-2">
                      — {selectedEvent.quote.author}
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-medium text-slate-400 mr-1">
                    {language === 'es' ? 'Ejes:' : 'Tags:'}
                  </span>
                  {selectedEvent.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer Navigation & Actions */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Prev/Next buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handlePrevEvent}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{language === 'es' ? 'Anterior' : 'Previous'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextEvent}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>{language === 'es' ? 'Siguiente' : 'Next'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Share & WhatsApp CTA */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={(e) => handleShareEvent(selectedEvent, e)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                      title="Compartir memoria de evento"
                    >
                      <Share2 className="w-4 h-4 text-teal-600" />
                      <span>
                        {copiedId === selectedEvent.id
                          ? (language === 'es' ? '¡Copiado!' : 'Copied!')
                          : (language === 'es' ? 'Compartir' : 'Share')}
                      </span>
                    </button>

                    <Button
                      onClick={() => {
                        openWhatsApp(
                          `Hola Fundación CINHARI, estuve viendo la memoria del evento "${selectedEvent.title}" y quisiera recibir información sobre cómo vincularme o participar.`
                        );
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      {language === 'es'
                        ? 'Consultar sobre este Programa'
                        : 'Inquire About This Program'}
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default PastEventsSection;
