import React from 'react';
import { useParams, Link } from 'react-router-dom';
import servicesCategories from '../../api/servicesCategories.json';

const ServiceCategoryPage = () => {
  const { categoryName } = useParams();
  const catData = servicesCategories[categoryName as keyof typeof servicesCategories];
  const subcategories = catData ? catData.subcategories : {};

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section with animated gradient and unique underline */}
      <div className="w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-400 py-16 flex flex-col items-center justify-center relative animate-fade-in">
        {/* Watermark */}
        <span className="absolute inset-0 flex items-center justify-center opacity-10 text-[8vw] font-extrabold text-white select-none pointer-events-none uppercase tracking-widest z-0">
          {categoryName}
        </span>
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-tight mb-2 text-center">{categoryName}</h1>
          {/* Animated underline */}
          <span className="block h-1 w-24 bg-white rounded-full mt-2 animate-pulse" />
        </div>
        {/* SVG Wave Divider */}
        <svg className="absolute bottom-0 left-0 w-full" height="40" viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h1440v20c-240 20-480 20-720 0s-480-20-720 0V0z" fill="#fff" />
        </svg>
      </div>
      {/* Description */}
      {catData && (
        <div className="max-w-2xl mx-auto text-center text-xl text-gray-700 font-medium my-10 animate-fade-in delay-100">
          {catData.description}
        </div>
      )}
      {/* Subcategories */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Explore {categoryName} Solutions</h2>
        <div className={`flex flex-wrap justify-center md:grid md:grid-cols-3 ${categoryName === 'Landscape' ? 'gap-8 md:gap-16' : 'gap-4 md:gap-8'}`}>
          {Object.keys(subcategories).map((sub, idx) => (
            <Link
              key={sub}
              to={`/services/category/${categoryName}/${sub}`}
              className="flex items-center justify-center px-6 py-3 bg-orange-50 text-orange-700 text-lg font-semibold rounded-lg shadow-none transition-all duration-200 animate-fade-in box-halo hover:box-halo-strong hover:scale-105 hover:underline"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {sub}
            </Link>
          ))}
        </div>
      </div>
      {/* Custom halation effect styles */}
      <style>{`
        .box-halo {
          box-shadow: 0 0 32px 4px rgba(255, 165, 0, 0.35), 0 0 64px 8px rgba(255, 200, 0, 0.22);
        }
        .box-halo-strong {
          box-shadow: 0 0 48px 8px rgba(255, 165, 0, 0.55), 0 0 96px 16px rgba(255, 200, 0, 0.35);
        }
      `}</style>
    </div>
  );
};

export default ServiceCategoryPage; 