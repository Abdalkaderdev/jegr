import React from 'react';
import { Shield, Target, Users, Lightbulb, Award, MapPin, Phone, Mail } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import TeamSection from '../components/TeamSection';
import FAQSection from '../components/FAQSection';
import { FaLightbulb, FaIndustry, FaBuilding, FaAward } from 'react-icons/fa';
import interchangeImg from '../assets/Presentation - Google Chrome 7_4_2025 8_07_34 PM.png';
import heroImg from '../assets/IMG_5985.jpeg';

const AboutPage = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Shield,
      title: 'Strength',
      description: 'We build infrastructure that withstands time and serves communities for generations.'
    },
    {
      icon: Award,
      title: 'Elegance',
      description: 'Our designs combine functionality with aesthetic appeal, enhancing urban beauty.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Every project is executed with meticulous attention to detail and accuracy.'
    },
    {
      icon: Users,
      title: 'Trust',
      description: 'We build lasting relationships through transparency, reliability, and excellence.'
    }
  ];

  const timeline = [
    {
      year: '2007',
      title: 'Launch into the lighting and electrical installations business',
      description: 'Jegr Jalal began its journey, focusing on providing high-quality lighting and electrical installation services for a variety of projects across Iraq.'
    },
    {
      year: '2019',
      title: 'Entry into the field of manufacturing decorative and modern lighting poles',
      description: 'We expanded our expertise by establishing manufacturing capabilities for decorative and modern lighting poles, setting new standards in design and durability.'
    },
    {
      year: '2022',
      title: 'Adding general contracting and real estate investment activities',
      description: 'Our growth continued as we diversified into general contracting and real estate investment, broadening our impact on the construction industry.'
    },
    {
      year: '2024',
      title: 'Recognized as a development and consulting company for government projects',
      description: 'Jegr Jalal was recognized as a trusted development and consulting partner for major government projects, reflecting our commitment to excellence and innovation.'
    }
  ];

  const faqs = [
    {
      question: 'What types of construction services do you provide?',
      answer: 'We specialize in landscaping, road and traffic signs, stamped concrete, kerbstone & basalt work, lighting poles, and security booths. Our comprehensive services cover all aspects of urban infrastructure development.'
    },
    {
      question: 'Do you offer customized solutions for specific project needs?',
      answer: 'Absolutely. We work closely with each client to understand their unique requirements and develop tailored solutions that meet their specific needs, budget, and timeline.'
    },
    {
      question: 'Where do you manufacture your materials and components?',
      answer: 'We source high-quality materials from trusted suppliers and work with local manufacturers to ensure the best quality standards while supporting the local economy.'
    },
    {
      question: 'How can I get a quote for my construction project?',
      answer: 'Contact us through our website, phone, or visit our office. We provide free consultations and detailed quotes after assessing your project requirements.'
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary depending on scope and complexity. During our initial consultation, we provide realistic timelines and keep you updated throughout the construction process.'
    }
  ];

  // Define icons for values and journey
  const valueIcons = [
    FaAward, // Integrity
    FaLightbulb, // Innovation
    FaIndustry, // Quality
    FaBuilding, // Sustainability
  ];
  const journeyIcons = [
    FaLightbulb,
    FaIndustry,
    FaBuilding,
    FaAward,
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImg})`
        }}
      >
        <div className="absolute inset-0 bg-black/70" style={{background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5))'}}></div>
        <div className="container-custom text-center relative z-10">
          <AnimatedSection animation="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">{t('aboutPage.title')}</h1>
            <p className="text-xl md:text-2xl font-medium text-orange-200 mb-6 drop-shadow-lg">{t('homepage.heroSubtitle')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('aboutPage.visionTitle')}</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t('aboutPage.visionText')}
                </p>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('aboutPage.missionTitle')}</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t('aboutPage.missionText')}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="relative image-hover-zoom rounded-lg overflow-hidden shadow-xl">
                <picture>
                  <source srcSet={interchangeImg.replace(/\.(png|jpeg|jpg)$/, '.webp')} type="image/webp" />
                  <source srcSet={interchangeImg.replace(/\.(png|jpeg|jpg)$/, '.avif')} type="image/avif" />
                  <img src={interchangeImg} alt="Aerial view of a highway interchange at night" width={800} height={600} loading="lazy" className="w-full h-full object-cover" />
                </picture>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('aboutPage.valuesTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('aboutPage.valuesDesc')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(t('aboutPage.values', { returnObjects: true }) as Array<{title: string, description: string}>).map((value, index) => {
              const IconComponent = valueIcons[index];
              return (
                <AnimatedSection 
                  key={index} 
                  animation="scale-in" 
                  delay={index * 100}
                >
                  <div className="text-center group">
                    <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('aboutPage.journeyTitle')}</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {t('aboutPage.journeyDesc')}
            </p>
          </div>
          <div className="relative">
            {/* Central vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200 z-0"></div>
            <div className="space-y-16">
              {(t('aboutPage.journey', { returnObjects: true }) as Array<{year: string, title: string, description: string}>).map((item, idx) => (
                <div
                  key={item.year}
                  className={`
                    relative flex items-center mb-16 z-10
                    ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
                    group
                  `}
                >
                  {/* Content box */}
                  <div className={`w-1/2 flex justify-center max-md:w-full max-md:justify-center`}>
                    <div className={`bg-white p-8 rounded-lg shadow-lg border border-gray-100 max-w-md w-full
                      ${idx % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'} animate-scale-in
                    `}>
                      <div className="flex items-center mb-2 justify-center">
                        <span className="animate-fade-in-stagger" style={{ '--delay': '0ms' } as React.CSSProperties}>{React.createElement(journeyIcons[idx])}</span>
                        <span className="ml-3 text-2xl font-bold text-orange-600 animate-fade-in-stagger" style={{ '--delay': '100ms' } as React.CSSProperties}>{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center animate-fade-in-stagger" style={{ '--delay': '200ms' } as React.CSSProperties}>{item.title}</h3>
                      <p className="text-gray-700 text-center animate-fade-in-stagger" style={{ '--delay': '300ms' } as React.CSSProperties}>{item.description}</p>
                    </div>
                  </div>
                  {/* Timeline dot with pulse animation */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg z-20 flex items-center justify-center animate-pulse-dot">
                    {React.createElement(journeyIcons[idx])}
                  </div>
                  {/* Spacer for alignment on desktop */}
                  <div className="w-1/2 max-md:hidden"></div> {/* Only show spacer on desktop */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Stats Section */}
      <section className="py-20 bg-orange-600">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div className="group">
              <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">322</div>
              <div className="text-orange-100 group-hover:text-white transition-colors duration-300">{t('aboutPage.stats.completed')}</div>
            </div>
            <div className="group">
              <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">17</div>
              <div className="text-orange-100 group-hover:text-white transition-colors duration-300">{t('aboutPage.stats.cities')}</div>
            </div>
            <div className="group">
              <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">64</div>
              <div className="text-orange-100 group-hover:text-white transition-colors duration-300">{t('aboutPage.stats.team')}</div>
            </div>
            <div className="group">
              <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div className="text-orange-100 group-hover:text-white transition-colors duration-300">{t('aboutPage.stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;