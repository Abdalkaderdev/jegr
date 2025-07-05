import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const testimonials = [
  {
    name: 'Ali Hassan',
    company: 'Baghdad Municipality',
    quote: 'Jegr Jalal delivered our project on time and exceeded our expectations. Highly recommended!',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Baghdad_Municipality_logo.png'
  },
  {
    name: 'Sara Ahmed',
    company: 'GreenScape',
    quote: 'Professional, reliable, and creative. Our landscaping has never looked better.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/GreenScape_logo.png'
  },
  {
    name: 'Omar Khalid',
    company: 'Iraq Roads Authority',
    quote: 'Their attention to detail and quality is unmatched in the industry.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Iraq_Roads_logo.png'
  }
];

const Testimonials: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="container-custom">
      <AnimatedSection animation="fade-in">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Our Clients Say</h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <picture>
                <source srcSet={t.logo.replace(/\.png$/, '.webp')} type="image/webp" />
                <source srcSet={t.logo.replace(/\.png$/, '.avif')} type="image/avif" />
                <img src={t.logo} alt={t.company} width={64} height={64} loading="lazy" className="h-16 w-16 object-contain mb-4" />
              </picture>
              <blockquote className="text-lg italic text-gray-700 mb-4">“{t.quote}”</blockquote>
              <div className="font-semibold text-orange-600">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.company}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials; 