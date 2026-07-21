import { useLanguage } from "@/context/LanguageContext";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Check } from "lucide-react";

export function Professionals() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1400&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider leading-tight mb-8">
            {t('professionals.hero.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('professionals.hero.body')}
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-destructive font-bold tracking-widest text-sm uppercase mb-4 block">
            {t('professionals.problem.label')}
          </span>
          <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-8 leading-tight">
            {t('professionals.problem.title')}
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('professionals.problem.body')}
          </p>
        </div>
      </section>

      {/* What We Help You Do */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading className="mb-16">{t('professionals.help.title')}</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t('professionals.help.cards').map((card: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex gap-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-2xl mb-3">{card.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-primary bg-gradient-to-br from-[#0B1B3F] to-[#1E3A6E]">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading className="mb-16 text-white">{t('about.faq.title')}</SectionHeading>
          <FAQAccordion items={t('faqProfessionals')} />
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 bg-white text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-primary uppercase tracking-wide leading-tight mb-10">
            {t('professionals.closing.title')}
          </h2>
          <CTAButton href="#footer" className="shadow-2xl">{t('professionals.closing.btn')}</CTAButton>
        </div>
      </section>
    </div>
  );
}