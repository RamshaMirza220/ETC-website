// Placeholder legal content — must be reviewed and finalized by a legal professional before launch.

import { useLanguage } from "@/context/LanguageContext";

export function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Page Title */}
        <h1 className="font-heading font-black text-4xl md:text-5xl text-primary mb-12 leading-tight">
          {t('privacy.title')}
        </h1>

        {/* Legal Disclaimer */}
        <section className="mb-10">
          <h3 className="font-heading font-bold text-lg text-gray-500 uppercase tracking-widest mb-4">
            {t('privacy.disclaimerHeading')}
          </h3>
          <p className="font-body text-gray-700 leading-relaxed text-base">
            {t('privacy.disclaimerBody')}
          </p>
        </section>

        <hr className="border-gray-200 mb-10" />

        {/* Basics */}
        <section className="mb-10">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-primary mb-6">
            {t('privacy.basicsHeading')}
          </h2>
          <p className="font-body text-gray-700 leading-relaxed text-base mb-4">
            {t('privacy.basicsP1')}
          </p>
          <p className="font-body text-gray-700 leading-relaxed text-base">
            {t('privacy.basicsP2')}
          </p>
        </section>

        <hr className="border-gray-200 mb-10" />

        {/* What to Include */}
        <section className="mb-16">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-primary mb-6">
            {t('privacy.includesHeading')}
          </h2>
          <p className="font-body text-gray-700 leading-relaxed text-base mb-4">
            {t('privacy.includesP1')}
          </p>
          <p className="font-body text-gray-700 leading-relaxed text-base">
            {t('privacy.includesP2')}
          </p>
        </section>

      </div>
    </div>
  );
}
