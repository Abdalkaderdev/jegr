import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, MapPin, Calendar, Users } from 'lucide-react';
import { ProjectCard } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import empireImg from '../assets/empire.png';
import ferdawsImg from '../assets/ferdaws.png';
import futreImg from '../assets/futre.png';
import frenchImg from '../assets/french.png';
import parkImg from '../assets/park.png';
import zaitonPlusImg from '../assets/zaiton plus.png';
import anbarImg from '../assets/anbar.png';
import northImg from '../assets/north.png';
import HeroProjectImg from '../assets/IMG_6001.png';

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const projects = [
    {
      image: empireImg,
      title: 'Empire World',
      location: 'Erbil, Kurdistan - Iraq',
    },
    {
      image: ferdawsImg,
      title: 'Ferdaws City',
      location: 'Erbil, Kurdistan - Iraq',
    },
    {
      image: futreImg,
      title: 'Future City',
      location: 'Erbil, Kurdistan - Iraq',
    },
    {
      image: frenchImg,
      title: 'French Village',
      location: 'Duhok, Kurdistan - Iraq',
    },
    {
      image: parkImg,
      title: 'Park Sami Abdulrahman',
      location: 'Erbil, Kurdistan - Iraq',
    },
    {
      image: zaitonPlusImg,
      title: 'Zaiton Plus',
      location: 'Erbil, Kurdistan - Iraq',
    },
    {
      image: anbarImg,
      title: 'Anbar-Qaaim',
      location: 'Anbar, Iraq',
    },
    {
      image: northImg,
      title: 'North Entrance Ramadi',
      location: 'Ramadi, Iraq',
    },
  ];

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${HeroProjectImg})`
        }}
      >
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('projectsPage.heroTitle')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('projectsPage.heroDesc')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="bg-white py-6">
        <div className="container-custom flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder={t('projectsPage.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input w-full md:w-1/3"
            aria-label={t('projectsPage.searchPlaceholder')}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
              >
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <picture>
                    <source srcSet={project.image.replace(/\.png$/, '.webp')} type="image/webp" />
                    <source srcSet={project.image.replace(/\.png$/, '.avif')} type="image/avif" />
                    <img src={project.image} alt={project.title} width={400} height={200} loading="lazy" className="w-full h-full object-cover" />
                  </picture>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">{project.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('projectsPage.noProjects')}</p>
            </div>
          )}
        </div>
      </section>

    </>
  );
};

export default ProjectsPage;