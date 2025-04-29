
import React, { Suspense } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

// Lazy loading section wrapper component
const LazySection = ({ children, id }: { children: React.ReactNode, id: string }) => (
  <motion.div 
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: 0.2
    }}
    viewport={{ once: true, margin: "-100px 0px" }}
  >
    {children}
  </motion.div>
);

// Loading fallback
const SectionLoading = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-3xl h-64"></div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <motion.main 
            className="flex-grow pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-background py-20 relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
                  alt="Digital Marketing Background"
                  className="w-full h-full object-cover opacity-20"
                  loading="eager"
                />
              </div>
              <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
                >
                  About Us
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg text-foreground"
                >
                  Learn more about Ads Revenue and our mission to maximize your advertising potential.
                </motion.p>
              </div>
            </motion.div>

            <Suspense fallback={<SectionLoading />}>
              <LazySection id="about-section">
                <AboutSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="story-section">
                <section className="py-16 bg-background">
                  <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                          Ads Revenue was founded in 2025 with a simple mission: to help publishers maximize their advertising 
                          revenue through innovative strategies and cutting-edge technology.
                        </p>
                        <p className="text-lg text-muted-foreground mb-6">
                          What began as a small team of advertising experts has grown into a comprehensive advertising 
                          optimization company serving clients worldwide. Our success is built on a foundation of 
                          data-driven insights, transparency, and measurable results.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          Today, we continue to push the boundaries of what's possible in digital advertising, helping 
                          our clients stay ahead of industry trends and maximize their revenue potential.
                        </p>
                      </motion.div>
                      <motion.div 
                        className="bg-muted p-8 rounded-lg relative overflow-hidden"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <div className="absolute inset-0 opacity-10">
                          <img 
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                            alt="Digital Marketing"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="space-y-6">
                          <motion.div 
                            className="flex items-start"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                              <span className="text-white font-bold">1</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-foreground">Innovation</h4>
                              <p className="text-muted-foreground">
                                We constantly explore new technologies and strategies to stay ahead of industry trends.
                              </p>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex items-start"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                              <span className="text-white font-bold">2</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-foreground">Transparency</h4>
                              <p className="text-muted-foreground">
                                We believe in clear, honest communication and full visibility into our processes.
                              </p>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex items-start"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                              <span className="text-white font-bold">3</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-foreground">Results-Oriented</h4>
                              <p className="text-muted-foreground">
                                We focus on delivering measurable results and tangible business impact.
                              </p>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex items-start"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                              <span className="text-white font-bold">4</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg mb-2 text-foreground">Client Partnership</h4>
                              <p className="text-muted-foreground">
                                We build long-term partnerships with our clients based on mutual success.
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="testimonials-section">
                <TestimonialsSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="cta-section">
                <CTASection />
              </LazySection>
            </Suspense>
          </motion.main>
        </AnimatePresence>
      </LazyMotion>
      <Footer />
    </div>
  );
};

export default About;
