import { useLanguage } from "@/context/LanguageContext";
import { CTAButton } from "@/components/CTAButton";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQAccordion } from "@/components/FAQAccordion";

export function Companies() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider leading-tight mb-8 drop-shadow-lg">
            {t('companies.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl leading-relaxed drop-shadow-md">
            {t('companies.hero.body')}
          </p>
        </div>
      </section>

      {/* Problem / Offer Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Problem */}
            <div className="flex flex-col gap-6">
              <span className="text-destructive font-bold tracking-widest text-sm uppercase">{t('companies.problem.labelProblem')}</span>
              <h3 className="font-heading font-extrabold text-3xl text-primary leading-tight">
                {t('companies.problem.titleProblem')}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('companies.problem.bodyProblem')}
              </p>
            </div>
            
            {/* Offer */}
            <div className="flex flex-col gap-6 p-10 bg-primary/5 border border-primary/10 rounded-3xl">
              <span className="text-accent font-bold tracking-widest text-sm uppercase">{t('companies.problem.labelOffer')}</span>
              <h3 className="font-heading font-extrabold text-3xl text-primary leading-tight">
                {t('companies.problem.titleOffer')}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('companies.problem.bodyOffer')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-primary bg-gradient-to-br from-[#0B1B3F] to-[#1E3A6E]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading className="mb-16 text-white">{t('about.faq.title')}</SectionHeading>
          <FAQAccordion items={t('faqShared')} />
        </div>
      </section>

      {/* Closing Banner */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide leading-tight mb-10">
            {t('companies.closing.title')}
          </h2>
          <CTAButton href="/companies/program">{t('companies.closing.btn')}</CTAButton>
        </div>
      </section>
    </div>
  );
}