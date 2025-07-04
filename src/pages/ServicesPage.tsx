import React, { useEffect, useState } from 'react';
import { Trees, Loader as Road, Building, CheckCircle, Zap, ShieldCheck, ArrowRight, Star, Lamp, Landmark, Trash2, Award, Users, Sun, Umbrella, Gamepad2, Shield, TrafficCone, RailSymbol, Home } from 'lucide-react';
import { ServiceCard } from '../components/ui/Card';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import ServiceDetailsModal from '../components/ServiceDetailsModal';
import servicesCategories from '../data/servicesCategories.json';
import { Link } from 'react-router-dom';
import streetLight from '../assets/street-light.png';
import treesIcon from '../assets/trees.png';
import benchIcon from '../assets/bench.png';
import bronzeIcon from '../assets/bronze.png';
import stallIcon from '../assets/stall.png';
import railingIcon from '../assets/railing.png';
import signIcon from '../assets/sign.png';
import signalIcon from '../assets/signal.png';
import lightPoleBannerIcon from '../assets/light-pole-banner.png';
import industrialBasaltIcon from '../assets/ChatGPT Image Jul 4, 2025, 05_54_34 PM.png';
import HeroServiceImg from '../assets/IMG_6097.jpeg';

export const iconMap: Record<string, React.ReactNode> = {
  // Main categories
  'Light Poles': <img src={streetLight} alt="Light Poles" className="h-6 w-6 inline-block mr-2" />,
  'Landscape': <Trees className="h-6 w-6 text-orange-600 inline-block mr-2" />,
  'Urban Design': <Landmark className="h-6 w-6 text-orange-600 inline-block mr-2" />,
  // Subcategories
  'Decorative Light Poles': <img src={lightPoleBannerIcon} alt="Decorative Light Poles" className="h-5 w-5 inline-block mr-2" />,
  'Modern Light Poles': <img src={streetLight} alt="Modern Light Poles" className="h-5 w-5 inline-block mr-2" />,
  'Landscaping': <img src={treesIcon} alt="Landscaping" className="h-5 w-5 inline-block mr-2" />,
  'Benches': <img src={benchIcon} alt="Benches" className="h-5 w-5 inline-block mr-2" />,
  'Trash Cans': <Trash2 className="h-5 w-5 text-orange-400 inline-block mr-2" />,
  'Stamp Concrete': <img src={bronzeIcon} alt="Stamp Concrete" className="h-5 w-5 inline-block mr-2" />,
  'Industrial Basalt': <img src={industrialBasaltIcon} alt="Industrial Basalt" className="h-5 w-5 inline-block mr-2" />,
  'Kerb Stone': <img src={bronzeIcon} alt="Kerb Stone" className="h-5 w-5 inline-block mr-2" />,
  'Booths': <img src={stallIcon} alt="Booths" className="h-5 w-5 inline-block mr-2" />,
  'Games and Outdoor Training Equipment': <Gamepad2 className="h-5 w-5 text-orange-400 inline-block mr-2" />,
  'Shades': <Umbrella className="h-5 w-5 text-orange-400 inline-block mr-2" />,
  'Guard Rail': <img src={railingIcon} alt="Guard Rail" className="h-5 w-5 inline-block mr-2" />,
  'Road Signs': <img src={signIcon} alt="Road Signs" className="h-5 w-5 inline-block mr-2" />,
  'Traffic Lights': <img src={signalIcon} alt="Traffic Lights" className="h-5 w-5 inline-block mr-2" />,
};

const ServicesPage = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load services');
        setLoading(false);
      });
  }, []);

  // Generate unique categories from services data
  const categories = ['All', ...Array.from(new Set(services.map((s: any) => s.category).filter(Boolean)))];

  // Filter services by search and category
  const filteredServices = services.filter((service: any) =>
    (category === 'All' || service.category === category) &&
    (service.name.toLowerCase().includes(search.toLowerCase()) ||
     service.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-24 min-h-[400px] md:min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${HeroServiceImg})`
        }}
      >
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('servicesPage.heroTitle')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('servicesPage.heroDesc')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="bg-white py-6">
        <div className="container-custom flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input w-full md:w-1/3"
            aria-label="Search services"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="form-input w-full md:w-1/4"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Structured Categories List */}
      <section className="py-10 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">Service Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(servicesCategories).map(([category, catData], idx) => (
              <AnimatedSection key={category} animation="scale-in" delay={idx * 100}>
                <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-orange-100 p-8 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <Link to={`/services/category/${category}`} className="flex items-center mb-4 gap-3 group-hover:text-orange-600 transition-colors duration-300">
                    <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-50 group-hover:bg-orange-100 shadow-md transition-all duration-300">
                      {iconMap[category]}
                    </span>
                    <span className="text-2xl font-bold">{category}</span>
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.keys(catData.subcategories).map((sub, subIdx) => (
                      <Link
                        key={sub}
                        to={`/services/category/${category}/${sub}`}
                        className="flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium shadow hover:bg-orange-200 hover:text-orange-900 transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${subIdx * 60}ms` }}
                      >
                        <span className="mr-1">{iconMap[sub]}</span>{sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <AnimatedSection 
                  key={service.id}
                  animation="scale-in"
                  delay={index * 100}
                >
                  <ServiceCard
                    icon={iconMap[service.category] || <Star className="h-6 w-6 text-orange-600" />}
                    title={service.name}
                    description={service.description}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('servicesPage.whyChoose')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We combine expertise, quality materials, and innovative solutions to deliver exceptional results.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="scale-in" delay={100}>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <CheckCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Quality Assurance</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Every project undergoes rigorous quality checks to ensure it meets our high standards and your expectations.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale-in" delay={200}>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Expert Team</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Our skilled professionals bring years of experience and specialized knowledge to every project.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale-in" delay={300}>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Modern Technology</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  We use the latest tools and techniques to deliver efficient, innovative solutions.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('servicesPage.ctaTitle')}
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              {t('servicesPage.ctaDesc')}
            </p>
            <Button 
              as={Link}
              to="/contact"
              variant="secondary"
              size="large"
              icon={ArrowRight}
              className="bg-white text-orange-600 border-white hover:bg-orange-50 shadow-lg group"
            >
              {t('servicesPage.ctaButton')}
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <ServiceDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} service={selectedService} />
    </>
  );
};

export default ServicesPage;