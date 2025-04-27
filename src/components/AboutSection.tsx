import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-gradient">Ads Revenue</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Ads Revenue is a leading advertising optimization company dedicated to helping publishers maximize their 
              advertising income through innovative strategies and cutting-edge technology.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team of advertising experts combines years of industry experience with data-driven insights to 
              deliver exceptional results for our clients. We believe in establishing long-term partnerships built on 
              transparency, trust, and consistent performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-brand-orange mb-2">Our Mission</h4>
                <p className="text-gray-600">
                  To empower publishers with the tools and strategies needed to maximize their advertising potential.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-brand-orange mb-2">Our Vision</h4>
                <p className="text-gray-600">
                  To revolutionize the digital advertising industry through innovation and excellence.
                </p>
              </div>
            </div>
            <Link to="/about">
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-blue-500/20 z-10"></div>
              <div className="p-8 md:p-12 relative z-20">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-lg p-4 aspect-square flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-orange mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <h4 className="font-bold text-center">Revenue Growth</h4>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-4 aspect-square flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-orange mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <h4 className="font-bold text-center">Secure & Reliable</h4>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white rounded-lg shadow-lg p-4 aspect-square flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-orange mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-bold text-center">Time Efficiency</h4>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-4 aspect-square flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-orange mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h4 className="font-bold text-center">Expert Support</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-brand-orange/20 rounded-full -z-10"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-100 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
