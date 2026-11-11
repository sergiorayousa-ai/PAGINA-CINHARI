import React, { useState } from 'react';
import { AppointmentBooking } from '../types';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<AppointmentBooking['serviceType']>('Orientación Psicológica Solidaria');
  const [modality, setModality] = useState<AppointmentBooking['modality']>('Online (Videollamada segura)');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<AppointmentBooking['preferredTimeSlot']>('Tarde (14:00 - 18:00)');
  const [reason, setReason] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [submittedBooking, setSubmittedBooking] = useState<AppointmentBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !preferredDate) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const booking: AppointmentBooking = {
        id: `CITA-${Math.floor(10000 + Math.random() * 90000)}`,
        name,
        email,
        phone,
        serviceType,
        modality,
        preferredDate,
        preferredTimeSlot,
        reason,
        firstTime: isFirstTime,
        status: 'Confirmada',
        createdAt: new Date().toLocaleDateString('es-ES')
      };

      setSubmittedBooking(booking);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  const handleClose = () => {
    setSubmittedBooking(null);
    setName('');
    setEmail('');
    setPhone('');
    setReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white/85 backdrop-blur-2xl rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-white/80 p-6 sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-white/60 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600/90 text-white flex items-center justify-center shadow-xs border border-white/20 backdrop-blur-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Agendar Cita en Psicología</h3>
              <p className="text-xs text-slate-500 font-light">Fundación CINHARI · Psicología Especializada · Calle 17 A # 13-24</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/60 backdrop-blur-sm transition-all cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submittedBooking ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Servicio o Tipo de Atención *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as AppointmentBooking['serviceType'])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs sm:text-sm shadow-xs cursor-pointer transition-all"
              >
                <option value="Orientación Psicológica Solidaria">Orientación Psicológica Solidaria (Primera toma de contacto gratuita)</option>
                <option value="Psicoterapia Individual">Psicoterapia Individual</option>
                <option value="Terapia Familiar">Terapia Familiar / Pareja</option>
                <option value="Psicología Infantil">Psicología Infantil y Juvenil</option>
                <option value="Grupo de Apoyo Emocional">Grupo de Apoyo Emocional</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Modalidad *
                </label>
                <select
                  value={modality}
                  onChange={(e) => setModality(e.target.value as AppointmentBooking['modality'])}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs shadow-xs cursor-pointer transition-all"
                >
                  <option value="Online (Videollamada segura)">Online (Videollamada segura)</option>
                  <option value="Presencial (Sede Cinhari)">Presencial (Sede Cinhari)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Franja horaria preferida *
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value as AppointmentBooking['preferredTimeSlot'])}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/70 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs shadow-xs cursor-pointer transition-all"
                >
                  <option value="Mañana (9:00 - 13:00)">Mañana (9:00 - 13:00)</option>
                  <option value="Tarde (14:00 - 18:00)">Tarde (14:00 - 18:00)</option>
                  <option value="Vespertino (18:00 - 20:00)">Vespertino (18:00 - 20:00)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fecha preferida *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/60 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs shadow-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/60 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs shadow-xs transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu-correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/60 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs shadow-xs transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+57 314 367 4235"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/60 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs shadow-xs transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ¿Qué te gustaría abordar o qué estás experimentando? (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Breve descripción para orientar al profesional adecuado..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-white/80 bg-white/60 backdrop-blur-sm focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 text-xs shadow-xs transition-all"
              />
            </div>

            <div className="bg-white/60 backdrop-blur-md p-3 rounded-xl border border-white/80 flex items-center gap-2 text-[11px] text-teal-900 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Garantía de secreto profesional médico según el Código Deontológico de la Psicología.</span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md border border-white/20 backdrop-blur-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Agendando...' : 'Confirmar Solicitud de Cita'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-white/80 text-teal-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-1">¡Cita Solicitada con Éxito!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4 font-light">
              Hemos registrado tu solicitud con el código <strong className="text-teal-900 font-mono">{submittedBooking.id}</strong>. Te contactaremos a <strong>{submittedBooking.email}</strong> para coordinar el enlace de videollamada o sala de atención.
            </p>

            <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl text-left text-xs border border-white/80 space-y-1.5 mb-5 shadow-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Servicio:</span>
                <span className="font-semibold text-slate-800">{submittedBooking.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha y Turno:</span>
                <span className="font-semibold text-slate-800">{submittedBooking.preferredDate} ({submittedBooking.preferredTimeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Modalidad:</span>
                <span className="font-semibold text-slate-800">{submittedBooking.modality}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-white/80 hover:bg-white text-teal-850 border border-white/80 text-xs font-semibold backdrop-blur-sm shadow-xs transition-all cursor-pointer"
            >
              Entendido y Cerrar
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
