import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { useTranslation } from 'react-i18next';

const MapSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <AnimatedSection animation="fade-in">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">{t('ourLocation')}</h2>
        </AnimatedSection>
        <AnimatedSection animation="scale-in" delay={100}>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            {/* Updated map coordinates for Erbil International Airport */}
            <iframe
              title={t('ourLocations')}
              src="https://www.google.com/maps?q=36.21694079592241,43.98388529397935&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MapSection; 