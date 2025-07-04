import React from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StickyCTA: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
    className="fixed bottom-6 right-6 z-50"
  >
    <Link
      to="/contact"
      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300"
      style={{ boxShadow: '0 8px 24px rgba(255, 140, 0, 0.2)' }}
    >
      <Mail className="h-5 w-5 mr-2" />
      <span>Contact Us</span>
    </Link>
  </motion.div>
);

export default StickyCTA; 