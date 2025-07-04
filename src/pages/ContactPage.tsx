import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input, { Textarea, Select } from '../components/ui/Input';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import MapSection from '../components/MapSection';

const ContactPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const serviceOptions = [
    { value: '', label: t('contactPage.form.serviceOptions.default') },
    { value: 'landscape', label: t('contactPage.form.serviceOptions.landscape') },
    { value: 'road', label: t('contactPage.form.serviceOptions.road') },
    { value: 'concrete', label: t('contactPage.form.serviceOptions.concrete') },
    { value: 'kerbstone', label: t('contactPage.form.serviceOptions.kerbstone') },
    { value: 'lighting', label: t('contactPage.form.serviceOptions.lighting') },
    { value: 'security', label: t('contactPage.form.serviceOptions.security') },
    { value: 'other', label: t('contactPage.form.serviceOptions.other') }
  ];

  return (
    <>
      {/* Success Message */}
      <div className={`success-message ${showSuccess ? 'show' : ''}`}>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>{t('contactPage.successMessage')}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1600)'
        }}
      >
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('contactPage.title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('contactPage.intro')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AnimatedSection animation="slide-in-left">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contactPage.contactInfoTitle')}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {t('contactPage.contactInfoIntro')}
                </p>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                      <MapPin className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">{t('contactPage.info.address.company')}</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {t('contactPage.info.address.company')}<br />
                        {t('contactPage.info.address.city')}<br />
                        {t('contactPage.info.address.building')}
                      </p>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                      <Phone className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">{t('contactPage.info.phone.main')}</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {t('contactPage.info.phone.main')}<br />
                        {t('contactPage.info.phone.emergency')}<br />
                        {t('contactPage.info.phone.project')}
                      </p>
                    </div>
                  </div>

                  {/* Email Addresses */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                      <Mail className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">{t('contactPage.info.email.general')}</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {t('contactPage.info.email.general')}<br />
                        {t('contactPage.info.email.quotes')}<br />
                        {t('contactPage.info.email.support')}
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">{t('contactPage.info.hours.weekdays')}</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {t('contactPage.info.hours.weekdays')}<br />
                        {t('contactPage.info.hours.friday')}<br />
                        {t('contactPage.info.hours.saturday')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Remove map placeholder, keep only real map below */}
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection animation="slide-in-right" delay={200}>
              <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('contactPage.form.formTitle')}</h2>
                <p className="text-gray-600 mb-6">{t('contactPage.form.formTitleMessage')}</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label={t('contactPage.form.name')}
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contactPage.form.namePlaceholder')}
                  />

                  <Input
                    label={t('contactPage.form.email')}
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contactPage.form.emailPlaceholder')}
                  />

                  <Input
                    label={t('contactPage.form.phone')}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contactPage.form.phonePlaceholder')}
                  />

                  <Select
                    label={t('contactPage.form.serviceInterest')}
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    options={serviceOptions}
                  />

                  <Textarea
                    label={t('contactPage.form.message')}
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contactPage.form.messagePlaceholder')}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    icon={Send}
                    className="w-full group"
                  >
                    {t('contactPage.form.submit')}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-orange-50 rounded-md border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>{t('contactPage.quickResponseGuarantee')}:</strong> {t('contactPage.quickResponseGuaranteeDescription')}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contactPage.faqTitle')}</h2>
              <p className="text-lg text-gray-600">
                {t('contactPage.faqIntro')}
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection animation="fade-in" delay={100}>
              <div className="faq-item bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contactPage.faq1Question')}
                </h3>
                <p className="text-gray-600">
                  {t('contactPage.faq1Answer')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in" delay={200}>
              <div className="faq-item bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contactPage.faq2Question')}
                </h3>
                <p className="text-gray-600">
                  {t('contactPage.faq2Answer')}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in" delay={300}>
              <div className="faq-item bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contactPage.faq3Question')}
                </h3>
                <p className="text-gray-600">
                  {t('contactPage.faq3Answer')}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">{t('contactPage.connectWithUs', 'Connect with Us')}</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://wa.me/964XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700 text-3xl" aria-label="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="https://facebook.com/jegrjalal" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-3xl" aria-label="Facebook">
              <i className="fab fa-facebook" />
            </a>
            <a href="https://linkedin.com/company/jegrjalal" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 text-3xl" aria-label="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;