import { useLanguage } from "@/context/LanguageContext";
import { CTAButton } from "@/components/CTAButton";

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&fit=crop"
];

export function Blogs() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-primary text-white py-24 text-center">
        <h1 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-widest">
          {t('blogs.title')}
        </h1>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t('blogs.posts').map((post: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col group">
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img 
                    src={BLOG_IMAGES[i]} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-extrabold text-2xl text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  <CTAButton variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white mt-auto self-start">
                    {t('blogs.readMore')}
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}