import React from 'react';
import AnimatedSection from './ui/AnimatedSection';

const posts = [
  {
    title: 'Jegr Jalal Wins 2024 Urban Excellence Award',
    date: '2024-05-01',
    excerpt: 'We are honored to receive the Urban Excellence Award for our innovative infrastructure projects across Iraq.',
    image: 'https://images.pexels.com/photos/461419/pexels-photo-461419.jpeg?auto=compress&w=800',
    link: '#'
  },
  {
    title: 'New Partnership with GreenScape',
    date: '2024-04-15',
    excerpt: 'Our new partnership with GreenScape will bring sustainable landscaping to more Iraqi cities.',
    image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&w=800',
    link: '#'
  },
  {
    title: 'Safety First: Our Commitment to Workers',
    date: '2024-03-20',
    excerpt: 'Learn how Jegr Jalal is setting new safety standards for construction teams and project sites.',
    image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&w=800',
    link: '#'
  }
];

const BlogSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container-custom">
      <AnimatedSection animation="fade-in">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Latest News</h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
            <a href={post.link} className="block bg-gray-50 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
              <div className="p-6">
                <div className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString()}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-orange-600 font-medium">Read More →</span>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection; 