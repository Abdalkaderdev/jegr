import React, { useEffect, useState } from 'react';
import { ArrowRight, Filter, MapPin, Calendar, Users } from 'lucide-react';
import { ProjectCard } from '../components/ui/Card';
import Button from '../components/ui/Button';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useTranslation } from 'react-i18next';
import ProjectDetailsModal from '../components/ProjectDetailsModal';

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filters = ['All', 'Road', 'Lighting', 'Landscape', 'Concrete', 'Security'];

  useEffect(() => {
    setLoading(true);
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load projects');
        setLoading(false);
      });
  }, []);

  // Generate unique categories from projects data
  const categories = ['All', ...Array.from(new Set(projects.map((p: any) => p.category).filter(Boolean)))];

  // Filter projects by search and category
  const filteredProjects = projects.filter((project: any) =>
    (category === 'All' || project.category === category) &&
    (project.name.toLowerCase().includes(search.toLowerCase()) ||
     project.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg?auto=compress&cs=tinysrgb&w=1600)'
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
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input w-full md:w-1/3"
            aria-label="Search projects"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="form-input w-full md:w-1/4"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <AnimatedSection 
                  key={project.id}
                  animation="scale-in" 
                  delay={index * 100}
                >
                  <ProjectCard
                    image={project.imageUrl}
                    title={project.name}
                    description={project.description}
                    category={project.category}
                    location={project.location}
                    duration={project.duration}
                    onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                  />
                </AnimatedSection>
              ))}
            </div>
          )}
          {filteredProjects.length === 0 && !loading && (
            <AnimatedSection animation="fade-in">
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('projectsPage.noProjects')}</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-600">
        <div className="container-custom">
          <AnimatedSection animation="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
              <div className="group">
                <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-orange-100 group-hover:text-white transition-colors duration-300">Projects Completed</div>
              </div>
              <div className="group">
                <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">8</div>
                <div className="text-orange-100 group-hover:text-white transition-colors duration-300">Iraqi Cities</div>
              </div>
              <div className="group">
                <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">200+</div>
                <div className="text-orange-100 group-hover:text-white transition-colors duration-300">Team Members</div>
              </div>
              <div className="group">
                <div className="stats-counter mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
                <div className="text-orange-100 group-hover:text-white transition-colors duration-300">Client Satisfaction</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your infrastructure vision into reality. 
              Our experienced team is ready to deliver exceptional results.
            </p>
            <Button 
              as="a"
              href="/contact"
              variant="primary"
              size="large"
              icon={ArrowRight}
              className="shadow-construction group"
            >
              Get Started Today
            </Button>
          </AnimatedSection>
        </div>
      </section>

    </>
  );
};

export default ProjectsPage;