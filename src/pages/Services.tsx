
import React, { useEffect } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import { Card, CardContent } from '@/components/ui/card';

// Animation variants for smoother transitions
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { 
      duration: 0.4, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const ServiceDetail = ({ title, description, features }: { title: string; description: string; features: string[] }) => (
  <motion.div 
    variants={staggerItem}
    className="card-hover"
  >
    <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-500">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-center"
              variants={{
                initial: { opacity: 0, x: -10 },
                animate: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    delay: 0.1 * index, 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
              initial="initial"
              animate="animate"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-brand-orange mr-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </motion.div>
);

const MapSection = () => (
  <motion.section 
    variants={fadeIn}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className="py-16 bg-gray-50 dark:bg-gray-800"
  >
    <div className="container mx-auto px-4 md:px-6">
      <motion.div 
        className="text-center mb-12"
        variants={staggerItem}
      >
        <h2 className="text-3xl font-bold mb-4">Our Office Location</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find us in the heart of New Delhi
        </p>
      </motion.div>
      
      <motion.div 
        className="max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg"
        variants={staggerItem}
      >
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7600789404484!2d77.05408282982016!3d28.69825583090286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04329c4625df%3A0x5c7a81c01503755!2sKrishan%20Vihar%2C%20Delhi%2C%20110086!5e0!3m2!1sen!2sin!4v1746094714834!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            className="border-0 w-full h-full"
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const detailedServices = [
    {
      title: "Search Engine Optimization (SEO)",
      description: "Comprehensive SEO services to improve your website's visibility and rankings in search engines.",
      features: [
        "On-page SEO optimization",
        "Off-page SEO strategies",
        "Technical SEO improvements",
        "Local SEO optimization",
        "Keyword research and optimization"
      ]
    },
    {
      title: "Google Ads Management",
      description: "Strategic Google Ads campaigns to drive targeted traffic and maximize ROI.",
      features: [
        "Campaign setup and optimization",
        "Keyword research and selection",
        "Ad copy creation and testing",
        "Performance tracking and reporting",
        "Budget optimization"
      ]
    },
    {
      title: "Meta Ads & Social Media",
      description: "Expert social media marketing and Meta (Facebook & Instagram) advertising services.",
      features: [
        "Meta Ads campaign management",
        "Social media strategy development",
        "Content creation and curation",
        "Audience targeting and engagement",
        "Performance analytics"
      ]
    },
    {
      title: "Analytics & Tracking",
      description: "Comprehensive analytics setup and monitoring to track your digital marketing success.",
      features: [
        "Google Analytics implementation",
        "Conversion tracking setup",
        "Custom dashboard creation",
        "Regular performance reporting",
        "Data-driven optimization"
      ]
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <motion.div 
          className="min-h-screen flex flex-col relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <motion.main className="flex-grow pt-20">
            <motion.div 
              variants={fadeIn}
              initial="initial"
              animate="animate"
              className="bg-white dark:bg-gray-900 py-20 relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
                  alt="Digital Marketing Background"
                  className="w-full h-full object-cover opacity-20 dark:opacity-10"
                />
              </div>
              <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.h1 
                  variants={staggerItem}
                  className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white"
                >
                  Our Services
                </motion.h1>
                <motion.p 
                  variants={staggerItem}
                  className="text-lg text-black dark:text-gray-200"
                >
                  Comprehensive advertising optimization solutions to help you maximize revenue and grow your business.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <ServicesSection />
            </motion.div>
            
            <motion.section 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-16 bg-white dark:bg-gray-900"
            >
              <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                  className="text-center mb-16"
                  variants={staggerItem}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">How We Can Help You</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Our comprehensive services are designed to help you navigate the complex digital advertising landscape and maximize your revenue potential.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="space-y-12"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {detailedServices.map((service, index) => (
                    <motion.div 
                      key={index}
                      variants={staggerItem}
                      custom={index}
                    >
                      <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5 dark:opacity-10">
                          <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                            alt="Digital Marketing Service"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-8 relative z-10">
                          <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <motion.li 
                                key={idx} 
                                className="flex items-center"
                                variants={{
                                  initial: { opacity: 0, x: -10 },
                                  animate: { 
                                    opacity: 1, 
                                    x: 0,
                                    transition: { 
                                      delay: 0.05 * idx + 0.2 * index, 
                                      duration: 0.5,
                                      ease: [0.22, 1, 0.36, 1]
                                    }
                                  }
                                }}
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-5 w-5 text-brand-orange mr-3" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>
            
            <motion.section 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="py-16 bg-gray-50 dark:bg-gray-800"
            >
              <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                  className="text-center mb-12"
                  variants={staggerItem}
                >
                  <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Process</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    We follow a structured approach to help you achieve maximum results from your advertising efforts.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      step: 1,
                      title: "Discovery",
                      description: "We analyze your current setup, audience, and content to identify opportunities."
                    },
                    {
                      step: 2,
                      title: "Strategy",
                      description: "We develop a tailored optimization plan based on our findings and your goals."
                    },
                    {
                      step: 3,
                      title: "Implementation",
                      description: "We execute the strategy with precision, optimizing all aspects of your ad setup."
                    },
                    {
                      step: 4,
                      title: "Optimization",
                      description: "We continuously monitor performance and refine our approach for ongoing improvement."
                    }
                  ].map((step, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm text-center relative card-hover"
                      variants={staggerItem}
                      custom={index}
                      whileHover={{ y: -5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold mb-3 dark:text-white">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                      {index < 3 && (
                        <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#FF6347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>
            
            <MapSection />
            
            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <TestimonialsSection />
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <CTASection />
            </motion.div>
          </motion.main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default Services;
