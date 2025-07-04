import React, { useState } from 'react';
import AnimatedSection from './ui/AnimatedSection';

const faqs = [
  {
    question: 'What types of construction services do you provide?',
    answer: 'We specialize in landscaping, road and traffic signs, stamped concrete, kerbstone & basalt work, lighting poles, and security booths. Our comprehensive services cover all aspects of urban infrastructure development.'
  },
  {
    question: 'Do you offer customized solutions for specific project needs?',
    answer: 'Absolutely. We work closely with each client to understand their unique requirements and develop tailored solutions that meet their specific needs, budget, and timeline.'
  },
  {
    question: 'Where do you manufacture your materials and components?',
    answer: 'We source high-quality materials from trusted suppliers and work with local manufacturers to ensure the best quality standards while supporting the local economy.'
  }
];

const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <AnimatedSection animation="fade-in">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        </AnimatedSection>
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} animation="scale-in" delay={i * 100}>
              <div className="bg-white rounded-lg shadow p-6">
                <button
                  className="w-full text-left font-semibold text-orange-600 text-lg focus:outline-none"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {faq.question}
                </button>
                {open === i && <div className="mt-2 text-gray-700">{faq.answer}</div>}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQSection; 