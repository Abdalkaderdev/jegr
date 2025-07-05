import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Clock, CheckCircle, Hammer, Lightbulb, RailSymbol, Home, MapPin, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import { ServiceCard, ProjectCard } from '../components/ui/Card';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import ProjectGallery from '../components/ProjectGallery';
import StickyCTA from '../components/StickyCTA';
import Alramadi from '../assets/Alramadi.png';
import WhoWeAre from '../assets/who we are.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import HeroProjectImg from '../assets/IMG_6001.png';
import FutreImg from '../assets/futre.png';
import ZaitonPlusImg from '../assets/zaiton plus.png';
import EmpireImg from '../assets/empire.png';
import ferdawsImg from '../assets/ferdaws.png';
import goldenImg from '../assets/golden.png';
import muhanadImg from '../assets/muhanad.png';
import parkImg from '../assets/park.png';
import frenchImg from '../assets/french.png';

const HomePage = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState<any[]>([]);
  // Static featured projects data
  const featuredProjects = [
    {
      image: FutreImg,
      title: 'Future City',
      description: 'A landmark urban development in Erbil, Kurdistan, Iraq, featuring innovative lighting and landscape solutions.',
      category: 'Urban Development',
      location: 'Erbil, Kurdistan, Iraq',
      duration: '2024',
    },
    {
      image: ZaitonPlusImg,
      title: 'Zaiton Plus',
      description: 'A modern residential project in Erbil, Kurdistan, Iraq, with advanced street lighting and landscaping.',
      category: 'Residential',
      location: 'Erbil, Kurdistan, Iraq',
      duration: '2023',
    },
    {
      image: EmpireImg,
      title: 'Empire World',
      description: 'A prestigious mixed-use development in Erbil, Kurdistan, Iraq, known for its iconic lighting and urban design.',
      category: 'Mixed-Use',
      location: 'Erbil, Kurdistan, Iraq',
      duration: '2022',
    },
  ];

  useEffect(() => {
    fetch('/api/services').then((res) => res.json())
      .then((servicesData) => setServices(servicesData))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Swiper
          loop={true}
          className="w-full h-full"
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${Alramadi})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }} />
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 flex flex-col items-center justify-center h-[70vh] md:h-[80vh]">
                <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 leading-tight">{t('homepage.heroTitle')}</h1>
                <p className="hero-text-delay text-xl md:text-2xl mb-8 font-light">{t('homepage.heroSubtitle')}</p>
                <div className="hero-button">
                  <Button 
                    as={Link}
                    to="/services"
                    variant="primary"
                    size="large"
                    icon={ArrowRight}
                    className="shadow-construction group"
                  >
                    {t('homepage.heroCTA')}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)), url(${HeroProjectImg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }} />
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 flex flex-col items-center justify-center h-[70vh] md:h-[80vh]">
                <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 leading-tight">{t('homepage.projectsTitle')}</h1>
                <p className="hero-text-delay text-xl md:text-2xl mb-8 font-light">{t('homepage.projectsDesc')}</p>
                <div className="hero-button">
                  <Button 
                    as={Link}
                    to="/projects"
                    variant="primary"
                    size="large"
                    icon={ArrowRight}
                    className="shadow-construction group"
                  >
                    {t('homepage.projectsCTA')}
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('homepage.aboutTitle')}</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t('homepage.aboutText1')}
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t('homepage.aboutText2')}
                </p>
                <div className="text-2xl font-bold text-gradient mb-6">
                 {t('homepage.aboutSlogan2')}
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center group">
                    <Users className="h-8 w-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{t('footer.company')}</div>
                  </div>
                  <div className="text-center group">
                    <Award className="h-8 w-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{t('homepage.servicesTitle')}</div>
                  </div>
                  <div className="text-center group">
                    <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">{t('homepage.projectsTitle')}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="relative image-hover-zoom rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={WhoWeAre}
                  alt="Who We Are - Jegr Jalal Team at Work"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom px-4">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('homepage.servicesSectionTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('homepage.servicesSectionDesc')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection animation="scale-in" delay={0}>
              <ServiceCard
                icon={<Hammer className="w-7 h-7 text-orange-600" />} 
                title={t('homepage.service1Title')}
                description={t('homepage.service1Desc')}
              />
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={100}>
              <ServiceCard
                icon={<Lightbulb className="w-7 h-7 text-orange-600" />} 
                title={t('homepage.service2Title')}
                description={t('homepage.service2Desc')}
              />
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={200}>
              <ServiceCard
                icon={<RailSymbol className="w-7 h-7 text-orange-600" />} 
                title={t('homepage.service3Title')}
                description={t('homepage.service3Desc')}
              />
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={300}>
              <ServiceCard
                icon={<Award className="w-7 h-7 text-orange-600" />} 
                title={t('homepage.service4Title')}
                description={t('homepage.service4Desc')}
              />
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={400}>
              <ServiceCard
                icon={<Home className="w-7 h-7 text-orange-600" />} 
                title={t('homepage.service5Title')}
                description={t('homepage.service5Desc')}
              />
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={500}>
              <ServiceCard
                icon={<Users className="w-7 h-7 text-orange-600" />} 
                title={t('homepage.service6Title')}
                description={t('homepage.service6Desc')}
              />
            </AnimatedSection>
          </div>

          <AnimatedSection animation="fade-in" delay={600}>
            <div className="text-center mt-12">
              <Button 
                as={Link}
                to="/services"
                variant="primary"
                icon={ArrowRight}
                className="group"
              >
                {t('homepage.servicesSectionButton')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Do Clients Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('homepage.whyChooseTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('homepage.whyChooseDesc')}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection animation="scale-in" delay={0}>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[320px]">
                <Award className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('homepage.whyChoose1Title')}</h3>
                <p className="text-gray-600">{t('homepage.whyChoose1Desc')}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={100}>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[320px]">
                <Lightbulb className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('homepage.whyChoose2Title')}</h3>
                <p className="text-gray-600">{t('homepage.whyChoose2Desc')}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={200}>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[320px]">
                <CheckCircle className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('homepage.whyChoose3Title')}</h3>
                <p className="text-gray-600">{t('homepage.whyChoose3Desc')}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={300}>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[320px]">
                <MapPin className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('homepage.whyChoose4Title')}</h3>
                <p className="text-gray-600">{t('homepage.whyChoose4Desc')}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale-in" delay={400}>
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center justify-center min-h-[320px]">
                <Shield className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('homepage.whyChoose5Title')}</h3>
                <p className="text-gray-600">{t('homepage.whyChoose5Desc')}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('homepage.featuredProjectsTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('homepage.featuredProjectsDesc')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <picture>
                  <source srcSet={EmpireImg.replace(/\.png$/, '.webp')} type="image/webp" />
                  <source srcSet={EmpireImg.replace(/\.png$/, '.avif')} type="image/avif" />
                  <img src={EmpireImg} alt="Empire World" width={400} height={200} loading="lazy" className="w-full h-full object-cover" />
                </picture>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Empire World</h3>
                <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">Erbil, Kurdistan - Iraq</span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img src={ferdawsImg} alt="Ferdaws City" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ferdaws City</h3>
                <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">Erbil, Kurdistan - Iraq</span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img src={FutreImg} alt="Future City" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Future City</h3>
                <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">Erbil, Kurdistan - Iraq</span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img src={frenchImg} alt="French Village" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">French Village</h3>
                <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">Duhok, Kurdistan - Iraq</span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img src={parkImg} alt="Park Sami Abdulrahman" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Park Sami Abdulrahman</h3>
                <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">Erbil, Kurdistan - Iraq</span>
              </div>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img src={ZaitonPlusImg} alt="Zaiton Plus" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Zaiton Plus</h3>
                <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">Erbil, Kurdistan - Iraq</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-4xl font-bold mb-6">{t('homepage.contactTitle')}</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {t('homepage.contactDesc')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="bg-white rounded-lg p-6 text-gray-900 shadow-xl">
                <h3 className="text-2xl font-semibold mb-6">{t('contactPage.form.formTitle')}</h3>
                <p className="text-gray-600 mb-6">{t('contactPage.form.formTitleMessage')}</p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-input"
                      placeholder={t('contactPage.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      placeholder={t('contactPage.form.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-input"
                      placeholder={t('contactPage.form.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contactPage.form.message')}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="form-textarea"
                      placeholder={t('contactPage.form.messagePlaceholder')}
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full group"
                  >
                    {t('contactPage.form.submit')}
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Sticky CTA Button */}
      <StickyCTA />
    </>
  );
};

export default HomePage;