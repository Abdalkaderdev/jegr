import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import AnimatedSection from './ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import logo from '../assets/IMG_9929.png';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <img src={logo} alt="Company Logo" className="h-20 w-auto mt-2" />
          <span className="font-bold text-lg">{t('footer.company')}</span>
          <span className="ml-2 text-gray-400">&copy; {new Date().getFullYear()} {t('footer.rightsShort')}</span>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex space-x-4 mb-2">
            <a href="/" className="hover:text-orange-400 transition-colors duration-200">{t('footer.home')}</a>
            <a href="/about" className="hover:text-orange-400 transition-colors duration-200">{t('footer.about')}</a>
            <a href="/services" className="hover:text-orange-400 transition-colors duration-200">{t('footer.services')}</a>
            <a href="/projects" className="hover:text-orange-400 transition-colors duration-200">{t('footer.projects')}</a>
            <a href="/contact" className="hover:text-orange-400 transition-colors duration-200">{t('footer.contact')}</a>
          </div>
          <div className={`text-sm text-gray-300 flex flex-col ${isRTL ? 'items-start text-right' : 'items-end text-left'}`}>
            <span><strong>{t('footer.phone')}:</strong> {t('footer.phoneValue').split('\n').map((line, idx) => (
              <React.Fragment key={idx}><a href={`tel:${line.replace(/\s/g, '')}`} className="underline hover:text-orange-400">{line}</a>{idx === 0 ? ', ' : ''}</React.Fragment>
            ))}</span>
            <span><strong>{t('footer.location')}:</strong> {t('footer.locationValue')}</span>
            <span><strong>{t('footer.email')}:</strong> <a href={`mailto:${t('footer.emailValue')}`} className="underline hover:text-orange-400">{t('footer.emailValue')}</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;