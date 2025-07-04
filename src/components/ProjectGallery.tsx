import React, { useState } from 'react';

const images = [
  {
    src: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&w=800',
    caption: 'Baghdad Road Project'
  },
  {
    src: 'https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&w=800',
    caption: 'Tikrit Lighting Installation'
  },
  {
    src: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&w=800',
    caption: 'Basra Landscape Design'
  }
];

const ProjectGallery: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Project Gallery</h2>
        <div className="relative max-w-2xl mx-auto">
          <img src={images[current].src} alt={images[current].caption} className="w-full h-80 object-cover rounded-lg shadow mb-4" />
          <div className="text-center text-gray-700 mb-6">{images[current].caption}</div>
          <div className="flex justify-center space-x-4">
            <button onClick={prev} className="btn-tertiary">Prev</button>
            <button onClick={next} className="btn-tertiary">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery; 