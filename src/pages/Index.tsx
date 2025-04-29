
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
      delayChildren: 0.3,
      duration: 0.8
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
      damping: 10,
      duration: 0.6
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
        <motion.div className="space-y-0">
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <HeroSection />
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <AboutSection />
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <ServicesSection />
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <StatsSection />
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <TestimonialsSection />
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <BlogSection />
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <ContactSection />
          </motion.div>
          <motion.div variants={item} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <CTASection />
          </motion.div>
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Index;
