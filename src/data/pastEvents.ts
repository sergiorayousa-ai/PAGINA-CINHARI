export interface PastEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  badge: string;
  excerpt: string;
  description: string;
  impactMetrics: string;
  imageUrl: string;
  attendees: string;
  tags: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export const PAST_EVENTS: PastEvent[] = [
  {
    id: 'arte-terapia-soacha',
    title: 'Jornada de Arte-Terapia & Expresión Emocional Infantil',
    date: '18 de Mayo, 2026',
    location: 'Sede Soacha & Comunas Aledañas',
    badge: 'Niñez & Expresión',
    excerpt: 'Un espacio seguro de pintura, modelado en arcilla y cuentacuentos terapéuticos para niños y sus madres cuidadoras.',
    description: 'En nuestra sede de Soacha reunimos a más de 85 niños y niñas junto a sus familias en una enriquecedora jornada de arte-terapia. A través del juego guiado, pintura dactilar y metáforas terapéuticas, los profesionales de CINHARI facilitaron la expresión de temores, duelos infantiles y ansiedad escolar. Al finalizar, cada familia se llevó una «Caja de la Calma» con pautas de regulación emocional para el hogar.',
    impactMetrics: '85 niños atendidos · 70 cajas de herramientas entregadas',
    attendees: '85 familias, 6 terapeutas y 4 voluntarios psicosociales',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Arte-Terapia', 'Soacha', 'Psicología Infantil', 'Emociones'],
    quote: {
      text: 'Ver a mi hijo sonreír y pintar lo que antes no podía decir con palabras fue el mayor alivio para nuestro corazón.',
      author: 'Gladys M., madre participante'
    }
  },
  {
    id: 'seminario-neurodesarrollo-fusa',
    title: 'Seminario de Neurodesarrollo y Aula Inclusiva en Fusagasugá',
    date: '24 de Abril, 2026',
    location: 'Sede Fusagasugá · Barrio Piedra Grande',
    badge: 'Docencia & Inclusión',
    excerpt: 'Capacitación intensiva a educadores y directivos sobre detección temprana de dificultades del aprendizaje y TDAH.',
    description: 'Nuestra Directora y el equipo clínico recibieron a más de 60 orientadores escolares y docentes de instituciones educativas de Fusagasugá y la provincia del Sumapaz. Se abordaron metodologías neuropsicológicas actualizadas para la intervención temprana del TDAH, dificultades del procesamiento sensorial y estrategias de desestigmatización de la salud mental dentro de las aulas públicas.',
    impactMetrics: '62 educadores certificados · 12 colegios articulados',
    attendees: '62 docentes y directivos escolares',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    tags: ['Fusagasugá', 'Neurodesarrollo', 'Educación Inclusiva', 'Docentes'],
    quote: {
      text: 'Aprendimos a mirar la conducta de nuestros alumnos no como rebeldía, sino como un llamado de auxilio emocional.',
      author: 'Prof. Carlos R., Orientador Escolar'
    }
  },
  {
    id: 'circulo-mujeres-cuidadoras',
    title: 'Círculo de Resiliencia y Autocuidado para Madres Cuidadoras',
    date: '12 de Marzo, 2026',
    location: 'Sede Fusagasugá & Entornos Familiares',
    badge: 'Salud de la Mujer',
    excerpt: 'Encuentro vivencial para aliviar el desgaste emocional (burnout maternal) y tejer redes de contención solidaria.',
    description: 'Reconociendo el inmenso desgaste que experimentan las madres y cuidadoras principales de personas en condición de discapacidad o enfermedad crónica, Fundación CINHARI abrió un ciclo de círculos de escucha compasiva. Con técnicas de respiración diafragmática, reencuadre cognitivo y masajes terapéuticos de descarga tensional, las participantes construyeron su propia red de relevo y apoyo mutuo.',
    impactMetrics: '40 madres acompañadas · 100% reducción de aislamiento',
    attendees: '40 madres y cuidadoras principales',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mujer & Familia', 'Autocuidado', 'Resiliencia', 'Comunidad'],
    quote: {
      text: 'Por primera vez en años me sentí escuchada sin ser juzgada; entendí que para cuidar a mi hija primero debo sanar yo.',
      author: 'Patricia V., madre de familia'
    }
  },
  {
    id: 'brigada-salud-comunitaria',
    title: 'Brigada Psicosocial Solidaria en Comunas de Cundinamarca',
    date: '8 de Febrero, 2026',
    location: 'Comunas de Soacha & Zonas Rurales de Fusagasugá',
    badge: 'Atención Terrestre',
    excerpt: 'Despliegue clínico voluntario para realizar tamizajes de salud emocional y contención de urgencia sin costo.',
    description: 'Durante dos días continuos, nuestro voluntariado profesional de psicólogos y trabajadores sociales instaló puntos comunitarios de primeros auxilios psicológicos. Se aplicaron pruebas de tamizaje para depresión y ansiedad a más de 120 jóvenes y adultos mayores, identificando situaciones de alto riesgo y canalizándolas a tratamiento psicológico formal en nuestras sedes.',
    impactMetrics: '120+ tamizajes · 18 casos prioritarios vinculados',
    attendees: '120+ personas de comunidades vulnerables',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80',
    tags: ['Brigada Solidaria', 'Primeros Auxilios', 'Comunidad', 'Gratuidad'],
    quote: {
      text: 'Tener una psicóloga que te mire a los ojos y te escuche en tu propio barrio fue una verdadera bendición.',
      author: 'Don Hernando, 68 años'
    }
  }
];
