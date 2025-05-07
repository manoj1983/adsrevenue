
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 25, 
      stiffness: 100,
      duration: 0.6 
    }
  }
};

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Comprehensive Advertising Solutions</h2>
          <p className="text-lg text-gray-600">
            Everything you need to drive growth through effective advertising across all platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Google Ads Management',
              features: [
                'Keyword research and optimization',
                'Ad copy creation and testing',
                'Landing page optimization',
                'Conversion tracking setup',
                'Budget management and ROI tracking'
              ]
            },
            {
              title: 'Meta Advertising',
              features: [
                'Facebook and Instagram ad campaigns',
                'Custom audience creation',
                'Creative design and testing',
                'Retargeting strategy',
                'Performance analysis and optimization'
              ]
            }
          ].map((service, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.6
                  }
                }
              }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
