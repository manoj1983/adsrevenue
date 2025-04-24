
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Maximize Your <span className="text-gradient">Ad Revenue</span> With Expert Solutions
            </h1>
            <p className="text-lg text-gray-600 mb-8 md:pr-12">
              Take your advertising income to the next level with our innovative optimization strategies and expert guidance. We help publishers unlock their true monetization potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-6 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange/10 px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 relative z-10 animate-float">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-xl">Revenue Growth</h3>
                      <p className="text-gray-500">Monthly Performance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-500 text-lg font-semibold">+42%</span>
                  </div>
                </div>
                <div className="h-48 mb-4">
                  <div className="flex h-full items-end">
                    <div className="w-1/7 h-20 bg-gray-200 rounded-t-lg mx-1"></div>
                    <div className="w-1/7 h-32 bg-gray-300 rounded-t-lg mx-1"></div>
                    <div className="w-1/7 h-24 bg-gray-200 rounded-t-lg mx-1"></div>
                    <div className="w-1/7 h-36 bg-gray-300 rounded-t-lg mx-1"></div>
                    <div className="w-1/7 h-28 bg-gray-200 rounded-t-lg mx-1"></div>
                    <div className="w-1/7 h-40 bg-brand-orange rounded-t-lg mx-1"></div>
                    <div className="w-1/7 h-48 bg-brand-orange-light rounded-t-lg mx-1"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-brand-orange/10 rounded-full -z-10"></div>
              <div className="absolute -top-4 -left-4 w-40 h-40 bg-blue-100 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
