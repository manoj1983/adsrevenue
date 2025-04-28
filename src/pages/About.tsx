import React from 'react';
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

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

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-grow pt-20"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="bg-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/f3a3a1b0-7d32-4e05-b431-5f958f956bf1.png"
              alt="Digital Marketing Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 opacity-0 animate-[fade-in_0.6s_ease-out_0.3s_forwards] text-black">About Us</h1>
            <p className="text-lg text-black opacity-0 animate-[fade-in_0.6s_ease-out_0.4s_forwards]">
              Learn more about Ads Revenue and our mission to maximize your advertising potential.
            </p>
          </div>
        </div>
        
        <motion.div variants={item}>
          <AboutSection />
        </motion.div>
        
        <motion.section variants={item} className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in [animation-delay:400ms]">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ads Revenue was founded in 2025 with a simple mission: to help publishers maximize their advertising 
                  revenue through innovative strategies and cutting-edge technology.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  What began as a small team of advertising experts has grown into a comprehensive advertising 
                  optimization company serving clients worldwide. Our success is built on a foundation of 
                  data-driven insights, transparency, and measurable results.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we continue to push the boundaries of what's possible in digital advertising, helping 
                  our clients stay ahead of industry trends and maximize their revenue potential.
                </p>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg relative overflow-hidden animate-fade-in [animation-delay:500ms]">
                <div className="absolute inset-0 opacity-10">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                    alt="Digital Marketing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Innovation</h4>
                      <p className="text-gray-600">
                        We constantly explore new technologies and strategies to stay ahead of industry trends.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Transparency</h4>
                      <p className="text-gray-600">
                        We believe in clear, honest communication and full visibility into our processes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Results-Oriented</h4>
                      <p className="text-gray-600">
                        We focus on delivering measurable results and tangible business impact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center mr-4">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Client Partnership</h4>
                      <p className="text-gray-600">
                        We build long-term partnerships with our clients based on mutual success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        <motion.div variants={item}>
          <TestimonialsSection />
        </motion.div>
        <motion.div variants={item}>
          <CTASection />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default About;
