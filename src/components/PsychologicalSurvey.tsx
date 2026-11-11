import React, { useState } from 'react';
import { SURVEY_QUESTIONS } from '../data/initialData';
import { SurveyResult } from '../types';
import { openWhatsApp } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import {
  Activity,
  HeartPulse,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Wind,
  Shield,
  HelpCircle,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PsychologicalSurveyProps {
  onStartBreathingExercise: () => void;
  onBookAppointment: () => void;
  onOpenCrisis: () => void;
}

export const PsychologicalSurvey: React.FC<PsychologicalSurveyProps> = ({
  onStartBreathingExercise,
  onBookAppointment,
  onOpenCrisis
}) => {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Intro, 1..6 = Questions, 7 = Results
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<SurveyResult | null>(null);

  const totalQuestions = SURVEY_QUESTIONS.length;

  const handleSelectOption = (questionId: number, score: number) => {
    const nextAnswers = { ...answers, [questionId]: score };
    setAnswers(nextAnswers);

    if (currentStep < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(nextAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, number>) => {
    let totalScore = 0;
    const maxScore = totalQuestions * 3;

    Object.values(finalAnswers).forEach((score) => {
      totalScore += score;
    });

    const percentage = Math.round((totalScore / maxScore) * 100);

    let level: SurveyResult['level'] = 'Óptimo';
    let summary = '';
    if (percentage <= 25) {
      level = 'Óptimo';
      summary = language === 'es'
        ? 'Tu estado emocional actual muestra un buen nivel de equilibrio y recursos saludables de afrontamiento. Mantener tus hábitos de descanso, pausas y contacto social te ayudará a sostener este bienestar.'
        : 'Your current emotional state shows a healthy balance and positive coping strategies. Maintaining your rest habits, conscious pauses, and social connections will help sustain this well-being.';
    } else if (percentage <= 50) {
      level = 'Leve';
      summary = language === 'es'
        ? 'Presentas signos leves de tensión, cansancio o fluctuaciones anímicas. Es un momento propicio para incorporar pequeñas pausas conscientes, regular tu sueño y no exigirte más de la cuenta.'
        : 'You show mild signs of tension, fatigue, or mood shifts. This is a good time to introduce mindful pauses, regulate sleep, and set gentle expectations on yourself.';
    } else if (percentage <= 75) {
      level = 'Moderado';
      summary = language === 'es'
        ? 'Tus respuestas reflejan una sobrecarga emocional o sintomatología ansioso-depresiva moderada que probablemente esté interfiriendo con tu tranquilidad. Te recomendamos hablar con un profesional y no postergar tu autocuidado.'
        : 'Your answers indicate emotional overload or moderate anxiety/depressive symptoms interfering with daily peace. We recommend scheduling an orientation session with a professional.';
    } else {
      level = 'Significativo';
      summary = language === 'es'
        ? 'Estás experimentando un nivel de malestar psicológico considerable. Es fundamental que busques apoyo profesional y te apoyes en personas de confianza. En Fundación CINHARI estamos aquí para acompañarte.'
        : 'You are experiencing significant psychological distress. Reaching out for professional care and confiding in trusted individuals is essential. CINHARI Foundation is here to support you.';
    }

    // Category breakdown
    const categoryMap: Record<string, { score: number; max: number; count: number }> = {};
    SURVEY_QUESTIONS.forEach((q) => {
      if (!categoryMap[q.category]) {
        categoryMap[q.category] = { score: 0, max: 0, count: 0 };
      }
      categoryMap[q.category].score += finalAnswers[q.id] || 0;
      categoryMap[q.category].max += 3;
      categoryMap[q.category].count += 1;
    });

    const categoryBreakdown = Object.entries(categoryMap).map(([cat, data]) => {
      const catPct = (data.score / data.max) * 100;
      let feedback = language === 'es' ? 'Equilibrado' : 'Balanced';
      let color = 'bg-emerald-500';
      if (catPct > 60) {
        feedback = language === 'es' ? 'Atención recomendada' : 'Attention advised';
        color = 'bg-amber-500';
      } else if (catPct > 35) {
        feedback = language === 'es' ? 'Tensión moderada' : 'Moderate strain';
        color = 'bg-teal-500';
      }

      return {
        category: cat,
        score: data.score,
        maxScore: data.max,
        feedback,
        color
      };
    });

    const recommendations = language === 'es'
      ? [
          'Prioriza pausas de respiración y descanso activo a lo largo de tu día laboral o académico.',
          'Establece límites claros en tus compromisos para evitar la sobrecarga y el agotamiento.',
          'Comparte lo que sientes con alguien de confianza: poner en palabras el dolor alivia la carga mental.',
          'Considera una sesión de orientación psicológica preventiva para adquirir herramientas a medida.'
        ]
      : [
          'Prioritize breathing pauses and active rest throughout your workday or studies.',
          'Set healthy boundaries to prevent emotional burnout and fatigue.',
          'Share how you feel with a trusted person: voicing thoughts relieves mental weight.',
          'Consider a professional orientation session to build tailored resilience tools.'
        ];

    const actionPlan = [
      {
        title: language === 'es' ? 'Ejercicio de Respiración Consciente' : 'Mindful Breathing Exercise',
        desc: language === 'es'
          ? '3 a 5 minutos de respiración diafragmática para regular tu ritmo cardíaco y calmar el sistema simpático.'
          : '3 to 5 minutes of diaphragmatic breathing to regulate heart rate and calm your nervous system.',
        icon: 'wind'
      },
      {
        title: language === 'es' ? 'Orientación Psicológica Solidaria' : 'Accessible Psychological Guidance',
        desc: language === 'es'
          ? 'Espacio confidencial con un terapeuta de Fundación CINHARI para abordar tus inquietudes.'
          : 'Confidential space with a CINHARI Foundation therapist to address your needs.',
        icon: 'calendar'
      }
    ];

    setResult({
      totalScore,
      maxScore,
      percentage,
      level,
      summary,
      categoryBreakdown,
      recommendations,
      actionPlan,
      completedAt: new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    });

    setCurrentStep(totalQuestions + 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setResult(null);
    setCurrentStep(0);
  };

  const currentQuestion = SURVEY_QUESTIONS[currentStep - 1];

  return (
    <section id="encuesta" className="py-20 bg-white scroll-mt-24" aria-label="Test de bienestar psicológico">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            {t('survey.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-architects text-slate-900 tracking-normal">
            {t('survey.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-light">
            {t('survey.subtitle')}
          </p>
        </div>

        {/* Survey Interactive Box */}
        <div className="bg-[#f8fcfb] rounded-3xl p-6 sm:p-10 border border-teal-100/90 shadow-md">
          
          {/* STEP 0: Introduction */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-100/80 text-teal-800 flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-teal-700" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {language === 'es' ? 'Tu salud mental merece una pausa consciente' : 'Your mental health deserves a mindful pause'}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
                {language === 'es'
                  ? 'Este cuestionario no sustituye un diagnóstico clínico formal, pero ha sido diseñado por nuestro equipo de psicólogos para ayudarte a reconocer tus niveles actuales de estrés, estado anímico y recursos de autocuidado.'
                  : 'This screening does not replace a clinical diagnosis, but was designed by our psychologists to help identify current stress, emotional tone, and coping habits.'}
              </p>

              <div className="bg-teal-50/80 rounded-2xl p-4 max-w-lg mx-auto text-xs text-teal-900 flex items-start gap-3 text-left mb-8 border border-teal-200/60">
                <Shield className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  <strong>{t('survey.anonymous')}:</strong> {language === 'es' ? 'Tus respuestas no se almacenan ni se asocian a ningún dato personal.' : 'Your answers are not stored or linked to any personal data.'}
                </span>
              </div>

              <button
                type="button"
                id="start-survey-btn"
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-base transition-all flex items-center gap-2 mx-auto shadow-md cursor-pointer"
              >
                <span>{t('survey.startBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* QUESTIONS (1 to 6) */}
          {currentStep >= 1 && currentStep <= totalQuestions && currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                  <span className="text-teal-800 uppercase tracking-wide">
                    {language === 'es' ? `Pregunta ${currentStep} de ${totalQuestions}` : `Question ${currentStep} of ${totalQuestions}`} · {currentQuestion.category}
                  </span>
                  <span>{Math.round((currentStep / totalQuestions) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                  {currentQuestion.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {currentQuestion.helper}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, option.score)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white hover:bg-teal-50/70 border border-slate-200 hover:border-teal-400 text-slate-800 transition-all flex items-center justify-between group shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-teal-900">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-xs text-slate-500 group-hover:text-teal-700 mt-0.5">
                          {option.description}
                        </div>
                      )}
                    </div>
                    <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-teal-600 group-hover:bg-teal-600 flex items-center justify-center shrink-0 ml-4 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Back Button */}
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t('survey.prev')}</span>
                </button>
              )}
            </motion.div>
          )}

          {/* RESULTS SCREEN */}
          {currentStep > totalQuestions && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Level Badge Banner */}
              <div className="text-center pb-6 border-b border-teal-100">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
                  result.level === 'Óptimo'
                    ? 'bg-emerald-100 text-emerald-800'
                    : result.level === 'Leve'
                    ? 'bg-teal-100 text-teal-800'
                    : result.level === 'Moderado'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-rose-100 text-rose-900'
                }`}>
                  {t('survey.levelLabel')} {result.level}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                  {t('survey.resultTitle')}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Dimension Breakdown */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  {language === 'es' ? 'Desglose por áreas evaluadas:' : 'Breakdown by assessed areas:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.categoryBreakdown.map((cat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2">
                        <span>{cat.category}</span>
                        <span className="text-slate-500">{cat.feedback}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${cat.color} rounded-full`}
                          style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Next Actions */}
              <div className="bg-[#e8f7f5] p-6 rounded-2xl border border-teal-200">
                <h4 className="text-sm font-bold text-teal-950 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <span>{t('survey.recomms')}</span>
                </h4>
                <ul className="space-y-2 mb-6">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-teal-900">
                      <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-teal-200/80">
                  <button
                    type="button"
                    onClick={onStartBreathingExercise}
                    className="py-3 px-4 rounded-xl bg-white hover:bg-teal-50 text-teal-900 border border-teal-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Wind className="w-4 h-4 text-teal-700" />
                    <span>{language === 'es' ? 'Hacer ejercicio de calma ahora' : 'Practice calming exercise now'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openWhatsApp()}
                    className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>{t('survey.scheduleWithUs')}</span>
                  </button>
                </div>
              </div>

              {/* Crisis Hotline reminder if high level */}
              {(result.level === 'Moderado' || result.level === 'Significativo') && (
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{language === 'es' ? 'Si estás atravesando una situación de crisis inmediata, no dudes en llamar.' : 'If you are experiencing an urgent crisis, do not hesitate to reach out.'}</span>
                  </div>
                  <button
                    onClick={onOpenCrisis}
                    className="font-bold underline text-amber-800 hover:text-amber-950 ml-2"
                  >
                    {language === 'es' ? 'Línea de Crisis 24h' : '24/7 Crisis Line'}
                  </button>
                </div>
              )}

              {/* Reset */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('survey.restart')}</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
