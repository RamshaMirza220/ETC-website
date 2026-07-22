// TODO: Replace mock payment simulation with real Stripe Checkout / Payment Intents integration.
// Requires STRIPE_SECRET_KEY (backend) and STRIPE_PUBLISHABLE_KEY (frontend) once PM provides Stripe account credentials.
// Currently simulates success after a fake delay — no real charge occurs.

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, CheckCircle, Loader2, Lock } from "lucide-react";
import { useLocation } from "wouter";

interface Pkg {
  name: string;
  freq: string;
  price: string;
  priceNum: number;
  subtotal: string;
  itbms: string;
}

interface Props {
  pkg: Pkg;
  onClose: () => void;
}

type Screen = "form" | "processing" | "success";

function formatCardNumber(val: string) {
  return val
    .replace(/\D/g, "")
    .substring(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, "").substring(0, 4);
  if (digits.length >= 3) return digits.substring(0, 2) + " / " + digits.substring(2);
  return digits;
}

function formatCVC(val: string) {
  return val.replace(/\D/g, "").substring(0, 3);
}

export function CheckoutModal({ pkg, onClose }: Props) {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [screen, setScreen] = useState<Screen>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const overlayRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Required";
    if (!email.trim() || !email.includes("@")) e.email = "Valid email required";
    if (cardNumber.replace(/\s/g, "").length < 16) e.card = "Enter a 16-digit card number";
    if (expiry.replace(/\s/g, "").replace("/", "").length < 4) e.expiry = "Enter MM / YY";
    if (cvc.length < 3) e.cvc = "Enter 3 digits";
    return e;
  };

  const handlePay = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setScreen("processing");
    // Simulate network delay — no real charge occurs
    setTimeout(() => setScreen("success"), 1800);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current && screen !== "processing") onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">

        {/* — — — PROCESSING SCREEN — — — */}
        {screen === "processing" && (
          <div className="flex flex-col items-center justify-center py-24 px-8 gap-5">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <p className="text-primary font-heading font-bold text-lg text-center">
              {t('checkout.processing')}
            </p>
          </div>
        )}

        {/* — — — SUCCESS SCREEN — — — */}
        {screen === "success" && (
          <div className="flex flex-col items-center text-center py-12 px-8 gap-5">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <h2 className="font-heading font-black text-2xl text-primary uppercase tracking-wide">
              {t('checkout.successTitle')}
            </h2>

            {/* Order recap */}
            <div className="w-full bg-gray-50 rounded-xl p-4 text-left border border-gray-100 text-sm space-y-1.5">
              <p className="font-bold text-primary">{pkg.name}</p>
              <p className="text-gray-500">{pkg.freq}</p>
              <div className="border-t border-gray-200 my-2" />
              <div className="flex justify-between text-gray-600"><span>{t('checkout.subtotal')}</span><span>{pkg.subtotal}</span></div>
              <div className="flex justify-between text-gray-600"><span>{t('checkout.itbms')}</span><span>{pkg.itbms}</span></div>
              <div className="flex justify-between font-bold text-primary text-base mt-1"><span>{t('checkout.total')}</span><span>{pkg.price} USD</span></div>
            </div>

            <p className="text-gray-500 text-sm">
              {t('checkout.successNote')} <span className="font-semibold text-primary">{email}</span>.
            </p>

            <button
              onClick={() => { onClose(); navigate("/"); }}
              className="mt-2 w-full py-3.5 rounded-xl bg-primary text-white font-heading font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              {t('checkout.backHome')}
            </button>
          </div>
        )}

        {/* — — — CHECKOUT FORM — — — */}
        {screen === "form" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="font-heading font-black text-lg text-primary uppercase tracking-wide">
                {t('checkout.title')}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label={t('checkout.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {t('checkout.orderSummary')}
                </p>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-primary text-sm">{pkg.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{pkg.freq}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{t('checkout.participant')}</p>
                  </div>
                  <span className="font-heading font-black text-primary text-lg">{pkg.price}</span>
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 space-y-1 text-xs text-gray-500">
                  <div className="flex justify-between"><span>{t('checkout.subtotal')}</span><span>{pkg.subtotal}</span></div>
                  <div className="flex justify-between"><span>{t('checkout.itbms')}</span><span>{pkg.itbms}</span></div>
                  <div className="flex justify-between font-bold text-primary text-sm mt-1">
                    <span>{t('checkout.total')}</span>
                    <span>{pkg.price} USD</span>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {t('checkout.fullName')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('checkout.fullNamePlaceholder')}
                    className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors focus:border-accent ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-accent'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {t('checkout.email')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('checkout.emailPlaceholder')}
                    className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-accent'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Card Details</p>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">{t('checkout.cardNumber')}</label>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${errors.card ? 'border-red-400' : 'border-gray-200 focus-within:border-accent'}`}>
                    {/* Card icon */}
                    <svg className="w-8 h-5 flex-shrink-0 opacity-60" viewBox="0 0 32 20" fill="none">
                      <rect width="32" height="20" rx="3" fill="#1A1F71"/>
                      <rect y="5" width="32" height="5" fill="#F7B600"/>
                    </svg>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder={t('checkout.cardNumberPlaceholder')}
                      className="flex-1 outline-none text-sm bg-transparent"
                    />
                  </div>
                  {errors.card && <p className="text-red-500 text-xs mt-1">{errors.card}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">{t('checkout.expiry')}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))}
                      placeholder={t('checkout.expiryPlaceholder')}
                      className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors ${errors.expiry ? 'border-red-400' : 'border-gray-200 focus:border-accent'}`}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">{t('checkout.cvc')}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cvc}
                      onChange={e => setCvc(formatCVC(e.target.value))}
                      placeholder={t('checkout.cvcPlaceholder')}
                      className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors ${errors.cvc ? 'border-red-400' : 'border-gray-200 focus:border-accent'}`}
                    />
                    {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                className="w-full py-4 rounded-xl bg-accent text-white font-heading font-black text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Lock className="w-4 h-4" />
                {t('checkout.payBtn')} {pkg.price} USD
              </button>

              {/* Stripe Badge */}
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs pb-2">
                {/* Stripe wordmark SVG */}
                <svg className="h-4 opacity-60" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.45 9.87C5.45 8.73 6.37 8.28 7.85 8.28C9.99 8.28 12.68 8.94 14.82 10.1V4.65C12.5 3.74 10.2 3.37 7.85 3.37C3.13 3.37 0 5.88 0 10.16C0 16.9 9.3 15.84 9.3 18.74C9.3 20.08 8.17 20.53 6.6 20.53C4.27 20.53 1.29 19.58 -0.99 18.24V23.75C1.52 24.8 4.07 25.25 6.6 25.25C11.43 25.25 14.75 22.81 14.75 18.48C14.73 11.21 5.45 12.47 5.45 9.87Z" fill="#635BFF"/>
                  <path d="M31.91 3.85L31.31 6.65C29.97 6.05 28.42 5.73 26.98 5.73C25.15 5.73 24.18 6.38 24.18 7.38C24.18 10.03 32.5 9.05 32.5 15.68C32.5 19.98 29.14 22.03 24.83 22.03C22.62 22.03 20.52 21.58 18.59 20.7L19.19 17.76C21.16 18.82 23.27 19.38 25.25 19.38C27.28 19.38 28.37 18.66 28.37 17.5C28.37 14.61 20.05 15.77 20.05 9.27C20.05 5.3 23.2 3.07 27.53 3.07C29.23 3.07 30.79 3.37 31.91 3.85Z" fill="#635BFF"/>
                  <path d="M34.06 3.44H38.67L39.35 0H43.93L43.25 3.44H47.68L46.94 7.04H42.51L41.19 13.74C40.95 14.95 41.37 15.54 42.47 15.54C43.17 15.54 43.97 15.34 44.72 14.97L43.93 18.56C42.87 19.05 41.61 19.3 40.22 19.3C37.38 19.3 35.93 17.86 36.41 15.18L37.84 7.04H34.82L34.06 3.44Z" fill="#635BFF"/>
                  <path d="M48.12 3.44H52.54L49.14 19.1H44.72L48.12 3.44ZM50.06 0C48.54 0 47.36 1.07 47.36 2.47C47.36 3.86 48.54 4.93 50.06 4.93C51.59 4.93 52.77 3.86 52.77 2.47C52.77 1.07 51.59 0 50.06 0Z" fill="#635BFF"/>
                  <path d="M60 3.44L59.17 7.44C58.49 7.04 57.67 6.82 56.79 6.82C55.26 6.82 53.92 7.72 53.37 9.05L51.45 19.1H47.03L50.43 3.44H54.61L54.09 5.8C55 4.25 56.48 3.26 58.22 3.26C58.84 3.26 59.46 3.35 60 3.44Z" fill="#635BFF"/>
                </svg>
                <span>{t('checkout.stripeNote')}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
