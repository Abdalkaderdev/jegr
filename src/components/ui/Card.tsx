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
    service: 'card-service bg-white border border-gray-100 shadow-md',
    project: 'card-project bg-white border border-gray-100 shadow-md',
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
      <div
        className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 group-hover:scale-110 transition-all duration-300"
        style={{
          backgroundColor: 'var(--primary-orange-light)',
          color: 'var(--primary-orange)',
        }}
      >
        {icon}
      </div>
      <h3
        className="text-xl font-semibold mb-3 group-hover:text-gradient transition-colors duration-300"
        style={{ color: 'var(--neutral-gray-900)' }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed mb-4 transition-colors duration-300"
        style={{ color: 'var(--neutral-gray-600)' }}
      >
        {description}
      </p>
      {features && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-sm transition-colors duration-300"
              style={{ color: 'var(--neutral-gray-600)' }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full mr-2 transition-transform duration-300"
                style={{ backgroundColor: 'var(--primary-orange)' }}
              ></div>
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
    <Card variant="service" className={`group ${className}`} onClick={onClick}>
      <div
        className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 group-hover:scale-110 transition-all duration-300 mx-auto"
        style={{
          backgroundColor: 'var(--primary-orange-light)',
          color: 'var(--primary-orange)',
        }}
      >
        <img src={image} alt={title} className="w-8 h-8 object-contain" />
      </div>
      <h3
        className="text-xl font-semibold mb-3 group-hover:text-gradient transition-colors duration-300 text-center"
        style={{ color: 'var(--neutral-gray-900)' }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed mb-4 transition-colors duration-300 text-center"
        style={{ color: 'var(--neutral-gray-600)' }}
      >
        {description}
      </p>
      {(location || duration) && (
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2 justify-center">
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
    </Card>
  );
};

export default Card;