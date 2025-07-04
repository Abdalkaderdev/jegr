import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Clock, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { ServiceCard, ProjectCard } from '../components/ui/Card';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import ProjectGallery from '../components/ProjectGallery';
import StickyCTA from '../components/StickyCTA';
import Alramadi from '../assets/Alramadi.png';

const HomePage = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/services').then((res) => res.json()),
      fetch('/api/projects').then((res) => res.json()),
    ])
      .then(([servicesData, projectsData]) => {
        setServices(servicesData);
        setProjects(projectsData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load content');
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="hero-background absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Alramadi})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('homepage.heroTitle')}
          </h1>
          <p className="hero-text-delay text-xl md:text-2xl mb-8 font-light">
            {t('homepage.heroSubtitle')}
          </p>
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
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
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
                 High Quality. Guarantee. Excellent Local Manufacturer
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
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Construction team at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('homepage.servicesTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('homepage.servicesDesc')}
              </p>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service: any, index: number) => (
                <AnimatedSection 
                  key={service.id}
                  animation="scale-in" 
                  delay={index * 100}
                >
                  <ServiceCard
                    icon={null}
                    title={service.name}
                    description={service.description}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection animation="fade-in" delay={600}>
            <div className="text-center mt-12">
              <Button 
                as={Link}
                to="/services"
                variant="primary"
                icon={ArrowRight}
                className="group"
              >
                {t('homepage.servicesCTA')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('homepage.projectsTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('homepage.projectsDesc')}
              </p>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project: any, index: number) => (
                <AnimatedSection 
                  key={project.id}
                  animation="fade-in" 
                  delay={index * 150}
                >
                  <ProjectCard
                    image={project.imageUrl}
                    title={project.name}
                    description={project.description}
                    category={project.category}
                    location={project.location}
                    duration={project.duration}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection animation="fade-in" delay={500}>
            <div className="text-center mt-12">
              <Button 
                as={Link}
                to="/projects"
                variant="primary"
                icon={ArrowRight}
                className="group"
              >
                {t('homepage.projectsCTA')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Blog/News Section */}
      <BlogSection />

      {/* Project Gallery Section */}
      <ProjectGallery />

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-4xl font-bold mb-6">{t('homepage.contactTitle')}</h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {t('homepage.contactDesc')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="group-hover:text-orange-300 transition-colors duration-300">{t('homepage.contactFeature1')}</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="group-hover:text-orange-300 transition-colors duration-300">{t('homepage.contactFeature2')}</span>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="group-hover:text-orange-300 transition-colors duration-300">{t('homepage.contactFeature3')}</span>
                  </div>
                </div>
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