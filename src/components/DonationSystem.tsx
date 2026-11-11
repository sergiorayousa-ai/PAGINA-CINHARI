import React, { useState } from 'react';
import { Donation } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Heart,
  ShieldCheck,
  CreditCard,
  Building,
  CheckCircle2,
  Lock,
  Download,
  Sparkles,
  Award,
  Users,
  Calculator,
  MessageSquareHeart,
  ArrowRight,
  Info,
  Globe,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

export const PAYPAL_DONATION_URL = 'https://www.paypal.com/ncp/payment/NRG24JXPMWN9W';

interface DonationSystemProps {
  initialProjectId?: string;
  initialProjectTitle?: string;
  onDonationComplete?: (donation: Donation) => void;
}

export const DonationSystem: React.FC<DonationSystemProps> = ({
  initialProjectId,
  initialProjectTitle,
  onDonationComplete
}) => {
  const { t, language } = useLanguage();
  const [currencyTab, setCurrencyTab] = useState<'COP' | 'USD'>('COP');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [targetProject, setTargetProject] = useState<string>(initialProjectId || 'general');
  const [step, setStep] = useState<number>(1); // 1: Amount, 2: Info & Payment, 3: Receipt & Success

  // Donor form
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [wantsTaxCertificate, setWantsTaxCertificate] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'pse' | 'nequi' | 'transfer'>('pse');
  const [paypalTxId, setPaypalTxId] = useState('');

  // Simulated Card Info
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [bankName, setBankName] = useState('Bancolombia');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState<Donation | null>(null);

  const presetAmountsCOP = language === 'es' ? [
    { value: 30000, label: '$30.000', impact: '1 Kit de estimulación y herramientas de contención emocional' },
    { value: 50000, label: '$50.000', impact: '1 Sesión de orientación psicosocial individual' },
    { value: 100000, label: '$100.000', impact: '1 Mes de acompañamiento y seguimiento terapéutico continuo' },
    { value: 200000, label: '$200.000', impact: '1 Evaluación diagnóstica y plan de habilitación integral' },
    { value: 500000, label: '$500.000', impact: '1 Taller comunitario en Fusagasugá o Soacha para 40 familias' }
  ] : [
    { value: 30000, label: '$30,000 COP', impact: '1 Emotional containment & stimulation toolkit' },
    { value: 50000, label: '$50,000 COP', impact: '1 Individual psychosocial guidance session' },
    { value: 100000, label: '$100,000 COP', impact: '1 Month of ongoing therapeutic accompaniment' },
    { value: 200000, label: '$200,000 COP', impact: '1 Diagnostic evaluation & comprehensive habilitation plan' },
    { value: 500000, label: '$500,000 COP', impact: '1 Community workshop in Fusagasugá/Soacha for 40 families' }
  ];

  const presetAmountsUSD = language === 'es' ? [
    { value: 15, label: '$15 USD', impact: '1 Kit de estimulación y materiales de regulación emocional' },
    { value: 25, label: '$25 USD', impact: '1 Sesión completa de psicología clínica y orientación familiar' },
    { value: 50, label: '$50 USD', impact: '1 Mes de acompañamiento terapéutico y psicosocial continuo' },
    { value: 100, label: '$100 USD', impact: '1 Evaluación diagnóstica integral y plan de habilitación' },
    { value: 250, label: '$250 USD', impact: '1 Taller comunitario y dotación de material terapéutico' }
  ] : [
    { value: 15, label: '$15 USD', impact: '1 Emotional containment & stimulation toolkit' },
    { value: 25, label: '$25 USD', impact: '1 Complete clinical psychology & family guidance session' },
    { value: 50, label: '$50 USD', impact: '1 Month of ongoing therapeutic and psychosocial follow-up' },
    { value: 100, label: '$100 USD', impact: '1 Comprehensive diagnostic evaluation & habilitation plan' },
    { value: 250, label: '$250 USD', impact: '1 Community workshop & therapeutic materials kit' }
  ];

  const presetAmounts = currencyTab === 'USD' ? presetAmountsUSD : presetAmountsCOP;
  const currentAmount = isCustom ? (parseFloat(customAmount) || 0) : selectedAmount;

  // Fiscal deduction in Colombia: Estatuto Tributario Art. 257 (Descuento tributario del 25% en el impuesto sobre la renta)
  const calculateFiscalSavings = (amt: number) => {
    const annualAmt = frequency === 'monthly' ? amt * 12 : amt;
    const totalSavings = Math.round(annualAmt * 0.25);
    const realCost = Math.max(0, annualAmt - totalSavings);
    return { annualAmt, totalSavings, realCost };
  };

  const { totalSavings } = calculateFiscalSavings(currentAmount);

  const formatAmount = (num: number, curr = currencyTab) => {
    if (curr === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    }
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(num);
  };

  const handleCurrencySwitch = (newCurrency: 'COP' | 'USD') => {
    setCurrencyTab(newCurrency);
    setIsCustom(false);
    setCustomAmount('');
    if (newCurrency === 'USD') {
      setSelectedAmount(25);
      setPaymentMethod('paypal');
    } else {
      setSelectedAmount(50000);
      setPaymentMethod('pse');
    }
  };

  const handleAmountSelect = (val: number) => {
    setIsCustom(false);
    setSelectedAmount(val);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustom(true);
    setCustomAmount(e.target.value);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const minAmt = currencyTab === 'USD' ? 5 : 10000;
    if (currentAmount < minAmt) {
      alert(language === 'es'
        ? `El monto mínimo sugerido de donación es de ${formatAmount(minAmt)}.`
        : `The minimum suggested donation is ${formatAmount(minAmt)}.`
      );
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (!isAnonymous && !donorName)) {
      alert(language === 'es' ? 'Por favor completa los campos requeridos.' : 'Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newDonation: Donation = {
        id: `DON-${Date.now().toString().slice(-6)}`,
        donorName: isAnonymous ? (language === 'es' ? 'Donante Anónimo' : 'Anonymous Donor') : donorName,
        email,
        amount: currentAmount,
        frequency,
        currency: currencyTab === 'USD' ? 'USD ($)' : 'COP ($)',
        projectId: targetProject,
        projectTitle: language === 'es' ? 'Fondo de Atención Psicosocial y Habilitación Integral' : 'Psychosocial Support & Comprehensive Habilitation Fund',
        message: paypalTxId ? `${message ? message + ' | ' : ''}Ref PayPal: ${paypalTxId}` : message,
        isAnonymous,
        paymentMethod,
        date: new Date().toLocaleDateString(language === 'es' ? 'es-CO' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        taxDeductible: wantsTaxCertificate,
        certificateId: `CERT-CINHARI-${Math.floor(100000 + Math.random() * 900000)}`
      };

      setCompletedDonation(newDonation);
      setStep(3);

      if (onDonationComplete) {
        onDonationComplete(newDonation);
      }

      // Fire festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#14b8a6', '#0f766e', '#38bdf8', '#34d399', '#f59e0b', '#003087']
      });
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const resetForm = () => {
    setStep(1);
    setCompletedDonation(null);
    setCardNumber('');
    setCardExp('');
    setCardCvc('');
  };

  return (
    <section id="donaciones" className="py-20 bg-gradient-to-b from-white via-[#f0f9f8] to-white scroll-mt-24" aria-label="Sistema de Donaciones Integrado">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
            {t('donations.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-architects text-slate-900 tracking-normal">
            {t('donations.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            {t('donations.subtitle')}
          </p>
        </div>

        {/* Main Donation Container Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-teal-100 overflow-hidden">
          
          {/* Progress Step Indicator */}
          <div className="bg-slate-900 text-white px-6 sm:px-10 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                {step}
              </div>
              <span className="font-semibold text-sm sm:text-base">
                {step === 1 && (language === 'es' ? 'Paso 1: Elige el valor de tu donación' : 'Step 1: Choose your donation amount')}
                {step === 2 && (language === 'es' ? 'Paso 2: Datos y método de pago' : 'Step 2: Information & payment method')}
                {step === 3 && (language === 'es' ? 'Paso 3: Donación confirmada y certificado' : 'Step 3: Confirmed donation & certificate')}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-teal-300 font-medium">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{language === 'es' ? 'Encriptación SSL 256-bit' : '256-bit SSL Encryption'}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {step === 1 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleProceedToPayment}
                className="space-y-8"
              >
                {/* Currency & Origin Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {language === 'es' ? '¿Desde dónde realizas tu donación?' : 'Where are you donating from?'}
                    </label>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      {currencyTab === 'USD' ? (language === 'es' ? 'Moneda: Dólares USD' : 'Currency: USD') : (language === 'es' ? 'Moneda: Pesos COP' : 'Currency: COP')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                    <button
                      type="button"
                      onClick={() => handleCurrencySwitch('COP')}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                        currencyTab === 'COP'
                          ? 'bg-teal-50/90 border-teal-600 ring-2 ring-teal-500/30 text-teal-950 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">🇨🇴</span>
                      <div>
                        <div className="text-sm font-bold flex items-center gap-1.5">
                          <span>Colombia (COP $)</span>
                          {currencyTab === 'COP' && <span className="text-[10px] bg-teal-600 text-white font-bold px-1.5 py-0.2 rounded">Activo</span>}
                        </div>
                        <div className="text-xs text-slate-500">PSE, Nequi, Daviplata, Tarjetas y Bancos</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCurrencySwitch('USD')}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                        currencyTab === 'USD'
                          ? 'bg-sky-50/90 border-sky-600 ring-2 ring-sky-500/30 text-sky-950 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">🌎</span>
                      <div>
                        <div className="text-sm font-bold flex items-center gap-1.5">
                          <span>{language === 'es' ? 'Exterior / Internacional (USD)' : 'International / Overseas (USD)'}</span>
                          {currencyTab === 'USD' && <span className="text-[10px] bg-sky-600 text-white font-bold px-1.5 py-0.2 rounded">PayPal</span>}
                        </div>
                        <div className="text-xs text-slate-500">{language === 'es' ? 'PayPal, Visa, Mastercard internacional' : 'PayPal, Int. Cards'}</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* PayPal Quick Direct Banner for International Donors */}
                {currencyTab === 'USD' && (
                  <div className="bg-gradient-to-r from-[#003087]/10 via-[#0079C1]/10 to-teal-500/10 border border-[#0079C1]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#003087] text-white flex items-center justify-center font-black text-xl italic tracking-tighter shrink-0 shadow-sm">
                        P<span className="text-[#0079C1]">P</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">PayPal Checkout Oficial Fundación CINHARI</span>
                          <span className="text-[10px] font-semibold bg-[#0079C1] text-white px-2 py-0.5 rounded-full">Oficial</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {language === 'es'
                            ? 'Puedes hacer tu aporte directamente con cualquier tarjeta internacional o saldo PayPal.'
                            : 'Donate directly with any international card or your PayPal balance.'}
                        </p>
                      </div>
                    </div>

                    <a
                      href={PAYPAL_DONATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0079C1] hover:bg-[#00457C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
                    >
                      <span>{language === 'es' ? 'Abrir PayPal Directo' : 'Open Direct PayPal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Frequency Switcher */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    {language === 'es' ? 'Frecuencia de tu ayuda solidaria:' : 'Frequency of your donation:'}
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`py-3.5 px-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-teal-300" />
                      <span>{language === 'es' ? 'Mensual (Recomendado)' : 'Monthly (Recommended)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFrequency('once')}
                      className={`py-3.5 px-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        frequency === 'once'
                          ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      <span>{language === 'es' ? 'Puntual (Una sola vez)' : 'One-Time Only'}</span>
                    </button>
                  </div>
                </div>

                {/* Amount Presets */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    {language === 'es'
                      ? `Selecciona un valor sugerido (${currencyTab === 'USD' ? 'Dólares - USD' : 'Pesos Colombianos - COP'}):`
                      : `Select a suggested amount (${currencyTab === 'USD' ? 'US Dollars - USD' : 'Colombian Pesos - COP'}):`}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                    {presetAmounts.map((preset) => {
                      const isSelected = !isCustom && selectedAmount === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => handleAmountSelect(preset.value)}
                          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center ${
                            isSelected
                              ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                            {preset.label}
                            <span className="text-xs font-medium text-slate-500 block">
                              {frequency === 'monthly' ? (language === 'es' ? '/mes' : '/mo') : ''}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 leading-tight">
                            {preset.impact}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="mt-3">
                    <label className="block text-xs text-slate-600 mb-1">
                      {language === 'es'
                        ? `O ingresa otro monto en ${currencyTab === 'USD' ? 'USD ($)' : 'COP ($)'}:`
                        : `Or enter another amount in ${currencyTab === 'USD' ? 'USD ($)' : 'COP ($)'}:`}
                    </label>
                    <div className="relative max-w-xs">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                        $
                      </span>
                      <input
                        type="number"
                        min={currencyTab === 'USD' ? '5' : '10000'}
                        step={currencyTab === 'USD' ? '5' : '5000'}
                        placeholder={currencyTab === 'USD' ? 'Ej. 75' : 'Ej. 75000'}
                        value={customAmount}
                        onChange={handleCustomInput}
                        className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                          isCustom
                            ? 'border-teal-600 ring-2 ring-teal-500 bg-teal-50/50'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Impact Statement Box */}
                <div className="bg-[#e8f7f5] rounded-2xl p-5 border border-teal-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-teal-950 mb-1">
                      {language === 'es' ? 'Tu impacto real estimado en la comunidad:' : 'Your estimated community impact:'}
                    </h4>
                    <p className="text-xs sm:text-sm text-teal-900 leading-relaxed">
                      {language === 'es' ? (
                        <>Con tu aportación de <strong>{formatAmount(currentAmount || 0)}{frequency === 'monthly' ? ' al mes' : ''}</strong>, garantizas atención psicológica, materiales terapéuticos y seguimiento continuo para niños y familias vulnerables en Fusagasugá y la región del Sumapaz.</>
                      ) : (
                        <>With your contribution of <strong>{formatAmount(currentAmount || 0)}{frequency === 'monthly' ? ' per month' : ''}</strong>, you guarantee psychological care, therapeutic toolkits, and ongoing psychosocial support for vulnerable children and families in Fusagasugá and the Sumapaz region.</>
                      )}
                    </p>
                  </div>
                </div>

                {/* Colombian Fiscal Incentive Box (Art 257 Estatuto Tributario) */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5 text-teal-700 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-800">
                        {language === 'es' ? 'Descuento Tributario del 25% (Art. 257 E.T. Colombia):' : '25% Tax Deduction (Art. 257 Tax Code Colombia):'}
                      </span>
                      <p className="text-xs text-slate-500">
                        {language === 'es'
                          ? 'Las donaciones a Fundación CINHARI otorgan un descuento directo en tu declaración de Renta ante la DIAN.'
                          : 'Donations to Fundación CINHARI qualify for a direct 25% tax credit on Colombian Income Tax (DIAN).'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 font-medium text-slate-700 text-center shrink-0">
                    {language === 'es' ? 'Descuento en Renta est.:' : 'Est. Tax Deduction:'} <span className="font-bold text-emerald-700 block text-sm">{formatAmount(totalSavings)}</span>
                  </div>
                </div>

                {/* Continue CTA */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>{language === 'es' ? 'Continuar al Pago Seguro' : 'Proceed to Secure Payment'} ({formatAmount(currentAmount)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleFinalSubmit}
                className="space-y-6"
              >
                {/* Summary bar */}
                <div className="bg-teal-50/80 p-4 rounded-2xl border border-teal-100 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-slate-500">{language === 'es' ? 'Valor de Donación:' : 'Donation Amount:'}</span>{' '}
                    <strong className="text-teal-900 text-base">{formatAmount(currentAmount)}</strong>{' '}
                    <span className="text-xs text-teal-700">
                      ({frequency === 'monthly' ? (language === 'es' ? 'Mensual recurrente' : 'Monthly recurring') : (language === 'es' ? 'Puntual' : 'One-time')}) · {currencyTab === 'USD' ? 'Exterior (USD)' : 'Colombia (COP)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-teal-700 hover:text-teal-900 font-semibold underline cursor-pointer"
                  >
                    {language === 'es' ? 'Modificar' : 'Modify'}
                  </button>
                </div>

                {/* Donor Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {language === 'es'
                        ? `Nombre completo o Razón Social ${isAnonymous ? '(Opcional por anonimato)' : '*'}`
                        : `Full Name or Company Name ${isAnonymous ? '(Optional for anonymity)' : '*'}`}
                    </label>
                    <input
                      type="text"
                      required={!isAnonymous}
                      placeholder={language === 'es' ? 'Ej. María Camila Ospina' : 'e.g. Maria Camila Ospina'}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      disabled={isAnonymous}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {language === 'es' ? 'Correo Electrónico (Para envío del certificado DIAN) *' : 'Email Address (For donation receipt & certificate) *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu-correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {language === 'es' ? 'Cédula de Ciudadanía / NIT o Pasaporte' : 'ID Number / Tax ID / Passport'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'es' ? 'Ej. 1.020.345.678 / Pasaporte' : 'e.g. 1.020.345.678 / Passport'}
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {language === 'es' ? 'Mensaje o dedicatoria para la fundación (Opcional)' : 'Personal note or dedication for the Foundation (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'es' ? 'Ej. Con todo mi cariño para los niños y familias atendidas...' : 'e.g. In honor of mental health access for all...'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 text-sm"
                    />
                  </div>
                </div>

                {/* Anonymous & Certificate Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>{language === 'es' ? 'Deseo que mi donación se registre como anónima.' : 'I wish for this donation to be anonymous.'}</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wantsTaxCertificate}
                      onChange={(e) => setWantsTaxCertificate(e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>{language === 'es' ? 'Deseo recibir el Certificado de Donación para deducción en Renta DIAN por correo.' : 'Send me the official tax certificate via email.'}</span>
                  </label>
                </div>

                {/* Payment Methods Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      {language === 'es' ? 'Selecciona tu canal de pago:' : 'Select your payment method:'}
                    </label>
                    {currencyTab === 'USD' && (
                      <span className="text-[11px] font-bold text-[#0079C1] flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        {language === 'es' ? 'PayPal habilitado para el exterior' : 'PayPal enabled for abroad'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                    {/* PayPal option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'paypal'
                          ? 'bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-500/40 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-black italic text-[#003087] text-sm">
                        Pay<span className="text-[#0079C1]">Pal</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{language === 'es' ? 'Exterior / Tarjetas' : 'International'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pse')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'pse'
                          ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-500/40 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Building className="w-4 h-4 text-teal-700" />
                      <span>PSE Colombia</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nequi')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'nequi'
                          ? 'bg-purple-50 border-purple-600 text-purple-900 ring-2 ring-purple-500/40 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-purple-800">Nequi</span>
                      <span className="text-[10px] text-slate-500">Daviplata</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-500/40 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-teal-700" />
                      <span>{language === 'es' ? 'Tarjeta Déb./Créd.' : 'Credit Card'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === 'transfer'
                          ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-500/40 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Building className="w-4 h-4 text-teal-700" />
                      <span>{language === 'es' ? 'Bancolombia' : 'Bank Transfer'}</span>
                    </button>
                  </div>

                  {/* PayPal Interactive Panel */}
                  {paymentMethod === 'paypal' && (
                    <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50/40 p-5 rounded-2xl border border-sky-200 text-xs text-sky-950 space-y-4 shadow-xs">
                      <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="font-black italic text-[#003087] text-lg">
                            Pay<span className="text-[#0079C1]">Pal</span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-600">· Enlace oficial de donación exterior</span>
                        </div>
                        <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                          {language === 'es' ? 'Pagos Seguros Internacionales' : 'International Secure Payments'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-slate-700 text-xs leading-relaxed">
                          {language === 'es'
                            ? 'Para realizar tu aporte desde el exterior mediante PayPal (saldo PayPal, Visa, Mastercard, American Express o Discover):'
                            : 'To donate from abroad via PayPal (PayPal balance, Visa, Mastercard, Amex, Discover):'}
                        </p>

                        <div className="bg-white p-4 rounded-xl border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {language === 'es' ? 'Portal de pago directo Fundación CINHARI:' : 'CINHARI Foundation Direct Checkout:'}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono break-all mt-0.5">
                              paypal.com/ncp/payment/NRG24JXPMWN9W
                            </div>
                          </div>

                          <a
                            href={PAYPAL_DONATION_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0079C1] hover:bg-[#00457C] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
                          >
                            <span>{language === 'es' ? 'Abrir Pasarela PayPal' : 'Open PayPal Checkout'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          {language === 'es'
                            ? 'ID de transacción de PayPal o correo con el que pagaste (Opcional, para emitir tu certificado):'
                            : 'PayPal Transaction ID or payment email (Optional, to generate your tax certificate):'}
                        </label>
                        <input
                          type="text"
                          placeholder={language === 'es' ? 'Ej. 9X1234567890 o tu-correo-paypal@email.com' : 'e.g. 9X1234567890'}
                          value={paypalTxId}
                          onChange={(e) => setPaypalTxId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sky-200 text-xs text-slate-800 font-mono"
                        />
                      </div>

                      <p className="text-[11px] text-slate-500">
                        {language === 'es'
                          ? 'Una vez realizado el pago en PayPal, pulsa "Confirmar Donación" abajo para recibir tu certificado digital de Fundación CINHARI.'
                          : 'After completing your PayPal payment, click "Confirm Donation" below to receive your official CINHARI Foundation certificate.'}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'pse' && (
                    <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-900">Pasarela PSE Colombia</span>
                        <span className="text-[10px] text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                          {language === 'es' ? 'Sin comisiones' : 'No fees'}
                        </span>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          {language === 'es' ? 'Selecciona tu banco:' : 'Select your bank:'}
                        </label>
                        <select
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800"
                        >
                          <option value="Bancolombia">Bancolombia</option>
                          <option value="Davivienda">Davivienda</option>
                          <option value="Banco de Bogotá">Banco de Bogotá</option>
                          <option value="BBVA Colombia">BBVA Colombia</option>
                          <option value="Banco de Occidente">Banco de Occidente</option>
                          <option value="Scotiabank Colpatria">Scotiabank Colpatria</option>
                          <option value="Banco Caja Social">Banco Caja Social</option>
                          <option value="Nequi (vía PSE)">Nequi (vía PSE)</option>
                          <option value="Daviplata (vía PSE)">Daviplata (vía PSE)</option>
                          <option value="Nu Colombia">Nu Colombia</option>
                          <option value="Lulo Bank">Lulo Bank</option>
                        </select>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {language === 'es'
                          ? 'Al confirmar, serás redirigido al portal oficial de PSE y tu entidad bancaria para autorizar la transacción de forma segura.'
                          : 'Upon confirmation, you will connect securely to PSE and your banking institution to authorize the payment.'}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'nequi' && (
                    <div className="bg-purple-50/80 p-4 rounded-2xl border border-purple-200 text-xs text-purple-950 space-y-2">
                      <div className="font-bold flex items-center justify-between">
                        <span>{language === 'es' ? 'Pago Directo por Nequi o Daviplata:' : 'Direct Nequi / Daviplata Transfer:'}</span>
                        <span className="text-[10px] bg-purple-200/60 px-2 py-0.5 rounded-full font-medium">
                          {language === 'es' ? 'Línea Oficial' : 'Official Line'}
                        </span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-purple-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-500">{language === 'es' ? 'Número celular / Llave:' : 'Mobile number / Key:'}</div>
                          <div className="text-lg font-bold font-mono text-purple-900">+57 314 367 4235</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500">{language === 'es' ? 'Titular:' : 'Account Holder:'}</div>
                          <div className="font-semibold text-slate-800">Fundación CINHARI</div>
                        </div>
                      </div>
                      <p className="text-[11px] text-purple-800">
                        {language === 'es'
                          ? 'Envía tu comprobante con el número de transacción para enviarte tu certificado de donación automático.'
                          : 'Send your transfer receipt to receive your official donation certificate automatically.'}
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          {language === 'es' ? 'Número de tarjeta (Débito o Crédito)' : 'Card Number (Debit or Credit)'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm font-mono"
                          />
                          <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            {language === 'es' ? 'Expiración (MM/AA)' : 'Expiration (MM/YY)'}
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="12/28"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            CVC / CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'transfer' && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
                      <p className="font-semibold text-slate-900">{language === 'es' ? 'Cuenta de Ahorros Bancolombia Oficial:' : 'Official Bancolombia Savings Account:'}</p>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">{language === 'es' ? 'Banco:' : 'Bank:'}</span>
                          <span className="font-semibold text-slate-800">Bancolombia ({language === 'es' ? 'Ahorros' : 'Savings'})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{language === 'es' ? 'Número de Cuenta:' : 'Account Number:'}</span>
                          <span className="font-mono font-bold text-teal-800 select-all">102-849201-44</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{language === 'es' ? 'Titular:' : 'Account Name:'}</span>
                          <span className="font-medium text-slate-800">Fundación CINHARI</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">{language === 'es' ? 'Licencia ICBF / Personería:' : 'Legal ID / Registration:'}</span>
                          <span className="font-medium text-slate-800">LF-3298</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {language === 'es' ? 'Concepto: Donación Salud Mental + Tu Cédula o NIT' : 'Reference: Mental Health Donation + ID / Tax ID'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    {language === 'es' ? 'Atrás' : 'Back'}
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{language === 'es' ? 'Procesando de forma segura...' : 'Processing securely...'}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>{language === 'es' ? 'Confirmar Donación' : 'Confirm Donation'} ({formatAmount(currentAmount)})</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && completedDonation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  {language === 'es' ? `¡Gracias de todo corazón, ${completedDonation.donorName}!` : `Thank you from the heart, ${completedDonation.donorName}!`}
                </h3>
                <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
                  {language === 'es' ? (
                    <>Tu donación de <strong>{formatAmount(completedDonation.amount, completedDonation.currency.includes('USD') ? 'USD' : 'COP')} ({completedDonation.frequency === 'monthly' ? 'Mensual' : 'Puntual'})</strong> ha sido registrada con éxito. Hemos enviado una copia del recibo y soporte a <strong>{completedDonation.email}</strong>.</>
                  ) : (
                    <>Your donation of <strong>{formatAmount(completedDonation.amount, completedDonation.currency.includes('USD') ? 'USD' : 'COP')} ({completedDonation.frequency === 'monthly' ? 'Monthly' : 'One-Time'})</strong> was processed successfully. A copy and confirmation have been sent to <strong>{completedDonation.email}</strong>.</>
                  )}
                </p>

                {/* Printable Certificate Card */}
                <div className="bg-[#f7faf9] rounded-2xl p-6 border border-teal-200 max-w-lg mx-auto text-left mb-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-teal-200/60 pb-3 mb-3">
                    <div>
                      <div className="text-xs font-bold uppercase text-teal-900">Fundación CINHARI · {language === 'es' ? 'Psicología Especializada' : 'Specialized Psychology'}</div>
                      <div className="text-[10px] text-slate-500">Sede Calle 17 A # 13-24 · Tel. 314 3674235 · {language === 'es' ? 'Certificado DIAN' : 'Official Certificate'}</div>
                    </div>
                    <div className="text-xs font-mono text-teal-700 bg-white px-2 py-1 rounded border border-teal-100">
                      {completedDonation.certificateId}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div>
                      <span className="text-slate-400">{language === 'es' ? 'Donante:' : 'Donor:'}</span>
                      <div className="font-semibold text-slate-800">{completedDonation.donorName}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">{language === 'es' ? 'Fecha:' : 'Date:'}</span>
                      <div className="font-semibold text-slate-800">{completedDonation.date}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">{language === 'es' ? 'Monto aportado:' : 'Amount Donated:'}</span>
                      <div className="font-bold text-teal-800 text-sm">{formatAmount(completedDonation.amount, completedDonation.currency.includes('USD') ? 'USD' : 'COP')}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">{language === 'es' ? 'Método utilizado:' : 'Payment Method:'}</span>
                      <div className="font-semibold text-slate-800 uppercase">
                        {completedDonation.paymentMethod === 'paypal' ? 'PayPal / Tarjeta Int.' : completedDonation.paymentMethod}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">{language === 'es' ? 'Descuento Renta DIAN:' : 'Tax Credit (DIAN):'}</span>
                      <div className="font-semibold text-emerald-700">
                        {formatAmount(completedDonation.amount * 0.25, completedDonation.currency.includes('USD') ? 'USD' : 'COP')} (25%)
                      </div>
                    </div>
                  </div>

                  {completedDonation.message && (
                    <div className="text-xs bg-white p-3 rounded-lg border border-teal-100 text-slate-600 italic">
                      "{completedDonation.message}"
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrintReceipt}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{language === 'es' ? 'Descargar / Imprimir Recibo' : 'Download / Print Receipt'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {language === 'es' ? 'Hacer otra donación' : 'Make Another Donation'}
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
