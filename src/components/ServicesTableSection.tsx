import React from 'react';
import { 
  Table, 
  Check, 
  Users, 
  User, 
  Smile, 
  Laptop, 
  Clock, 
  MapPin, 
  PhoneCall, 
  Sparkles,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { openWhatsApp } from '../utils/whatsapp';

export const ServicesTableSection: React.FC = () => {
  const { language } = useLanguage();

  const servicesTableData = language === 'es' ? [
    {
      modality: 'Psicoterapia Individual Adultos',
      target: 'Jóvenes y Adultos (18+)',
      focus: 'Ansiedad, depresión, estrés laboral, duelos, autoestima y proyecto de vida',
      locations: 'Fusagasugá, Soacha y Telepsicología',
      duration: '50 - 60 minutos',
      availability: 'Lunes a Sábado',
    },
    {
      modality: 'Psicología Infantil y Juvenil',
      target: 'Niños (4 a 12) y Adolescentes (13 a 17)',
      focus: 'Regulación emocional, dificultades de aprendizaje, déficit de atención, acoso escolar',
      locations: 'Sedes presenciales Fusagasugá y Soacha',
      duration: '45 - 50 minutos',
      availability: 'Lunes a Sábado',
    },
    {
      modality: 'Terapia de Pareja y Familiar',
      target: 'Parejas y Núcleos Familiares',
      focus: 'Comunicación asertiva, resolución de conflictos, pautas de crianza, infidelidad y mediación',
      locations: 'Fusagasugá, Soacha y Virtual',
      duration: '60 - 75 minutos',
      availability: 'Previa reserva',
    },
    {
      modality: 'Telepsicología Online (Virtual)',
      target: 'Nacional (toda Colombia) e Internacional',
      focus: 'Acompañamiento psicológico integral por videollamada segura y encriptada',
      locations: '100% Remoto (Plataforma segura)',
      duration: '50 minutos',
      availability: 'Horarios flexibles',
    },
    {
      modality: 'Evaluación y Perfilaje Psicológico',
      target: 'Infantil, Jóvenes y Adultos',
      focus: 'Diagnóstico clínico, tamizaje emocional, informes para colegios e instituciones',
      locations: 'Fusagasugá y Soacha',
      duration: '2 a 3 sesiones estructuradas',
      availability: 'Bajo programación',
    }
  ] : [
    {
      modality: 'Individual Adult Psychotherapy',
      target: 'Young Adults & Adults (18+)',
      focus: 'Anxiety, depression, burnout, grief, self-esteem, and personal growth',
      locations: 'Fusagasugá, Soacha & Teletherapy',
      duration: '50 - 60 minutes',
      availability: 'Monday to Saturday',
    },
    {
      modality: 'Child & Adolescent Psychology',
      target: 'Children (4-12) & Teens (13-17)',
      focus: 'Emotional regulation, learning challenges, ADHD support, school bullying',
      locations: 'In-person branches Fusagasugá & Soacha',
      duration: '45 - 50 minutes',
      availability: 'Monday to Saturday',
    },
    {
      modality: 'Couples & Family Therapy',
      target: 'Couples & Family Units',
      focus: 'Assertive communication, conflict mediation, parenting guidelines, attachment repair',
      locations: 'Fusagasugá, Soacha & Online',
      duration: '60 - 75 minutes',
      availability: 'By appointment',
    },
    {
      modality: 'Online Telepsychology',
      target: 'Nationwide (Colombia) & International',
      focus: 'Comprehensive psychological counseling via confidential encrypted video call',
      locations: '100% Remote (Secure platform)',
      duration: '50 minutes',
      availability: 'Flexible scheduling',
    },
    {
      modality: 'Psychological Assessment & Profiling',
      target: 'Children, Teens & Adults',
      focus: 'Clinical diagnostics, emotional screening, reports for schools and institutions',
      locations: 'Fusagasugá & Soacha clinics',
      duration: '2 to 3 structured sessions',
      availability: 'Scheduled evaluation',
    }
  ];

  const clinicalSpecialties = language === 'es' ? [
    'Trastornos de Ansiedad Generalizada y Crisis de Pánico',
    'Episodios Depresivos y Gestión del Estado de Ánimo',
    'Terapia Cognitivo-Conductual y Enfoques Humanistas',
    'Manejo del Duelo y Transiciones Vitales Complejas',
    'Orientación a Padres y Pautas de Crianza Respetuosa',
    'Fortalecimiento de la Autoestima y Habilidades Sociales',
    'Prevención y Contención de Ideación Autolesiva',
    'Acompañamiento a Cuidadores y Familias con Pacientes Crónicos'
  ] : [
    'Generalized Anxiety Disorders & Panic Attacks',
    'Depressive Episodes & Mood Management',
    'Cognitive Behavioral Therapy & Humanistic Approaches',
    'Grief Counseling & Major Life Transitions',
    'Parenting Guidance & Positive Discipline Counseling',
    'Self-Esteem Building & Interpersonal Social Skills',
    'Crisis Intervention & Self-Harm Prevention',
    'Caregiver Psychological Support for Chronic Patients'
  ];

  return (
    <section 
      id="servicios" 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        
        {/* Section Heading (H2) */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'es' ? 'Portafolio Clínico' : 'Clinical Portfolio'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#063852] tracking-tight mb-3">
            {language === 'es' ? 'Servicios y Modalidades Terapéuticas' : 'Psychological Services & Therapy Modalities'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {language === 'es'
              ? 'Conoce nuestras opciones de atención personalizada. Adaptamos la intervención a tu edad, necesidades específicas y disponibilidad de tiempo, de forma presencial o virtual.'
              : 'Explore our tailored care options. We adapt our clinical interventions to your age, specific goals, and scheduling needs, both in-person and remotely.'}
          </p>
        </div>

        {/* 11. TABLA COMPARATIVA DE SERVICIOS (Responsive Table) */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-10 bg-white">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/80 text-[#063852] font-bold border-b border-slate-200">
                <th scope="col" className="p-4 sm:p-5 whitespace-nowrap">
                  {language === 'es' ? 'Modalidad Terapéutica' : 'Therapy Modality'}
                </th>
                <th scope="col" className="p-4 sm:p-5 whitespace-nowrap">
                  {language === 'es' ? 'Población Objetivo' : 'Target Population'}
                </th>
                <th scope="col" className="p-4 sm:p-5">
                  {language === 'es' ? 'Enfoque y Motivos de Consulta' : 'Clinical Focus & Goals'}
                </th>
                <th scope="col" className="p-4 sm:p-5 whitespace-nowrap">
                  {language === 'es' ? 'Sedes / Formato' : 'Location / Format'}
                </th>
                <th scope="col" className="p-4 sm:p-5 whitespace-nowrap text-center">
                  {language === 'es' ? 'Agendar' : 'Book'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {servicesTableData.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-teal-50/40 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-semibold text-[#063852] align-top">
                    {row.modality}
                    <span className="block text-[11px] text-slate-400 font-normal mt-0.5">
                      ⏱ {row.duration}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 align-top whitespace-nowrap font-medium text-slate-600">
                    {row.target}
                  </td>
                  <td className="p-4 sm:p-5 align-top text-slate-600 leading-relaxed min-w-[240px]">
                    {row.focus}
                  </td>
                  <td className="p-4 sm:p-5 align-top whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-teal-800 bg-teal-50 border border-teal-200/70 px-2.5 py-1 rounded-full text-xs font-medium">
                      <MapPin className="w-3 h-3 text-teal-600" />
                      {row.locations}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 align-top text-center">
                    <button
                      type="button"
                      onClick={() => openWhatsApp(language === 'es' ? `Hola! Quisiera agendar una consulta de ${row.modality}` : `Hello! I would like to book a consultation for ${row.modality}`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                      aria-label={`${language === 'es' ? 'Agendar' : 'Book'} ${row.modality}`}
                    >
                      <span>{language === 'es' ? 'Cita' : 'Book'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 11. LISTAS ESTRUCTURADAS (Áreas Clínicas & Beneficios del Acompañamiento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200/80">
          {/* List 1: Especialidades */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-[#063852] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span>{language === 'es' ? 'Especialidades Psicológicas Atendidas' : 'Clinical Psychological Specialties'}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {clinicalSpecialties.map((spec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* List 2: Ventajas del Modelo CINHARI */}
          <div className="p-6 rounded-2xl bg-teal-900 text-white border border-teal-800 flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-teal-100 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>{language === 'es' ? 'Garantías de Nuestra Atención' : 'Our Quality Guarantees'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-teal-100/90 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-teal-300 font-bold">✓</span>
                  <span>
                    {language === 'es' 
                      ? 'Psicólogos titulados con tarjeta profesional vigente y registro legal.' 
                      : 'Licensed psychologists with active legal credentials in Colombia.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-300 font-bold">✓</span>
                  <span>
                    {language === 'es' 
                      ? 'Confidencialidad absoluta y resguardo de historia clínica bajo ley 1090.' 
                      : 'Absolute patient confidentiality under Colombian clinical health laws.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-300 font-bold">✓</span>
                  <span>
                    {language === 'es' 
                      ? 'Tarifas sociales accesibles con posibilidad de apoyo institucional.' 
                      : 'Accessible solidarity fees with available community subsidies.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-300 font-bold">✓</span>
                  <span>
                    {language === 'es' 
                      ? 'Agilidad en la asignación de citas sin semanas de espera.' 
                      : 'Prompt appointment scheduling without weeks on waiting lists.'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-teal-800/80 flex items-center justify-between">
              <span className="text-xs text-teal-200">
                {language === 'es' ? '¿Dudas sobre cuál modalidad elegir?' : 'Unsure which modality fits you?'}
              </span>
              <button
                type="button"
                onClick={() => openWhatsApp(language === 'es' ? 'Hola! Quisiera orientación sobre qué tipo de terapia psicológica necesito' : 'Hello! I need guidance on which therapy modality is best for me')}
                className="px-3.5 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                {language === 'es' ? 'Asesoría Gratis' : 'Free Guidance'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
