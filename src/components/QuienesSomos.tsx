import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Award, ExternalLink } from 'lucide-react';

interface DirectorMember {
  id: string;
  name: string;
  roleKey: string;
  bioKey: string;
  image: string;
  linkedinUrl: string;
}

const DIRECTORS: DirectorMember[] = [
  {
    id: 'maria-jose-leon',
    name: 'María José León',
    roleKey: 'about.member1.role',
    bioKey: 'about.member1.bio',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 'trinidad-andreani',
    name: 'Trinidad Andreani',
    roleKey: 'about.member2.role',
    bioKey: 'about.member2.bio',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 'javier-moran',
    name: 'Javier Morán',
    roleKey: 'about.member3.role',
    bioKey: 'about.member3.bio',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    linkedinUrl: 'https://www.linkedin.com',
  }
];

export const QuienesSomos: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="quienes-somos"
      className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-b border-slate-200/80 text-slate-800 transition-colors scroll-mt-24"
      aria-label="Quiénes Somos - Directorio Fundación CINHARI"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching page typography and colors */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('about.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#063852] tracking-tight mb-4">
            {t('about.title')}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* 3 Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {DIRECTORS.map((director) => (
            <div
              key={director.id}
              className="flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/70 shadow-xs hover:shadow-md hover:border-teal-300/80 transition-all duration-300 group"
            >
              {/* Portrait Photo */}
              <div className="w-48 h-56 sm:w-52 sm:h-60 mb-6 overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60 shadow-xs transition-transform duration-300 group-hover:scale-[1.02]">
                <img
                  src={director.image}
                  alt={`${director.name} — ${t(director.roleKey)} en Fundación CINHARI`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-105 brightness-100 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-[#063852] tracking-tight mb-1">
                {director.name}
              </h3>

              {/* Role */}
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-600 mb-3 flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>{t(director.roleKey)}</span>
              </p>

              {/* Bio / Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mb-6 px-1 grow">
                {t(director.bioKey)}
              </p>

              {/* LinkedIn Button Icon */}
              <a
                href={director.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Perfil de LinkedIn de ${director.name}`}
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current text-[#0077b5]"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>{language === 'es' ? 'Ver perfil' : 'View profile'}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

