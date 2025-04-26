
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import CTASection from '@/components/CTASection';
import BlogSection from '@/components/BlogSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="space-y-0">
          <div className="animate-fade-in [animation-delay:100ms]">
            <HeroSection />
          </div>
          <div className="animate-fade-in [animation-delay:200ms]">
            <ClientsSection />
          </div>
          <div className="animate-fade-in [animation-delay:300ms]">
            <AboutSection />
          </div>
          <div className="animate-fade-in [animation-delay:400ms]">
            <ServicesSection />
          </div>
          <div className="animate-fade-in [animation-delay:500ms]">
            <StatsSection />
          </div>
          <div className="animate-fade-in [animation-delay:600ms]">
            <TestimonialsSection />
          </div>
          <div className="animate-fade-in [animation-delay:700ms]">
            <BlogSection />
          </div>
          <div className="animate-fade-in [animation-delay:800ms]">
            <ContactSection />
          </div>
          <div className="animate-fade-in [animation-delay:900ms]">
            <CTASection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
