
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600">
              We'd love to hear from you. Reach out to our team with any questions or inquiries.
            </p>
          </div>
        </div>
        
        <ContactSection />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find answers to the most common questions about our services and how we can help you.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">How quickly can I expect to see results?</h3>
                <p className="text-gray-600">
                  While some improvements can be seen within days, significant revenue increases typically become apparent within 4-6 weeks as our optimization strategies take full effect and gather sufficient data for refinement.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Do you work with websites of all sizes?</h3>
                <p className="text-gray-600">
                  Yes, we work with publishers of all sizes, from small blogs to large media networks. Our strategies are tailored to your specific needs and traffic levels.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">What information do you need to get started?</h3>
                <p className="text-gray-600">
                  To begin, we typically need access to your analytics platforms, current ad setup information, and an understanding of your goals. Our team will guide you through the exact requirements during our initial consultation.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">How do you charge for your services?</h3>
                <p className="text-gray-600">
                  We offer flexible pricing models including fixed monthly fees, performance-based pricing, or a hybrid approach. We'll recommend the best option based on your specific needs during your consultation.
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
