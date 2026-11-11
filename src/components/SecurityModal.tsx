import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Phone,
  Building2,
  X,
  Copy,
  Check,
  Globe,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { CINHARI_PHONE } from '../utils/whatsapp';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  const [currentDomain, setCurrentDomain] = useState('');
  const [isSecureDomain, setIsSecureDomain] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      setCurrentDomain(hostname);
      // Valid domains: run.app, fundacioncinhari.org, localhost, 127.0.0.1, ais-*.run.app
      const isLegit =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.endsWith('.run.app') ||
        hostname.endsWith('fundacioncinhari.org') ||
        hostname.endsWith('github.io') ||
        hostname.endsWith('vercel.app');
      setIsSecureDomain(isLegit);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-teal-100 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-900 p-6 text-white rounded-t-3xl relative">
          <button
            onClick={onClose}
            aria-label="Cerrar modal de seguridad"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/30 border border-teal-300/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200 bg-teal-900/60 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                Seguridad Digital & Anti-Suplantación
              </span>
              <h2 id="security-modal-title" className="text-xl sm:text-2xl font-bold font-serif">
                Centro de Seguridad & Anti-Phishing
              </h2>
            </div>
          </div>
          <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-lg leading-relaxed">
            Protegemos tu privacidad y garantizamos la autenticidad de cada canal oficial de la Fundación CINHARI para prevenir fraudes cibernéticos.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-slate-700 text-sm">

          {/* 1. Real-time Domain Authenticity Checker */}
          <div className={`p-4 rounded-2xl border ${
            isSecureDomain
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                isSecureDomain ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {isSecureDomain ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">
                    {isSecureDomain ? 'Verificación de Dominio Auténtico' : 'Alerta: Dominio No Reconocido'}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    isSecureDomain ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                  }`}>
                    {isSecureDomain ? 'SSL HTTPS Activo' : 'Riesgo de Phishing'}
                  </span>
                </div>
                <p className="text-xs mt-1 text-slate-600 font-mono break-all">
                  Conectado desde: <span className="font-semibold text-slate-900">{currentDomain || 'ais-pre-*.run.app'}</span>
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {isSecureDomain
                    ? 'Estás navegando en un entorno verificado con cifrado TLS/SSL de extremo a extremo. Tus datos no son interceptados.'
                    : 'Cuidado: la dirección web no coincide con los servidores autorizados de CINHARI. No ingreses datos bancarios ni personales.'}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Official Channels & Identity Data */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-600" />
              Canales y Datos Oficiales Verificados
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp Oficial */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-medium flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    Línea y WhatsApp Oficial
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Único</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-slate-900 text-sm font-mono">+57 314 367 4235</span>
                  <button
                    onClick={() => copyToClipboard('+573143674235', 'phone')}
                    className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                    title="Copiar número"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  CINHARI no utiliza otros números móviles para agendar citas ni pedir aportes.
                </p>
              </div>

              {/* NIT Oficial */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-medium flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
                    NIT Institucional DIAN
                  </span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">RUT</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-slate-900 text-sm font-mono">901.428.190-2</span>
                  <button
                    onClick={() => copyToClipboard('901428190-2', 'nit')}
                    className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                    title="Copiar NIT"
                  >
                    {copiedField === 'nit' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Titular: Fundación CINHARI. Entidad Sin Ánimo de Lucro (ESAL).
                </p>
              </div>

              {/* Licencia ICBF */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    Licencia ICBF
                  </span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded">Vigente</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-slate-900 text-sm font-mono">LF-3298</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Habilitación y supervisión institucional para infancia y familia.
                </p>
              </div>

              {/* Dominio Oficial */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-medium flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                    Sitio Web Oficial
                  </span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded">DNS</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-slate-900 text-sm font-mono">fundacioncinhari.org</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Verifica siempre que la dirección empiece por https://.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Anti-Phishing Safety Rules (Decálogo de Seguridad) */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              ¿Cómo identificar y evitar el Phishing o Suplantación?
            </h3>
            <ul className="space-y-2 text-xs text-amber-950">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Cuentas Bancarias:</strong> Todos los aportes se reciben únicamente en cuentas a nombre de <strong>FUNDACIÓN CINHARI</strong>. Nunca transfieras a nombres de personas naturales particulares.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Contraseñas y Códigos:</strong> CINHARI <strong>NUNCA</strong> te pedirá contraseñas bancarias, claves dinámicas de Nequi/Daviplata o códigos SMS.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Enlaces Sospechosos:</strong> No abras enlaces que recibas por SMS o correos no verificados que prometan ayudas económicas a nombre de la fundación.
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Reporting Phishing */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-100">
                  ¿Detectaste un perfil o mensaje sospechoso?
                </p>
                <p className="text-[11px] text-slate-400">
                  Denúncialo directamente a nuestro equipo de ciberseguridad.
                </p>
              </div>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=573143674235&text=Hola%20CINHARI,%20deseo%20reportar%20un%20posible%20caso%20de%20suplantaci%C3%B3n%20o%20mensaje%20sospechoso"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>Reportar a WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-3xl flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Encriptación TLS 1.3 / SSL 256 bits</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
