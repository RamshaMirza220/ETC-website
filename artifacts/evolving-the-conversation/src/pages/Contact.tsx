import { Mail, MapPin, Phone, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";

const contactDetails = [
  {
    key: "phone",
    icon: Phone,
    value: "+507 6207-0905",
    href: "tel:+50762070905",
  },
  {
    key: "email",
    icon: Mail,
    value: "hello@evolvingtheconversation.com",
    href: "mailto:hello@evolvingtheconversation.com",
  },
  {
    key: "address",
    icon: MapPin,
    value: "4517 Washington Ave. Manchester, Kentucky 39495",
    href: undefined,
  },
] as const;

export function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1B3F] via-[#13284F] to-[#1E3A6E] px-4 pb-24 pt-20 text-white sm:px-6 lg:px-8">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-16 h-64 w-64 rounded-full border border-white/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#4FA3E3]">
            {t("contact.eyebrow")}
          </p>
          <h1 className="font-heading text-4xl font-black uppercase leading-tight tracking-wider md:text-6xl">
            {t("contact.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
            {t("contact.intro")}
          </p>
        </div>
      </section>

      <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto -mt-10 max-w-5xl">
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-3">
            {contactDetails.map(({ key, icon: Icon, value, href }) => {
              const content = (
                <>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#4FA3E3]/10 text-[#4FA3E3]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    {t(`contact.${key}Label`)}
                  </p>
                  <p className="break-words text-sm font-semibold leading-relaxed text-primary">
                    {value}
                  </p>
                </>
              );

              return href ? (
                <a
                  key={key}
                  href={href}
                  className="group border-b border-gray-100 p-8 transition-colors hover:bg-gray-50 md:border-b-0 md:border-r"
                >
                  {content}
                </a>
              ) : (
                <div key={key} className="border-b border-gray-100 p-8 md:border-b-0">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="mx-auto max-w-2xl py-16 text-center">
            <p className="text-base leading-relaxed text-gray-600">
              {t("contact.responseNote")}
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-heading text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("contact.backHome")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}