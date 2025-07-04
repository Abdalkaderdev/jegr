import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const MapSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container-custom">
      <AnimatedSection animation="fade-in">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Our Locations</h2>
      </AnimatedSection>
      <AnimatedSection animation="scale-in" delay={100}>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          {/* Replace the iframe src with your real Google Maps or Mapbox embed */}
          <iframe
            title="Jegr Jalal Locations"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.567123456789!2d44.366067!3d33.315241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155781b1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sBaghdad%2C%20Iraq!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
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
export default MapSection; 