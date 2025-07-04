import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  children: React.ReactNode;
  as?: React.ElementType;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  children,
  className = '',
  disabled,
  as: Component = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 shadow-sm hover:shadow-lg active:shadow-none hover:-translate-y-0.5 active:scale-95';
  
  const variantClasses = {
    primary: 'btn-primary bg-gradient-theme',
    secondary: 'btn-secondary bg-gradient-theme',
    tertiary: 'btn-tertiary',
  };

  const sizeClasses = {
    small: 'btn-small',
    medium: 'px-6 py-3',
    large: 'btn-large'
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px 0 rgba(0,0,0,0.08)' }}
      className={combinedClasses}
      disabled={disabled || loading}
      type={props.type || 'button'}
      {...props}
    >
      {loading && (
        <div className="loading-spinner mr-2" />
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:translate-x-1" />
      )}
      
      <span className="relative">
        {children}
      </span>
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </motion.button>
  );
};

export default Button;