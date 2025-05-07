
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import ContactFormSection from '@/components/landing/ContactFormSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <HeroSection />
        <BenefitsSection />
        <SocialProofSection />
        <FeaturesSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
