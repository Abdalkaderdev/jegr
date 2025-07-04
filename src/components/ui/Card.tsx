import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardProps {
  variant?: 'service' | 'project' | 'testimonial' | 'base';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  variant = 'base',
  children,
  className = '',
  onClick
}) => {
  const variantClasses = {
    base: 'card-base bg-gradient-theme p-6',
    service: 'card-service bg-gradient-theme',
    project: 'card-project bg-gradient-theme',
    testimonial: 'card-testimonial bg-gradient-theme'
  };

  const combinedClasses = `${variantClasses[variant]} ${className} ${onClick ? 'cursor-pointer' : ''}`;

  return (
    <motion.div
      className={combinedClasses}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      tabIndex={onClick ? 0 : undefined}
      style={{ outline: 'none' }}
    >
      {children}
    </motion.div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  className = ''
}) => {
  return (
    <Card variant="service" className={`group ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
      {features && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  duration?: string;
  className?: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  category,
  location,
  duration,
  className = '',
  onClick
}) => {
  return (
    <Card variant="project" className={`project-card group ${className}`} onClick={onClick}>
      <div className="relative overflow-hidden">
        <img 
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="project-overlay"></div>
        {category && (
          <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium transform group-hover:scale-105 transition-transform duration-300">
            {category}
          </div>
        )}
        <div className="project-details">
          <button className="w-full bg-white text-orange-600 py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-orange-50 transition-colors duration-200 transform hover:scale-105">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 group-hover:-translate-y-1 transition-all duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
        
        {(location || duration) && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            {location && (
              <div className="flex items-center group-hover:text-gray-600 transition-colors duration-300">
                <div className="w-1 h-1 bg-orange-600 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
                {location}
              </div>
            )}
            {duration && (
              <div className="flex items-center group-hover:text-gray-600 transition-colors duration-300">
                <div className="w-1 h-1 bg-orange-600 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
                {duration}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;