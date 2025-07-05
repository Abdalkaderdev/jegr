import React from 'react';
import { useParams, Link } from 'react-router-dom';
import servicesCategories from "../data/servicesCategories.json";
import { useTranslation } from 'react-i18next';

const ServiceSubcategoryPage = () => {
  const { categoryName, subCategoryName } = useParams();
  const catData = servicesCategories[categoryName as keyof typeof servicesCategories];
  let subDesc = '';
  if (catData && catData.subcategories) {
    const subMap = catData.subcategories as Record<string, string>;
    subDesc = subMap[subCategoryName as string] || '';
  }
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section with animated gradient and unique underline */}
      <div className="w-full bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-400 py-16 flex flex-col items-center justify-center relative animate-fade-in">
        {/* Watermark */}
        <span className="absolute inset-0 flex items-center justify-center opacity-10 text-[8vw] font-extrabold text-white select-none pointer-events-none uppercase tracking-widest z-0">
          {subCategoryName}
        </span>
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-tight mb-2 text-center">{subCategoryName}</h1>
          {/* Animated underline */}
          <span className="block h-1 w-24 bg-white rounded-full mt-2 animate-pulse" />
        </div>
        {/* SVG Wave Divider */}
        <svg className="absolute bottom-0 left-0 w-full" height="40" viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h1440v20c-240 20-480 20-720 0s-480-20-720 0V0z" fill="#fff" />
        </svg>
      </div>
      {/* Description */}
      {subDesc && (
        <div className="max-w-2xl mx-auto text-center text-xl text-gray-700 font-medium my-10 animate-fade-in delay-100">
          {String(subDesc)}
        </div>
      )}
      {/* Back Button */}
      <div className="flex justify-center mt-8">
        <Link to={`/services/category/${categoryName}`} className="inline-block px-6 py-3 bg-orange-100 text-orange-700 text-lg font-semibold rounded-lg shadow-none hover:bg-orange-200 hover:text-orange-900 hover:scale-105 hover:underline transition-all duration-200 animate-fade-in">
          ← {t('servicesPage.backToCategory', { category: categoryName })}
        </Link>
      </div>
    </div>
  );
};

export default ServiceSubcategoryPage; 