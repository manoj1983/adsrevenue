
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

const SocialProofSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their advertising strategy with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {[1, 2, 3, 4].map((index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.1 * index,
                    duration: 0.6
                  }
                }
              }}
              className="flex justify-center"
            >
              <div className="h-12 w-36 bg-gray-200 rounded animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
