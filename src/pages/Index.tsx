
import React, { Suspense } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import BlogSection from '@/components/BlogSection';

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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <motion.main 
            className="flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="hero">
                <HeroSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="about">
                <AboutSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="services">
                <ServicesSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="stats">
                <StatsSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="testimonials">
                <TestimonialsSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="blog">
                <BlogSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="contact">
                <ContactSection />
              </LazySection>
            </Suspense>
            
            <Suspense fallback={<SectionLoading />}>
              <LazySection id="cta">
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

export default Index;
