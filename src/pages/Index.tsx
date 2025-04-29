
import React, { Suspense } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
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

// Animation variants
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

// Loading fallback with smoother animation
const SectionLoading = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-3xl h-64"
    />
  </div>
);

// Lazy loading section wrapper component with smoother animations
const LazySection = ({ children, id }: { children: React.ReactNode, id: string }) => (
  <motion.div 
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px 0px" }}
    variants={fadeInUp}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main 
            className="flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
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
        <Footer />
      </div>
    </LazyMotion>
  );
};

export default Index;
