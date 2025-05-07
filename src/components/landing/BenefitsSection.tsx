
import React from 'react';
import { motion } from 'framer-motion';

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

const BenefitsSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our Advertising Solutions Work</h2>
          <p className="text-lg text-gray-600">
            We combine industry expertise, data-driven insights, and cutting-edge technology to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Targeted Campaigns',
              description: 'Reach your ideal customers with precision targeting across multiple platforms and channels.',
              icon: '🎯'
            },
            {
              title: 'Conversion Optimization',
              description: 'Turn visitors into customers with our proven conversion rate optimization techniques.',
              icon: '📈'
            },
            {
              title: 'ROI-Focused Strategy',
              description: 'Every dollar spent is tracked and optimized to maximize your return on investment.',
              icon: '💰'
            }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1 * index,
                    duration: 0.6
                  }
                }
              }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
