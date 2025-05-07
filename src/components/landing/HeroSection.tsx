
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-violet-600 text-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Boost Your Ad Revenue by <span className="text-yellow-300">300%</span> in 60 Days
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Our proven strategies have helped over 500 businesses increase their advertising ROI and maximize their revenue potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-blue-600 hover:bg-yellow-300 hover:text-blue-700 font-bold px-8 py-6 text-lg"
              >
                <a href="#contact-form">Get Started Now</a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg"
              >
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl">
              <img 
                src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png" 
                alt="Digital Marketing Dashboard" 
                className="rounded-lg shadow-md"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-300 text-blue-700 font-bold px-6 py-3 rounded-lg shadow-lg">
                +300% ROI
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
