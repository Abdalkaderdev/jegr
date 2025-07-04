import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hammer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import logo from '../assets/IMG_9929.png';
import servicesCategories from "../data/servicesCategories.json";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const navItems = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.services'), path: '/services' },
    { name: t('navbar.projects'), path: '/projects' },
    { name: t('navbar.contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <motion.nav
      className={`navbar-sticky ${isScrolled ? 'navbar-scrolled shadow-lg backdrop-blur-md' : ''}`}
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="container-custom">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center h-32">
            <Link to="/" className="flex items-center space-x-2 group">
              <img src={logo} alt="Company Logo" className="h-28 w-auto -mt-2" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              item.name === t('navbar.services') ? (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group"
                >
                  <Link
                    to={item.path}
                    className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive(item.path) ? 'active text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
                  >
                    {item.name}
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-600 rounded"
                      style={{ opacity: isActive(item.path) ? 1 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  </Link>
                  {/* Dropdown */}
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                    <ul className="py-2">
                      {Object.entries(servicesCategories).map(([cat, catData]) => {
                        const subcategories = (catData as { description: string; subcategories: Record<string, string> }).subcategories;
                        return (
                          <li
                            key={cat}
                            className="relative group/category"
                            onMouseEnter={() => setHoveredCategory(cat)}
                            onMouseLeave={() => setHoveredCategory(null)}
                          >
                            <Link to={`/services?category=${encodeURIComponent(cat)}`} className="block px-4 py-2 text-gray-800 font-semibold hover:bg-orange-50 hover:text-orange-600 transition-colors">
                              {cat}
                            </Link>
                            {/* Submenu */}
                            {hoveredCategory === cat && (
                              <div className="absolute right-full top-0 mr-2 w-56 bg-white rounded-lg shadow-lg z-50">
                                <ul className="py-2">
                                  {Object.keys(subcategories).map(sub => (
                                    <li key={sub}>
                                      <Link to={`/services?subcategory=${encodeURIComponent(sub)}`} className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                        {sub}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className={`nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive(item.path) ? 'active text-orange-600' : 'text-gray-700 hover:text-orange-600'}`}
                  >
                    {item.name}
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-600 rounded"
                      style={{ opacity: isActive(item.path) ? 1 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  </Link>
                </motion.div>
              )
            ))}
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className="ml-4 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={toggleLang}
            >
              {t('navbar.toggleLang')}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
          initial={false}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -16 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ delay: isOpen ? index * 0.07 : 0, duration: 0.25 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-600'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className="w-full mt-2 px-3 py-2 rounded-lg text-base font-medium bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={toggleLang}
            >
              {t('navbar.toggleLang')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;