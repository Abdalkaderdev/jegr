import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, MapPin, Phone, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import AnimatedSection from './ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import logo from '../assets/IMG_9929.png';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <img src={logo} alt="Company Logo" className="h-20 w-auto mt-2" />
          <span className="font-bold text-lg">{t('footer.company')}</span>
          <span className="ml-2 text-gray-400">&copy; {new Date().getFullYear()} {t('footer.rightsShort', 'All rights reserved.')}</span>
        </div>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-orange-400 transition-colors duration-200">{t('footer.home')}</a>
          <a href="/about" className="hover:text-orange-400 transition-colors duration-200">{t('footer.about')}</a>
          <a href="/services" className="hover:text-orange-400 transition-colors duration-200">{t('footer.services')}</a>
          <a href="/projects" className="hover:text-orange-400 transition-colors duration-200">{t('footer.projects')}</a>
          <a href="/contact" className="hover:text-orange-400 transition-colors duration-200">{t('footer.contact')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;