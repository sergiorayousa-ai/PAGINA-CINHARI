import React, { useState } from 'react';
import { BlogPost } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen,
  Search,
  Clock,
  User,
  Heart,
  Share2,
  ChevronRight,
  X,
  Sparkles,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogNewsSectionProps {
  posts: BlogPost[];
}

export const BlogNewsSection: React.FC<BlogNewsSectionProps> = ({ posts }) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [clapsMap, setClapsMap] = useState<Record<string, number>>({});

  const categories = language === 'es'
    ? [
        { id: 'all', label: 'Todos' },
        { id: 'Salud Mental', label: 'Salud Mental' },
        { id: 'Prevención y Alerta', label: 'Prevención y Alerta' },
        { id: 'Psicología Infantil', label: 'Psicología Infantil' },
        { id: 'Testimonios', label: 'Testimonios' }
      ]
    : [
        { id: 'all', label: 'All' },
        { id: 'Salud Mental', label: 'Mental Health' },
        { id: 'Prevención y Alerta', label: 'Prevention & Alerts' },
        { id: 'Psicología Infantil', label: 'Child Psychology' },
        { id: 'Testimonios', label: 'Testimonials' }
      ];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleClap = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setClapsMap((prev) => ({
      ...prev,
      [postId]: (prev[postId] || posts.find((p) => p.id === postId)?.claps || 0) + 1
    }));
  };

  return (
    <section id="blog" className="py-20 relative overflow-hidden scroll-mt-24" aria-label="Blog de noticias y salud mental de Fundación Cinhari">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md text-teal-800 text-xs font-semibold uppercase tracking-wider border border-white/80 shadow-xs mb-2.5">
              {t('blog.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-architects text-slate-900 tracking-normal">
              {t('blog.title')}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-light">
              {t('blog.subtitle')}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'es' ? 'Buscar artículos o temas...' : 'Search articles or topics...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs sm:text-sm placeholder-slate-400 shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer backdrop-blur-md ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm border border-white/30'
                  : 'bg-white/60 text-slate-700 hover:bg-white/90 hover:text-teal-800 border border-white/80 shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const currentClaps = clapsMap[post.id] ?? post.claps;
            return (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActivePost(post)}
                className="bg-white/45 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/70 shadow-sm hover:shadow-xl hover:bg-white/65 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                    <img
                      src={post.coverImage}
                      alt={`Fotografía editorial: ${post.title} — Fundación CINHARI`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white/85 text-teal-950 backdrop-blur-md border border-white/80 shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-teal-800 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light mb-4">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] text-teal-800 bg-white/70 backdrop-blur-sm border border-white/80 px-2.5 py-0.5 rounded-full shadow-xs">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Author & Action Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-white/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={`Foto de autor: ${post.author.name} — ${post.author.role}`}
                      className="w-7 h-7 rounded-full object-cover border border-white/80"
                    />
                    <span className="text-xs font-medium text-slate-700">
                      {post.author.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleClap(post.id, e)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-white/60 backdrop-blur-sm"
                    title={language === 'es' ? 'Me gusta / Agradecer artículo' : 'Like / Thank author'}
                  >
                    <Heart className={`w-4 h-4 ${currentClaps > post.claps ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{currentClaps}</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white/50 backdrop-blur-md rounded-3xl border border-dashed border-white/80">
            <p className="text-slate-500 text-sm">
              {language === 'es' ? 'No encontramos artículos que coincidan con tu búsqueda.' : 'No articles found matching your search.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
            >
              {language === 'es' ? 'Restablecer filtros' : 'Reset filters'}
            </button>
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white/85 backdrop-blur-2xl rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/80"
            >
              {/* Cover Banner */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={activePost.coverImage}
                  alt={`Artículo: ${activePost.title} — Fundación CINHARI`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                  aria-label={language === 'es' ? 'Cerrar artículo' : 'Close article'}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-800/90 backdrop-blur-md text-white border border-white/20">
                    {activePost.category}
                  </span>
                </div>
              </div>

              {/* Reader Body */}
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span>{language === 'es' ? `Publicado el ${activePost.date}` : `Published on ${activePost.date}`}</span>
                  <span>·</span>
                  <span>{activePost.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-sans text-slate-900 mb-6 leading-snug">
                  {activePost.title}
                </h2>

                {/* Author Info */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs mb-8">
                  <img
                    src={activePost.author.avatar}
                    alt={`Perfil profesional: ${activePost.author.name} (${activePost.author.role})`}
                    className="w-11 h-11 rounded-full object-cover border border-white/80"
                  />
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">
                      {activePost.author.name}
                    </div>
                    <div className="text-xs text-teal-800">
                      {activePost.author.role}
                    </div>
                  </div>
                </div>

                {/* Main Content Paragraphs */}
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-light">
                  {activePost.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-white/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {activePost.tags.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs bg-white/70 text-teal-850 font-medium border border-white/80 backdrop-blur-sm shadow-xs">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClap(activePost.id)}
                    className="px-4 py-2 rounded-xl bg-rose-50/80 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-2 border border-rose-200/60 backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                    <span>{language === 'es' ? 'Agradecer' : 'Applaud'} ({clapsMap[activePost.id] ?? activePost.claps})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
