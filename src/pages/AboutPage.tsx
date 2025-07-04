import React from 'react';
import { Shield, Target, Users, Lightbulb, Award, MapPin, Phone, Mail } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import TeamSection from '../components/TeamSection';
import FAQSection from '../components/FAQSection';

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
      year: '2015',
      title: 'Company Founded',
      description: 'Jegr Jalal Company established with a vision to transform Iraqi infrastructure.'
    },
    {
      year: '2017',
      title: 'First Major Project',
      description: 'Completed our first large-scale road development project in Tikrit.'
    },
    {
      year: '2019',
      title: 'Service Expansion',
      description: 'Added landscaping and decorative concrete services to our portfolio.'
    },
    {
      year: '2021',
      title: 'Technology Integration',
      description: 'Incorporated modern lighting and security solutions into our offerings.'
    },
    {
      year: '2024',
      title: 'Regional Leadership',
      description: 'Became one of Iraq\'s leading construction and infrastructure companies.'
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

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600)'
        }}
      >
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-in">
            <h1 className="text-4xl font-bold mb-4 text-orange-600">{t('about.title')}</h1>
            <p className="text-lg font-bold text-orange-500 mb-6 tracking-widest">High Quality. Guarantee. Excellent Local Manufacturer</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
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
                <img 
                  src="https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt={t('aboutPage.imageAlt')}
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide every project and decision we make.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
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

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Key milestones in our company's growth and development.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200"></div>
            
            {timeline.map((item, index) => (
              <AnimatedSection 
                key={index} 
                animation="fade-in" 
                delay={index * 150}
              >
                <div className={`timeline-item relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-lg hover:scale-125 transition-transform duration-300"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your next construction or infrastructure project. 
              Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2 text-white group">
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-orange-200 transition-colors duration-300">+964 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-white group">
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-orange-200 transition-colors duration-300">info@jegrjalal.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-white group">
                <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-orange-200 transition-colors duration-300">Baghdad, Iraq</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Contact & Location</h2>
          <div className="flex flex-col items-center space-y-2 text-lg text-gray-700">
            <span><strong>Phone:</strong> <a href="tel:07715554224" className="underline hover:text-orange-500">0771 555 4224</a>, <a href="tel:07505554243" className="underline hover:text-orange-500">0750 555 4243</a></span>
            <span><strong>Location:</strong> IRAQ- KRG - ERBIL 100M ROAD - OPPOSITE TO ERBIL INTERNATIONAL AIRPORT</span>
            <span><strong>Email:</strong> <a href="mailto:CONTACT@JEGRJALALCOMPANY.COM" className="underline hover:text-orange-500">CONTACT@JEGRJALALCOMPANY.COM</a></span>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;