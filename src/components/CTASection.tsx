
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-brand-orange"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-500"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-green-500"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Maximize Your Ad Revenue?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join hundreds of satisfied clients who have transformed their advertising strategy and increased their revenue with our expert solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-6 text-lg">
              Get Started Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
