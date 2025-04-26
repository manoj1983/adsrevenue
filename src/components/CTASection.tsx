import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-brand-orange animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-500 animate-pulse [animation-delay:1000ms]"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-green-500 animate-pulse [animation-delay:2000ms]"></div>
      </div>
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black opacity-50">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Digital Marketing Background" 
          className="w-full h-full object-cover mix-blend-overlay opacity-30"
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in transition-all duration-700 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in [animation-delay:200ms] transition-all duration-700 ease-out">
            Ready to Maximize Your Ad Revenue?
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-fade-in [animation-delay:400ms] transition-all duration-700 ease-out">
            Join hundreds of satisfied clients who have transformed their advertising strategy and increased their revenue with our expert solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-6 text-lg animate-scale-in [animation-delay:600ms] transition-transform duration-300 hover:scale-105">
                Get Started Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent text-white hover:text-white hover:bg-white/10 border-white px-8 py-6 text-lg font-medium animate-scale-in [animation-delay:800ms] transition-transform duration-300 hover:scale-105">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
