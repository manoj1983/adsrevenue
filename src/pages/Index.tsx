
import React from 'react';
import { motion } from "framer-motion";
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-grow"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={container} className="space-y-0">
          <motion.div variants={item}>
            <HeroSection />
          </motion.div>
          <motion.div variants={item}>
            <AboutSection />
          </motion.div>
          <motion.div variants={item}>
            <ServicesSection />
          </motion.div>
          <motion.div variants={item}>
            <StatsSection />
          </motion.div>
          <motion.div variants={item}>
            <TestimonialsSection />
          </motion.div>
          <motion.div variants={item}>
            <BlogSection />
          </motion.div>
          <motion.div variants={item}>
            <ContactSection />
          </motion.div>
          <motion.div variants={item}>
            <CTASection />
          </motion.div>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Index;

