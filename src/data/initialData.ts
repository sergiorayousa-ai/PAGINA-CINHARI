import { Project, BlogPost, SurveyQuestion, DailyResource } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'mentes-calma',
    title: 'Mentes en Calma: Red de Apoyo Psicológico Comunitario',
    category: 'Comunidad',
    tagline: 'Llevamos atención psicológica gratuita y accesible a barrios y colectivos en situación de vulnerabilidad.',
    description: 'Programa integral que ofrece sesiones individuales de psicoterapia, grupos de apoyo emocional y primeros auxilios psicológicos para personas sin recursos.',
    fullStory: 'Muchas personas con depresión o ansiedad no pueden costear una consulta privada. Nuestro equipo de psicólogos voluntarios y terapeutas acreditados atiende semanalmente en centros cívicos y de forma telemática, brindando un espacio seguro, empático y libre de juicios.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    targetAmount: 18000,
    raisedAmount: 14250,
    beneficiariesTarget: 600,
    beneficiariesCurrent: 485,
    status: 'Activo',
    location: 'Sedes comunitarias y Online',
    milestones: [
      '480+ pacientes atendidos con seguimiento continuado',
      '8 centros cívicos adheridos a la red de atención',
      'Protocolo de derivación urgente con centros sanitarios'
    ],
    updatesCount: 12
  },
  {
    id: 'infancia-futuro',
    title: 'Creciendo con Bienestar: Salud Emocional en la Infancia',
    category: 'Infantil y Juvenil',
    tagline: 'Prevención del acoso, gestión de emociones y apoyo psicopedagógico en escuelas.',
    description: 'Talleres interactivos de inteligencia emocional, detección temprana de malestar psicológico y apoyo a familias en escuelas públicas.',
    fullStory: 'La infancia es el cimiento de la salud mental del adulto. Mediante dinámicas lúdicas, cuentacuentos terapéuticos y orientación familiar, ayudamos a niños y niñas a identificar sus emociones, resolver conflictos y construir una autoestima sólida.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    targetAmount: 12500,
    raisedAmount: 10800,
    beneficiariesTarget: 1200,
    beneficiariesCurrent: 940,
    status: 'Activo',
    location: 'Centros educativos y hogares infantiles',
    milestones: [
      '24 colegios e institutos capacitados',
      'Kits de calma y regulación emocional distribuidos en aulas',
      'Guías para padres y tutores sobre salud digital y apego'
    ],
    updatesCount: 8
  },
  {
    id: 'linea-esperanza',
    title: 'Línea de Acompañamiento y Prevención en Crisis',
    category: 'Prevención',
    tagline: 'Atención telefónica confidencial para momentos de angustia, soledad y crisis emocional.',
    description: 'Servicio de escucha activa y contención psicológica inmediata disponible para cualquier persona que esté atravesando un momento de dolor abrumador.',
    fullStory: 'Saber que al otro lado de la línea hay una voz serena y empática puede salvar una vida. Nuestro equipo de operadores formados en intervención en crisis atiende con calidez, evaluando el riesgo y activando redes de apoyo personal y profesional.',
    image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1000&q=80',
    targetAmount: 15000,
    raisedAmount: 15000,
    beneficiariesTarget: 2500,
    beneficiariesCurrent: 2680,
    status: 'Completado',
    location: 'Línea telefónica gratuita y Chat seguro',
    milestones: [
      'Atención 24/7 sostenida durante todo el año',
      'Tiempo de respuesta promedio inferior a 45 segundos',
      '100% de confidencialidad y respeto ético'
    ],
    updatesCount: 15
  },
  {
    id: 'mujeres-resilientes',
    title: 'Círculo de Resiliencia: Salud Mental para Madres y Cuidadoras',
    category: 'Mujer y Familia',
    tagline: 'Espacio de sanación, descompresión y apoyo mutuo para mujeres en sobrecarga de cuidados.',
    description: 'Grupos terapéuticos enfocados en burnout de cuidadoras, depresión posparto, duelo perinatal y fortalecimiento de redes de afecto.',
    fullStory: 'Cuidar a otros sin cuidarse a uno mismo genera un desgaste invisible pero profundo. Este programa brinda un respiro vital a madres solteras, cuidadoras de personas dependientes y mujeres en situación de vulnerabilidad.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    targetAmount: 9000,
    raisedAmount: 6450,
    beneficiariesTarget: 350,
    beneficiariesCurrent: 210,
    status: 'En financiamiento',
    location: 'Centros comunitarios y sesiones grupales online',
    milestones: [
      '18 grupos de terapia concluidos con éxito',
      'Red autogestionada de apoyo entre cuidadoras',
      'Talleres de autocuidado somático y relajación'
    ],
    updatesCount: 6
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'salud-mental-comunitaria-bogota-soacha',
    slug: 'salud-mental-comunitaria-bogota-y-soacha-entornos-protectores',
    title: 'Salud mental comunitaria en Bogotá y Soacha: fortaleciendo el tejido de familias y cuidadores',
    category: 'Salud Mental',
    excerpt: 'En los barrios y comunas de Bogotá y Soacha, la contención psicosocial sin barreras económicas es vital para prevenir crisis emocionales y consolidar entornos seguros.',
    content: [
      'En los sectores urbanos de Bogotá y el municipio de Soacha, las familias enfrentan retos socioeconómicos significativos que impactan de manera directa en el bienestar psicológico de niños, adolescentes y cuidadores.',
      'El modelo de salud mental comunitaria promovido por la Fundación CINHARI prioriza la atención temprana en el territorio. Al acercar la psicoterapia y la orientación biopsicosocial a las comunidades, evitamos que el malestar emocional evolucione hacia cuadros severos de depresión o aislamiento.',
      'A través de espacios de escucha activa y orientación familiar, brindamos herramientas prácticas para la resolución no violenta de conflictos y el manejo compasivo de la sobrecarga emocional en el hogar.',
      'Recordamos que en Bogotá y Soacha la salud mental es un derecho fundamental; pedir orientación profesional con calidez y sin juicios es el primer paso para transformar vidas.'
    ],
    author: {
      name: 'Dra. Camila Restrepo',
      role: 'Psicóloga Comunitaria · Fundación CINHARI',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    date: '18 de Agosto, 2026',
    readTime: '4 min de lectura',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    tags: ['Bogotá', 'Soacha', 'Salud Comunitaria', 'Familias', 'Bienestar'],
    claps: 168,
    featured: true
  },
  {
    id: 'ruta-icbf-proteccion-ninez-colombia',
    slug: 'ruta-de-atencion-integral-icbf-desarrollo-de-la-ninez',
    title: 'Ruta de atención psicosocial ICBF: claves para la protección y el desarrollo integral de la niñez',
    category: 'Prevención y Alerta',
    excerpt: 'Conoce los lineamientos del Instituto Colombiano de Bienestar Familiar (ICBF) y cómo las instituciones aliadas como CINHARI garantizan los derechos fundamentales de la infancia.',
    content: [
      'La protección integral de la niñez en Colombia exige una articulación rigurosa entre el marco normativo del ICBF y la intervención psicosocial en terreno.',
      'Bajo la acreditación y licencia de funcionamiento de la Fundación CINHARI (LF-3298), desarrollamos programas enfocados en el restablecimiento de derechos, la crianza amorosa y la detección oportuna de vulneraciones psicosociales.',
      'Para cualquier emergencia o reporte de vulneración de derechos de menores, la Línea 141 del ICBF y la Línea 106 de la Secretaría de Salud operan de forma gratuita las 24 horas del día en todo el territorio nacional.',
      'El compromiso de todos como sociedad es velar porque cada niño y niña crezca en un entorno donde su integridad física y emocional sea una prioridad absoluta.'
    ],
    author: {
      name: 'Dra. Patricia Gómez',
      role: 'Especialista en Derechos de Infancia y Familia',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    date: '3 de Agosto, 2026',
    readTime: '5 min de lectura',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    tags: ['ICBF', 'Infancia Colombia', 'Protección', 'Derechos Niñez'],
    claps: 134
  },
  {
    id: 'ansiedad-escolar-jovenes-colombia',
    slug: 'estrategias-contra-la-ansiedad-y-estres-escolar-en-colombia',
    title: 'Manejo del estrés y la ansiedad escolar en jóvenes: herramientas para colegios y hogares en Colombia',
    category: 'Salud Mental',
    excerpt: 'Guía práctica para docentes y padres en Bogotá, Soacha y Cundinamarca: cómo detectar síntomas de ansiedad académica y fomentar la resiliencia en adolescentes.',
    content: [
      'El regreso a clases y las exigencias académicas suelen generar picos de ansiedad en niños y adolescentes en colegios de Bogotá y Soacha.',
      'La ansiedad escolar no siempre se expresa como nerviosismo explícito; a menudo se manifiesta como dolores de estómago antes de ir al colegio, irritabilidad repentina, dificultades para dormir o perfeccionismo paralizante.',
      'Desde el equipo de psicología de Fundación CINHARI promovemos la técnica de los 4 pasos para la regulación en el aula: 1) Nombrar la emoción, 2) Pausa diafragmática de 3 minutos, 3) Desmitificar la presión por la nota perfecta, y 4) Espacios de diálogo empático con tutores.',
      'Los colegios que integran la educación socioemocional logran reducir en más de un 40% los índices de deserción y acoso escolar.'
    ],
    author: {
      name: 'Lic. Andrés Felipe Ospina',
      role: 'Psicólogo Clínico Educativo · CINHARI',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    date: '22 de Julio, 2026',
    readTime: '6 min de lectura',
    coverImage: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1000&q=80',
    tags: ['Adolescencia', 'Educación', 'Ansiedad Escolar', 'Bogotá'],
    claps: 112
  },
  {
    id: 'habilitacion-rehabilitacion-infantil-integral',
    slug: 'el-valor-de-la-habilitacion-y-rehabilitacion-integral-infantil',
    title: 'Habilitación y rehabilitación integral infantil: el impacto del acompañamiento interdisciplinario',
    category: 'Psicología Infantil',
    excerpt: 'Cómo la terapia ocupacional, fonoaudiología y psicología clínica potencian el neurodesarrollo y la autonomía de niños y niñas en Soacha y Bogotá.',
    content: [
      'El desarrollo integral en los primeros años de vida sienta las bases de las capacidades cognitivas, motoras y socioafectivas del ser humano.',
      'El enfoque de habilitación y rehabilitación de la Fundación CINHARI integra profesionales en psicología, educación especial, fonoaudiología y trabajo social, creando planes personalizados acordes a las necesidades de cada niño o niña.',
      'Involucrar activamente a los padres y madres como coterapeutas en el hogar multiplica los avances terapéuticos y fortalece el vínculo afectivo familiar.',
      'Nuestro centro en Soacha y Bogotá mantiene abiertas las valoraciones para que ninguna familia se quede sin orientación especializada.'
    ],
    author: {
      name: 'Dra. María Juliana Vargas',
      role: 'Directora Técnica de Habilitación · CINHARI',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    date: '8 de Julio, 2026',
    readTime: '5 min de lectura',
    coverImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1000&q=80',
    tags: ['Habilitación', 'Rehabilitación', 'Neurodesarrollo', 'Infancia Soacha'],
    claps: 98
  }
];

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 1,
    category: 'Ánimo',
    question: 'Durante las últimas 2 semanas, ¿con qué frecuencia has sentido poco interés o placer en hacer las cosas que antes disfrutabas?',
    helper: 'Reflexiona sobre tus actividades cotidianas, pasatiempos y momentos de ocio.',
    options: [
      { label: 'Para nada (0 días)', score: 0, description: 'Me mantengo motivado/a y disfruto de mis actividades.' },
      { label: 'Varios días', score: 1, description: 'He tenido momentos aislados de apatía o desgana.' },
      { label: 'Más de la mitad de los días', score: 2, description: 'Me cuesta conectar con el entusiasmo con frecuencia.' },
      { label: 'Casi todos los días', score: 3, description: 'Siento una pérdida notable de interés y desconexión constante.' }
    ]
  },
  {
    id: 2,
    category: 'Ánimo',
    question: '¿Has experimentado sentimientos de desánimo, tristeza profunda, desesperanza o sensación de vacío?',
    helper: 'Piensa en tu tono emocional predominante a lo largo de tu jornada.',
    options: [
      { label: 'Rara vez o nunca', score: 0, description: 'Mi estado anímico general es estable y positivo.' },
      { label: 'Algunos días esporádicos', score: 1, description: 'Altibajos normales acordes a las circunstancias.' },
      { label: 'Frecuentemente (semanalmente)', score: 2, description: 'La tristeza o pesadez me acompaña de manera recurrente.' },
      { label: 'Casi de forma continua', score: 3, description: 'Me siento desbordado/a por la tristeza o falta de esperanza.' }
    ]
  },
  {
    id: 3,
    category: 'Ansiedad',
    question: '¿Con qué frecuencia te has sentido nervioso/a, intranquilo/a, con preocupaciones difíciles de detener o con el cuerpo en tensión?',
    helper: 'Incluye pensamientos repetitivos sobre el futuro, inquietud motora o sensación de peligro.',
    options: [
      { label: 'No he sentido ansiedad', score: 0, description: 'Me siento tranquilo/a y sereno/a.' },
      { label: 'Ocasionalmente en momentos puntuales', score: 1, description: 'Ansiedad leve vinculada a eventos concretos.' },
      { label: 'Con bastante frecuencia', score: 2, description: 'Preocupaciones intensas que me desgastan mentalmente.' },
      { label: 'Casi todo el tiempo', score: 3, description: 'Sensación continua de alerta, agobio o dificultad para relajarme.' }
    ]
  },
  {
    id: 4,
    category: 'Sueño y Energía',
    question: '¿Cómo calificarías la calidad de tu descanso y tu nivel de energía física durante el día?',
    helper: 'Considera dificultades para conciliar el sueño, despertares nocturnos o cansancio al despertar.',
    options: [
      { label: 'Duermo bien y me siento con energía', score: 0, description: 'Descanso reparador la mayor parte de las noches.' },
      { label: 'Dificultades leves de sueño de vez en cuando', score: 1, description: 'Algún insomnio ocasional sin mayor impacto.' },
      { label: 'Insomnio frecuente o fatiga diurna constante', score: 2, description: 'Me despierto cansado/a y me falta energía.' },
      { label: 'Trastorno severo del sueño o agotamiento extremo', score: 3, description: 'Insomnio crónico o imposibilidad de reponer fuerzas.' }
    ]
  },
  {
    id: 5,
    category: 'Estrés y Sobrecarga',
    question: '¿Sientes que las demandas de tu vida diaria (trabajo, familia, estudios, economía) superan tu capacidad para gestionarlas?',
    helper: 'Evalúa tu nivel de saturación mental y sensación de control sobre tus responsabilidades.',
    options: [
      { label: 'Gestiono bien mis responsabilidades', score: 0, description: 'Mantengo el equilibrio y encuentro tiempo para mí.' },
      { label: 'Momentos puntuales de estrés', score: 1, description: 'Manejo el estrés con pausas adecuadas.' },
      { label: 'Sensación frecuente de sobrecarga', score: 2, description: 'Siento que el día a día me sobrepasa a menudo.' },
      { label: 'Sobrecarga y agotamiento emocional constante (burnout)', score: 3, description: 'Siento que no doy abasto y me encuentro al límite.' }
    ]
  },
  {
    id: 6,
    category: 'Autocuidado y Red',
    question: '¿Cuentas con espacios para ti mismo/a y con personas de confianza a quienes recurrir cuando lo necesitas?',
    helper: 'El apoyo social y el tiempo personal son factores protectores clave para la salud mental.',
    options: [
      { label: 'Sí, tengo buena red de apoyo y tiempo de autocuidado', score: 0, description: 'Cuento con personas cercanas y hábitos saludables.' },
      { label: 'Tengo algo de apoyo aunque poco tiempo para mí', score: 1, description: 'Red disponible pero me cuesta priorizar mi bienestar.' },
      { label: 'Me siento bastante solo/a o incomprendido/a', score: 2, description: 'Pocas personas con quienes hablar sinceramente.' },
      { label: 'Aislamiento casi total o sin red de soporte', score: 3, description: 'Me siento completamente solo/a frente a mis dificultades.' }
    ]
  }
];

export const DAILY_WELLNESS_RESOURCES: DailyResource[] = [
  {
    id: 'recurso-hoy',
    dateKey: '2026-08-29',
    title: 'Pausa de Anclaje Sensorial (Técnica 5-4-3-2-1)',
    category: 'Mindfulness',
    affirmation: '"Hoy me doy permiso para soltar la prisa y habitar el presente con amabilidad hacia mis propios ritmos."',
    reflection: 'Cuando la mente viaja al futuro con preocupación o al pasado con rumiación, los cinco sentidos son el ancla más rápida y eficaz para devolver al cuerpo la señal de que en este instante exacto estás a salvo.',
    actionableExercise: {
      name: 'Micro-anclaje en 3 minutos',
      durationMinutes: 3,
      steps: [
        'Observa 5 cosas a tu alrededor que no habías notado (un color, una sombra, una textura).',
        'Toca 4 superficies distintas (tu ropa, la mesa, tus manos juntas, el suelo bajo tus pies).',
        'Escucha 3 sonidos sutiles en el ambiente (un pájaro, el viento, la respiración).',
        'Identifica 2 aromas suaves en el aire.',
        'Saborea 1 gusto en tu boca o bebe un sorbo de agua consciente sintiendo su temperatura.'
      ]
    },
    audioGuide: {
      title: 'Respiración consciente guiada',
      duration: '4:20 min'
    }
  },
  {
    id: 'recurso-calma',
    dateKey: '2026-08-30',
    title: 'Respiración Diafragmática 4-7-8 para el Sistema Nervioso',
    category: 'Gestión de Ansiedad',
    affirmation: '"Mis emociones son olas que vienen y van; yo soy el océano profundo y en calma."',
    reflection: 'La respiración es el único mecanismo autonómico que podemos controlar voluntariamente. Al ralentizar la exhalación, estimulamos directamente el nervio vago y activamos la respuesta parasimpática de relajación.',
    actionableExercise: {
      name: 'Ciclo 4-7-8 de Calma Profunda',
      durationMinutes: 4,
      steps: [
        'Inhala suavemente por la nariz contando mentalmente hasta 4.',
        'Sostén el aire en tus pulmones durante 7 segundos sintiendo la expansión de tu pecho.',
        'Exhala suavemente por la boca con un sonido suave contando hasta 8.',
        'Repite este ciclo 4 veces seguidas antes de dormir o en momentos de tensión.'
      ]
    }
  },
  {
    id: 'recurso-autoestima',
    dateKey: '2026-08-31',
    title: 'Diálogo Interno Compasivo: Hablarte como a un Buen Amigo',
    category: 'Autoestima',
    affirmation: '"Soy digno/a de amor, descanso y respeto, independientemente de lo productivo/a que haya sido hoy."',
    reflection: 'La voz crítica interna suele ser mucho más severa de lo que jamás seríamos con alguien a quien queremos. Aprender a reformular nuestros pensamientos con compasión reduce los niveles de cortisol y fortalece la resiliencia.',
    actionableExercise: {
      name: 'Reencuadre de la autocrítica',
      durationMinutes: 5,
      steps: [
        'Identifica un pensamiento duro que te hayas dicho hoy (ej. "Todo me sale mal").',
        'Pregúntate: ¿Le diría esto a mi mejor amigo o a un niño que comete un error?',
        'Reescribe la frase con comprensión: "Estoy aprendiendo y haciendo lo mejor que puedo con las herramientas que tengo hoy".'
      ]
    }
  }
];

export const INITIAL_DONATION_WALL = [
  { id: 'don-1', name: 'Familia Ramírez Gómez', amount: 150, frequency: 'Mensual', message: 'Gracias por acompañar a tantos jóvenes que lo necesitan.', date: 'Hace 2 horas', badge: 'Socio Protector' },
  { id: 'don-2', name: 'Donante Anónimo', amount: 50, frequency: 'Única', message: 'En memoria de mi hermano. Que nadie sufra en silencio.', date: 'Hace 5 horas', badge: 'Solidario' },
  { id: 'don-3', name: 'Clínica Dental Alborada', amount: 300, frequency: 'Mensual', message: 'Orgullosos de apoyar la salud mental comunitaria como empresa amiga.', date: 'Ayer', badge: 'Empresa Comprometida' },
  { id: 'don-4', name: 'Beatriz S.', amount: 25, frequency: 'Mensual', message: 'Una sesión más para quien no puede pagarla.', date: 'Hace 2 días', badge: 'Amigo de Cinhari' },
  { id: 'don-5', name: 'Carlos Morales', amount: 100, frequency: 'Única', message: 'Excelente labor. Sigamos derribando estigmas.', date: 'Hace 3 días', badge: 'Solidario' }
];
