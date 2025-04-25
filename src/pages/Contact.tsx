import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 animate-fade-in">
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in [animation-delay:200ms]">Contact Us</h1>
            <p className="text-lg text-gray-600 animate-fade-in [animation-delay:300ms]">
              We'd love to hear from you. Reach out to our team with any questions or inquiries.
            </p>
          </div>
        </div>
        
        <ContactSection />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 animate-fade-in [animation-delay:400ms]">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions about our services and how we can help you.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg animate-fade-in [animation-delay:500ms] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                    alt="Digital Marketing Background"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 relative z-10">How quickly can I expect to see results?</h3>
                <p className="text-gray-600 relative z-10">
                  While some improvements can be seen within days, significant revenue increases typically become apparent within 4-6 weeks as our optimization strategies take full effect and gather sufficient data for refinement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
