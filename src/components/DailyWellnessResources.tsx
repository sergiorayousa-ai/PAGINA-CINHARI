import React, { useState, useEffect, useRef } from 'react';
import { DAILY_WELLNESS_RESOURCES } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Wind,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Download,
  CheckCircle2,
  Heart,
  ChevronRight,
  Headphones,
  FileText,
  Moon,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DailyWellnessResourcesProps {
  onOpenCrisis: () => void;
}

export const DailyWellnessResources: React.FC<DailyWellnessResourcesProps> = ({
  onOpenCrisis
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'daily' | 'breathing' | 'guides' | 'audio'>('daily');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Breathing Pacer State
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhala' | 'Sostén' | 'Exhala' | 'Pausa'>('Inhala');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [breathingTechnique, setBreathingTechnique] = useState<'478' | 'box'>('478');

  // Ambient Sound Generator (Web Audio API)
  const [isPlayingAmbient, setIsPlayingAmbient] = useState<boolean>(false);
  const [activeSound, setActiveSound] = useState<'rain' | 'waves' | 'calm' | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundNodesRef = useRef<{ source?: AudioNode; gain?: GainNode }>({});

  const currentResource = DAILY_WELLNESS_RESOURCES[selectedDayIndex] || DAILY_WELLNESS_RESOURCES[0];

  // Synthesize gentle calming tone for breathing transitions
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }
  };

  // Breathing pacer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition phases
            if (breathingTechnique === '478') {
              if (breathPhase === 'Inhala') {
                setBreathPhase('Sostén');
                playChime();
                return 7;
              } else if (breathPhase === 'Sostén') {
                setBreathPhase('Exhala');
                playChime();
                return 8;
              } else {
                setBreathPhase('Inhala');
                setCyclesCompleted((c) => c + 1);
                playChime();
                return 4;
              }
            } else {
              // Box Breathing (4-4-4-4)
              if (breathPhase === 'Inhala') {
                setBreathPhase('Sostén');
                playChime();
                return 4;
              } else if (breathPhase === 'Sostén') {
                setBreathPhase('Exhala');
                playChime();
                return 4;
              } else if (breathPhase === 'Exhala') {
                setBreathPhase('Pausa');
                playChime();
                return 4;
              } else {
                setBreathPhase('Inhala');
                setCyclesCompleted((c) => c + 1);
                playChime();
                return 4;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase, breathingTechnique, soundEnabled]);

  const toggleBreathing = () => {
    if (!isBreathingActive) {
      setBreathPhase('Inhala');
      setPhaseSecondsLeft(breathingTechnique === '478' ? 4 : 4);
      playChime();
    }
    setIsBreathingActive(!isBreathingActive);
  };

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('Inhala');
    setPhaseSecondsLeft(4);
    setCyclesCompleted(0);
  };

  // Ambient sound synthesizer
  const toggleAmbientSound = (type: 'rain' | 'waves' | 'calm') => {
    if (isPlayingAmbient && activeSound === type) {
      // Stop
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingAmbient(false);
      setActiveSound(null);
      return;
    }

    try {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Create pink/brown noise for rain or waves
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(type === 'rain' ? 800 : 400, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      setIsPlayingAmbient(true);
      setActiveSound(type);
    } catch {
      setIsPlayingAmbient(false);
      setActiveSound(null);
    }
  };

  const guides = language === 'es' ? [
    {
      title: 'Guía Rápida: Primeros Auxilios en Crisis de Pánico',
      desc: 'Pasos fisiológicos y psicológicos para desactivar la hiperventilación y volver a la calma.',
      category: 'Ansiedad',
      pages: '4 págs · PDF',
      color: 'text-teal-700 bg-teal-50'
    },
    {
      title: 'Manual de Higiene del Sueño & Descanso Profundo',
      desc: 'Protocolo de desactivación nocturna, control de estímulos y hábitos para dormir mejor.',
      category: 'Sueño',
      pages: '6 págs · PDF',
      color: 'text-indigo-700 bg-indigo-50'
    },
    {
      title: 'Cómo Acompañar a un Familiar con Depresión',
      desc: 'Qué decir, qué evitar y cómo cuidar tu propia salud mental mientras cuidas a quien amas.',
      category: 'Familia',
      pages: '8 págs · PDF',
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      title: 'Cuaderno de Autocompasión y Gestión del Estrés',
      desc: 'Ejercicios de reencuadre cognitivo y reducción del diálogo interno autocrítico.',
      category: 'Bienestar',
      pages: '12 págs · PDF',
      color: 'text-cyan-700 bg-cyan-50'
    }
  ] : [
    {
      title: 'Quick Guide: First Aid for Panic Attacks',
      desc: 'Physiological and psychological steps to reduce hyperventilation and regain calm.',
      category: 'Anxiety',
      pages: '4 pages · PDF',
      color: 'text-teal-700 bg-teal-50'
    },
    {
      title: 'Sleep Hygiene & Deep Rest Manual',
      desc: 'Nighttime deactivation protocol, stimulus control, and evidence-based sleep routines.',
      category: 'Sleep',
      pages: '6 pages · PDF',
      color: 'text-indigo-700 bg-indigo-50'
    },
    {
      title: 'How to Support a Loved One with Depression',
      desc: 'What to say, what to avoid, and how to safeguard your own mental health while caring.',
      category: 'Family',
      pages: '8 pages · PDF',
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      title: 'Self-Compassion & Stress Management Workbook',
      desc: 'Cognitive reframing exercises to soothe self-critical internal dialogue.',
      category: 'Wellness',
      pages: '12 pages · PDF',
      color: 'text-cyan-700 bg-cyan-50'
    }
  ];

  return (
    <section id="recursos" className="py-20 relative overflow-hidden scroll-mt-24" aria-label="Recursos diarios de apoyo y bienestar mental">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md text-teal-800 text-xs font-semibold uppercase tracking-wider border border-white/80 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            {t('resources.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-architects text-slate-900 tracking-normal">
            {t('resources.title')}
          </h2>
          <p className="mt-3 text-base text-slate-600 font-light">
            {t('resources.subtitle')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('daily')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md ${
              activeTab === 'daily'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm border border-white/30'
                : 'bg-white/60 text-slate-700 hover:bg-white/90 border border-white/80 shadow-xs'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('resources.pillOfDay')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('breathing')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md ${
              activeTab === 'breathing'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm border border-white/30'
                : 'bg-white/60 text-slate-700 hover:bg-white/90 border border-white/80 shadow-xs'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>{t('resources.breathingTab')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guides')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md ${
              activeTab === 'guides'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm border border-white/30'
                : 'bg-white/60 text-slate-700 hover:bg-white/90 border border-white/80 shadow-xs'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('resources.guidesTab')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audio')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md ${
              activeTab === 'audio'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm border border-white/30'
                : 'bg-white/60 text-slate-700 hover:bg-white/90 border border-white/80 shadow-xs'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>{t('resources.ambientTab')}</span>
          </button>
        </div>

        {/* TAB 1: PÍLDORA DEL DÍA */}
        {activeTab === 'daily' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Daily Affirmation Main Card */}
            <div className="lg:col-span-7 bg-white/50 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-white/70 shadow-lg shadow-teal-900/5">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 backdrop-blur-md text-teal-900 border border-white/80 shadow-xs">
                  {currentResource.category} · Hoy
                </span>
                <div className="flex items-center gap-2">
                  {DAILY_WELLNESS_RESOURCES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDayIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        selectedDayIndex === idx
                          ? 'bg-teal-600 w-6'
                          : 'bg-slate-300 hover:bg-teal-400'
                      }`}
                      aria-label={`Ver recurso ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-snug">
                {currentResource.title}
              </h3>

              {/* Affirmation Blockquote */}
              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs mb-6">
                <p className="text-base sm:text-lg font-serif italic text-teal-950 leading-relaxed">
                  {currentResource.affirmation}
                </p>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {currentResource.reflection}
              </p>

              {/* Actionable Micro Exercise */}
              <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Ejercicio práctico ({currentResource.actionableExercise.durationMinutes} min):</span>
                </h4>
                <ul className="space-y-2">
                  {currentResource.actionableExercise.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Side Motivation & Quick Tools */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl p-8 text-white border border-white/20 shadow-xl">
                <span className="text-teal-300 text-xs font-semibold uppercase tracking-wider block mb-2">
                  {language === 'es' ? 'Acompañamiento Profesional' : 'Professional Guidance'}
                </span>
                <h4 className="text-xl font-bold mb-3">
                  {language === 'es' ? '¿Sientes que necesitas hablar con alguien hoy?' : 'Do you feel you need to talk to someone today?'}
                </h4>
                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed mb-6 font-light">
                  {language === 'es'
                    ? 'Nuestros psicólogos solidarios están disponibles para brindarte orientación personalizada sin listas de espera.'
                    : 'Our dedicated psychologists are available to provide empathetic, individualized guidance without long waiting lists.'}
                </p>
                <button
                  type="button"
                  onClick={onOpenCrisis}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer border border-white/30"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'es' ? 'Ver Recursos de Ayuda Inmediata' : 'View Immediate Help Resources'}</span>
                </button>
              </div>

              <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 border border-white/70 shadow-xs">
                <h4 className="text-sm font-bold text-slate-800 mb-3">
                  {language === 'es' ? 'Pausas recomendadas para hoy:' : 'Recommended mindful pauses for today:'}
                </h4>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70">
                    <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                    <span><strong>09:00 AM:</strong> {language === 'es' ? '3 respiraciones profundas antes de iniciar tareas.' : '3 deep breaths before starting tasks.'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70">
                    <Wind className="w-4 h-4 text-teal-600 shrink-0" />
                    <span><strong>02:30 PM:</strong> {language === 'es' ? 'Desconectar 5 minutos de pantallas y estirar hombros.' : 'Disconnect 5 minutes from screens and gently stretch.'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70">
                    <Moon className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span><strong>10:30 PM:</strong> {language === 'es' ? 'Agradecer 3 momentos sencillos de tu jornada.' : 'Acknowledge 3 simple moments of gratitude from today.'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: INTERACTIVE BREATHING PACER */}
        {activeTab === 'breathing' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/70 shadow-xl text-center max-w-3xl mx-auto"
          >
            {/* Technique Switcher */}
            <div className="inline-flex rounded-2xl bg-white/60 backdrop-blur-md p-1 border border-white/80 shadow-xs mb-8">
              <button
                type="button"
                onClick={() => {
                  setBreathingTechnique('478');
                  resetBreathing();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  breathingTechnique === '478'
                    ? 'bg-white text-teal-900 shadow-xs border border-white/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'es' ? 'Técnica 4-7-8 (Calma del Nervio Vago)' : '4-7-8 Technique (Vagus Nerve Calming)'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setBreathingTechnique('box');
                  resetBreathing();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  breathingTechnique === 'box'
                    ? 'bg-white text-teal-900 shadow-xs border border-white/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'es' ? 'Respiración Cuadrada (4-4-4-4)' : 'Box Breathing (4-4-4-4)'}
              </button>
            </div>

            {/* Pacer Visual Circle Animation */}
            <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <motion.div
                animate={{
                  scale: isBreathingActive
                    ? breathPhase === 'Inhala'
                      ? 1.35
                      : breathPhase === 'Sostén'
                      ? 1.35
                      : 0.95
                    : 1,
                  opacity: isBreathingActive ? 0.35 : 0.15
                }}
                transition={{
                  duration: isBreathingActive
                    ? breathPhase === 'Inhala'
                      ? 4
                      : breathPhase === 'Sostén'
                      ? 7
                      : 8
                    : 0.5,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 rounded-full bg-teal-400"
              />

              {/* Main Breathing Core */}
              <motion.div
                animate={{
                  scale: isBreathingActive
                    ? breathPhase === 'Inhala'
                      ? 1.15
                      : breathPhase === 'Sostén'
                      ? 1.15
                      : 0.9
                    : 1
                }}
                transition={{
                  duration: isBreathingActive
                    ? breathPhase === 'Inhala'
                      ? 4
                      : breathPhase === 'Sostén'
                      ? 7
                      : 8
                    : 0.5,
                  ease: 'easeInOut'
                }}
                className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-500 text-white flex flex-col items-center justify-center shadow-xl shadow-teal-700/20 border border-white/30 backdrop-blur-md"
              >
                <span className="text-xs uppercase tracking-widest text-teal-200 font-semibold mb-1">
                  {isBreathingActive
                    ? (language === 'es'
                        ? breathPhase
                        : breathPhase === 'Inhala'
                        ? 'Inhale'
                        : breathPhase === 'Sostén'
                        ? 'Hold'
                        : breathPhase === 'Exhala'
                        ? 'Exhale'
                        : 'Pause')
                    : (language === 'es' ? 'Listo' : 'Ready')}
                </span>
                <span className="text-5xl font-black font-sans tracking-tight">
                  {isBreathingActive ? phaseSecondsLeft : '4-7-8'}
                </span>
                <span className="text-[11px] text-teal-100 mt-1">
                  {isBreathingActive
                    ? breathPhase === 'Inhala'
                      ? (language === 'es' ? 'Por la nariz' : 'Through the nose')
                      : breathPhase === 'Sostén'
                      ? (language === 'es' ? 'Pulmones llenos' : 'Full lungs')
                      : (language === 'es' ? 'Por la boca' : 'Through the mouth')
                    : (language === 'es' ? 'Presiona Iniciar' : 'Press Start')}
                </span>
              </motion.div>
            </div>

            {/* Cycles counter */}
            <div className="text-xs font-semibold text-slate-500 mb-6">
              {language === 'es' ? 'Ciclos completados:' : 'Completed cycles:'} <strong className="text-teal-800 text-sm">{cyclesCompleted}</strong> / 4 {language === 'es' ? 'recomendados' : 'recommended'}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-3 rounded-full border text-xs transition-colors backdrop-blur-sm ${
                  soundEnabled
                    ? 'bg-white/80 border-teal-400 text-teal-800 shadow-xs'
                    : 'bg-white/50 border-white/80 text-slate-400 hover:text-slate-700'
                }`}
                title={soundEnabled ? (language === 'es' ? 'Silenciar campanilla' : 'Mute bell') : (language === 'es' ? 'Activar tono armónico' : 'Enable harmonic tone')}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={toggleBreathing}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-base shadow-md transition-all flex items-center gap-2 cursor-pointer border border-white/20 backdrop-blur-sm"
              >
                {isBreathingActive ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>{language === 'es' ? 'Pausar' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    <span>{language === 'es' ? 'Iniciar Ejercicio' : 'Start Exercise'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetBreathing}
                className="p-3 rounded-full border border-white/80 bg-white/60 hover:bg-white/90 text-slate-600 transition-colors backdrop-blur-sm shadow-xs"
                title={language === 'es' ? 'Reiniciar' : 'Reset'}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: DOWNLOADABLE GUIDES */}
        {activeTab === 'guides' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {guides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white/50 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-white/70 shadow-sm hover:shadow-lg hover:bg-white/65 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${guide.color} border border-white/60 backdrop-blur-sm`}>
                      {guide.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {guide.pages}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {guide.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`${language === 'es' ? 'Iniciando descarga de:' : 'Starting download for:'} "${guide.title}". Fundación CINHARI.`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/60 hover:bg-white/90 text-teal-800 font-semibold text-xs flex items-center justify-center gap-2 border border-white/80 backdrop-blur-sm shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{language === 'es' ? 'Descargar Guía Gratuita' : 'Download Free Guide'}</span>
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 4: CALMING AMBIENT SOUNDS */}
        {activeTab === 'audio' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-white/70 shadow-xl max-w-3xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-md text-teal-800 border border-white/80 shadow-xs flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {language === 'es' ? 'Paisajes Sonoros para la Descompresión Mental' : 'Soundscapes for Mental Decompression'}
            </h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto mb-8 font-light">
              {language === 'es'
                ? 'Frecuencias continuas y ruido blanco natural sintetizados directamente para enmascarar ruidos molestos, facilitar la concentración o inducir el descanso.'
                : 'Continuous frequencies and soothing soundwaves synthesized directly to mask distractions, facilitate focus, or induce deep rest.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <button
                type="button"
                onClick={() => toggleAmbientSound('rain')}
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer backdrop-blur-md ${
                  isPlayingAmbient && activeSound === 'rain'
                    ? 'bg-teal-700 text-white border-white/40 shadow-md ring-2 ring-teal-400'
                    : 'bg-white/60 border-white/80 text-slate-800 hover:bg-white/90 shadow-xs'
                }`}
              >
                <div className="font-bold text-base mb-1">{language === 'es' ? '🌧️ Lluvia Suave' : '🌧️ Gentle Rain'}</div>
                <div className="text-xs opacity-80">
                  {isPlayingAmbient && activeSound === 'rain' ? (language === 'es' ? 'Reproduciendo...' : 'Playing...') : (language === 'es' ? 'Ruido rosa relajante' : 'Relaxing pink noise')}
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleAmbientSound('waves')}
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer backdrop-blur-md ${
                  isPlayingAmbient && activeSound === 'waves'
                    ? 'bg-teal-700 text-white border-white/40 shadow-md ring-2 ring-teal-400'
                    : 'bg-white/60 border-white/80 text-slate-800 hover:bg-white/90 shadow-xs'
                }`}
              >
                <div className="font-bold text-base mb-1">{language === 'es' ? '🌊 Olas de Mar' : '🌊 Ocean Waves'}</div>
                <div className="text-xs opacity-80">
                  {isPlayingAmbient && activeSound === 'waves' ? (language === 'es' ? 'Reproduciendo...' : 'Playing...') : (language === 'es' ? 'Frecuencia oceánica' : 'Ocean frequency')}
                </div>
              </button>

              <button
                type="button"
                onClick={() => toggleAmbientSound('calm')}
                className={`p-5 rounded-2xl border text-center transition-all cursor-pointer backdrop-blur-md ${
                  isPlayingAmbient && activeSound === 'calm'
                    ? 'bg-teal-700 text-white border-white/40 shadow-md ring-2 ring-teal-400'
                    : 'bg-white/60 border-white/80 text-slate-800 hover:bg-white/90 shadow-xs'
                }`}
              >
                <div className="font-bold text-base mb-1">{language === 'es' ? '🍃 Brisa Serena' : '🍃 Calm Breeze'}</div>
                <div className="text-xs opacity-80">
                  {isPlayingAmbient && activeSound === 'calm' ? (language === 'es' ? 'Reproduciendo...' : 'Playing...') : (language === 'es' ? 'Atmósfera en calma' : 'Peaceful ambience')}
                </div>
              </button>
            </div>

            {isPlayingAmbient && (
              <div className="text-xs text-emerald-800 font-medium flex items-center justify-center gap-2 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200/80 backdrop-blur-sm max-w-md mx-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{language === 'es' ? 'Audio ambiente activo generado en tiempo real. Puedes cambiar de pestaña libremente.' : 'Real-time ambient sound playing. You can browse other tabs freely.'}</span>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
};
