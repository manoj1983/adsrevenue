
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";
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
  }
};

const MapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <section 
      ref={ref}
      className="py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Office Location</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find us in the heart of New Delhi
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
    </section>
  );
};

const ServiceDetail = ({ title, description, features }: { title: string; description: string; features: string[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ 
                  delay: 0.1 * index, 
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1]
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
                <span className="text-gray-600">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Services = () => {
  const pageRef = useRef(null);
  const isPageInView = useInView(pageRef, { once: true });
  
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

  const howWeHelpRef = useRef(null);
  const isHowWeHelpInView = useInView(howWeHelpRef, { once: true, margin: "-50px 0px" });

  return (
    <div 
      ref={pageRef}
      className="min-h-screen flex flex-col relative"
    >
      <Header />
      <main className="flex-grow pt-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isPageInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white py-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
              alt="Digital Marketing Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-bold mb-6 text-black"
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg text-black"
            >
              Comprehensive advertising optimization solutions to help you maximize revenue and grow your business.
            </motion.p>
          </div>
        </motion.div>
        
        <ServicesSection />
        
        <section 
          ref={howWeHelpRef}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isHowWeHelpInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Can Help You</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our comprehensive services are designed to help you navigate the complex digital advertising landscape and maximize your revenue potential.
              </p>
            </motion.div>
            
            <div className="space-y-12">
              {detailedServices.map((service, index) => (
                <ServiceDetail 
                  key={index}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section 
          className="py-16 bg-gray-50"
          ref={pageRef}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We follow a structured approach to help you achieve maximum results from your advertising efforts.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="bg-white p-6 rounded-lg shadow-sm text-center relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isPageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 * index + 0.5,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">
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
            </div>
          </div>
        </section>
        
        <MapSection />
        
        <TestimonialsSection />
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
