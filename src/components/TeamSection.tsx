import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const team = [
  {
    name: 'Jegr Jalal',
    role: 'Founder & CEO',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Visionary leader with 20+ years in construction and infrastructure.'
  },
  {
    name: 'Layla Hussein',
    role: 'Head of Engineering',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Expert in civil engineering and project management.'
  },
  {
    name: 'Ahmed Karim',
    role: 'Operations Manager',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Ensures smooth execution and delivery of all projects.'
  },
  {
    name: 'Sara Al-Sabah',
    role: 'Lead Architect',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Specializes in sustainable and elegant urban design.'
  }
];

const TeamSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container-custom">
      <AnimatedSection animation="fade-in">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
            <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <img src={member.photo} alt={member.name} className="h-24 w-24 object-cover rounded-full mb-4 border-4 border-orange-100" />
              <div className="font-semibold text-lg text-orange-600 mb-1">{member.name}</div>
              <div className="text-gray-500 mb-2">{member.role}</div>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection; 