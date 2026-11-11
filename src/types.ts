export interface Project {
  id: string;
  title: string;
  category: 'Comunidad' | 'Infantil y Juvenil' | 'Prevención' | 'Mujer y Familia' | 'Adultos Mayores';
  tagline: string;
  description: string;
  fullStory: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  beneficiariesTarget: number;
  beneficiariesCurrent: number;
  status: 'Activo' | 'En financiamiento' | 'Completado';
  location: string;
  milestones: string[];
  updatesCount: number;
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  frequency: 'once' | 'monthly';
  currency: string;
  projectId?: string;
  projectTitle?: string;
  message?: string;
  isAnonymous: boolean;
  paymentMethod: 'card' | 'paypal' | 'pse' | 'nequi' | 'transfer' | 'bizum';
  date: string;
  taxDeductible: boolean;
  certificateId: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  age: number;
  profile: 'Psicólogo/a Graduado' | 'Estudiante de Psicología' | 'Trabajo Social' | 'Comunicación y Medios' | 'Logística y Eventos' | 'Acompañante Comunitario';
  availability: '1-3 horas/semana' | '4-8 horas/semana' | 'Fines de semana' | 'Campañas puntuales';
  modality: 'Remoto' | 'Presencial' | 'Híbrido';
  motivation: string;
  experienceSummary: string;
  submittedAt: string;
  status: 'En revisión' | 'Aprobado';
}

export interface SurveyQuestion {
  id: number;
  question: string;
  category: 'Ánimo' | 'Ansiedad' | 'Sueño y Energía' | 'Estrés y Sobrecarga' | 'Autocuidado y Red';
  helper: string;
  options: {
    label: string;
    score: number; // 0 to 3
    description?: string;
  }[];
}

export interface SurveyResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: 'Óptimo' | 'Leve' | 'Moderado' | 'Significativo';
  summary: string;
  categoryBreakdown: {
    category: string;
    score: number;
    maxScore: number;
    feedback: string;
    color: string;
  }[];
  recommendations: string[];
  actionPlan: {
    title: string;
    desc: string;
    icon: string;
  }[];
  completedAt: string;
}

export interface DailyResource {
  id: string;
  dateKey: string;
  title: string;
  category: 'Mindfulness' | 'Higiene del Sueño' | 'Gestión de Ansiedad' | 'Autoestima' | 'Relaciones Saludables';
  affirmation: string;
  reflection: string;
  actionableExercise: {
    name: string;
    steps: string[];
    durationMinutes: number;
  };
  audioGuide?: {
    title: string;
    duration: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Salud Mental' | 'Psicología Infantil' | 'Prevención y Alerta' | 'Testimonios' | 'Comunidad';
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  claps: number;
  featured?: boolean;
}

export interface AppointmentBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: 'Psicoterapia Individual' | 'Orientación Psicológica Solidaria' | 'Terapia Familiar' | 'Psicología Infantil' | 'Grupo de Apoyo Emocional';
  modality: 'Online (Videollamada segura)' | 'Presencial (Sede Cinhari)';
  preferredDate: string;
  preferredTimeSlot: 'Mañana (9:00 - 13:00)' | 'Tarde (14:00 - 18:00)' | 'Vespertino (18:00 - 20:00)';
  reason: string;
  firstTime: boolean;
  status: 'Confirmada' | 'Pendiente';
  createdAt: string;
}
